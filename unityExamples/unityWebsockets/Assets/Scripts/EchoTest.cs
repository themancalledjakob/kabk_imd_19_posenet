using UnityEngine;
using System.Collections;
using System;

public class EchoTest : MonoBehaviour {

    // public variables
    // https://docs.unity3d.com/Manual/VariablesAndTheInspector.html

    // the websocket server ip
    // if the server is on your own computer, just use "localhost"
    public string websocketServerIp = "192.168.1.107";
    // the websocket server port
    public string websocketServerPort = "8080";


    // Use this for initialization
    IEnumerator Start () {

        // https://docs.unity3d.com/ScriptReference/String.html
        WebSocket w = new WebSocket(new Uri(string.Format("ws://{0}:{1}",websocketServerIp,websocketServerPort)));
		yield return StartCoroutine(w.Connect());

        w.SendString("Hi there");

		while (true)
		{
			string reply = w.RecvString();
			if (reply != null)
			{
				Debug.Log ("Received: "+reply);
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
