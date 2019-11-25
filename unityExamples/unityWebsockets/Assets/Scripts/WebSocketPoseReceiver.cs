using UnityEngine;
using System.Collections;
using System;
using System.Collections.Generic;

/*************************************************************
 *          Definitions and Utilities
 */

// SkeletonDefinitions are just for convenience
public enum SkeletonDefinitions { Nose, LeftEye, RightEye, LeftEar, RightEar, LeftShoulder, RightShoulder, LeftElbow, RightElbow, LeftWrist, RightWrist, ReftHip, RightHip, LeftKnee, RightKnee, LeftAnkle };

// following classes are describing how the object looks like that we get as a json
// so we can directly load it in

[Serializable]
public class PoseNetPosition
{
    public float x;
    public float y;
}

[Serializable]
public class PoseNetKeyPoint
{
    public string part;
    public PoseNetPosition position;
    public float score;
}

[Serializable]
public class PoseNetPose
{
    public float score;
    public PoseNetKeyPoint[] keypoints;
}

[Serializable]
public class PoseNetImage
{
    public int width;
    public int height;
}

[Serializable]
public class PoseNetData
{
    public PoseNetPose[] poses;
    public PoseNetImage image;
}

public class MyMath
{
    // the function to map a value from one range to another
    // i have it from here:
    // https://forum.unity.com/threads/mapping-or-scaling-values-to-a-new-range.180090/
    public static float Mapped(float x, float in_min, float in_max, float out_min, float out_max)
    {
        // clamp 
        if ((x >= in_max && in_max > in_min) || (x >= in_min && in_max < in_min))
        {
            return out_max;
        }
        else if ((x <= in_min && in_max > in_min) || (x <= in_max && in_max < in_min))
        {
            return out_min;
        }

        return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
    }
}


/*************************************************************
 *          Receiver class
 */

public class WebSocketPoseReceiver : MonoBehaviour {

    // public variables
    // https://docs.unity3d.com/Manual/VariablesAndTheInspector.html
    // the websocket server ip
    // if the server is on your own computer, just use "localhost"
    public string websocketServerIp = "localhost";
    // the websocket server port
    public string websocketServerPort = "9090";

    [Range(0.00001f, 0.99999f)]
    public float smoothing = 0.80f;

    public float zDistanceMin = 50.0f;
    public float zDistanceMax = 300.0f;

    // Use this for initialization
    IEnumerator Start () {

        // https://docs.unity3d.com/ScriptReference/String.html
        WebSocket w = new WebSocket(new Uri(string.Format("ws://{0}:{1}",websocketServerIp,websocketServerPort)));
		yield return StartCoroutine(w.Connect());

        List<Vector3> poseNetPositions = new List<Vector3>();
        while (true)
		{
			string reply = w.RecvString();
			if (reply != null)
			{

                // sometimes there might be something else delivered than the poses data..
                // for that case we try first
                // https://docs.unity3d.com/ScriptReference/Debug.LogException.html
                try
                {
                    // put the data in a PoseNetData object
                    PoseNetData poseNetData = JsonUtility.FromJson<PoseNetData>(reply);

                    // log it 
                    // Debug.Log("length: " + poseNetData.poses.Length);

                    // it is good practice to have only one single listener for websockets,
                    // but we want to possible have more than one thing react
                    // so we send messages inbetween Unity scripts from here
                    // https://docs.unity3d.com/ScriptReference/Component.BroadcastMessage.html
                    // https://docs.unity3d.com/ScriptReference/Component.SendMessage.html

                    // send the raw posenet data
                    BroadcastMessage("GetPoseNetPoses", poseNetData, SendMessageOptions.DontRequireReceiver);

                    // let's check if there is a new user
                    if (poseNetData.poses.Length > poseNetPositions.Count)
                    {
                        BroadcastMessage("GetPoseNetUserAdded", poseNetData.poses.Length, SendMessageOptions.DontRequireReceiver);
                        // we know someone is added, so we also have to add a new position
                        poseNetPositions.Add(new Vector3());
                    }
                    else if (poseNetData.poses.Length < poseNetPositions.Count)
                    {
                        BroadcastMessage("GetPoseNetUserRemoved", poseNetData.poses.Length, SendMessageOptions.DontRequireReceiver);
                        // we know someone left
                        // we don't know who left, so we just remove the last one
                        poseNetPositions.RemoveAt(poseNetPositions.Count - 1);
                    }

                    // make sure we don't shoot out of our data
                    int maximumIndex = Math.Min(poseNetData.poses.Length, poseNetPositions.Count);

                    // then go through all of them
                    for (int i = 0; i < maximumIndex; i++)
                    {
                        PoseNetPose pose = poseNetData.poses[i];

                        // out positions are related on the dimensions of the camera image.. wouldn't it be cool if they were not?
                        // this is how you can map them in the range of -1 to 1
                        // check out the Map function below if you want to see how it's done
                        // usually you can get a function like this if you just google "unity map value to range" or something like that
                        float newX = MyMath.Mapped(pose.keypoints[(int)SkeletonDefinitions.Nose].position.x, 0, poseNetData.image.width, -1, 1);
                        // for vertical position we do it the other way around
                        float newY = MyMath.Mapped(pose.keypoints[(int)SkeletonDefinitions.Nose].position.y, poseNetData.image.height, 0, -1, 1);
                        float earDistance = Mathf.Abs(pose.keypoints[(int)SkeletonDefinitions.RightEar].position.x - pose.keypoints[(int)SkeletonDefinitions.LeftEar].position.x);

                        float newZ = MyMath.Mapped(earDistance, zDistanceMin, zDistanceMax, 1, -1);

                        // Then we want to smooth the value
                        // so we make a newPosition, from which we can interpolate
                        Vector3 newPosition = new Vector3(newX, newY, newZ);

                        // Lerp is a function to interpolate between values
                        // https://docs.unity3d.com/ScriptReference/Vector3.Lerp.html
                        poseNetPositions[i] = Vector3.Lerp(newPosition, poseNetPositions[i], smoothing);
                    }

                    BroadcastMessage("GetPoseNetPositions", poseNetPositions, SendMessageOptions.DontRequireReceiver);

                }
                catch (Exception e)
                {
                    Debug.LogException(e, this);
                }

            }
			if (w.error != null)
			{
				Debug.LogError ("Error: "+w.error);
				break;
			}
			yield return 0;
		}
		w.Close();
	}

}
