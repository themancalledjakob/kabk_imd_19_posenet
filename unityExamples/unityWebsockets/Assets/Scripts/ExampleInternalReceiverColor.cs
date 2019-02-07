using UnityEngine;
using System.Collections;
using System;
using System.Collections.Generic;

public class ExampleInternalReceiver : MonoBehaviour
{
    public ExampleInternalReceiver()
    {
    }

    Renderer rend;
    void Start()
    {
        rend = GetComponent<Renderer>();
    }

    public float moveScale = 10.0f;

    public void GetPoseNetPositions(List<Vector3> poseNetPositions)
    {
        // only change position if there is somebody
        if (poseNetPositions.Count > 0)
        {
            transform.position = poseNetPositions[0] * moveScale;
        }
        // otherwise put it in the middle
        else
        {
            transform.position = new Vector3(0, 0, 0);
        }
    }

    public void GetPoseNetUserAdded(int users)
    {
        rend.material.color = Color.red;
    }
    public void GetPoseNetUserRemoved(int users)
    {
        if (users == 0)
        {
            rend.material.color = Color.white;
        }
    }
}
