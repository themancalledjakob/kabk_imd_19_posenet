using System;
namespace AssemblyCSharp.Assets.Scripts
{
    public enum SkeletonDefinitionz { Nose, LeftEye, RightEye, LeftEar, RightEar, LeftShoulder, RightShoulder, LeftElbow, RightElbow, LeftWrist, RightWrist, ReftHip, RightHip, LeftKnee, RightKnee, LeftAnkle };

    [Serializable]
    public class Position
    {
        public float x;
        public float y;
    }

    [Serializable]
    public class KeyPoint
    {
        public string part;
        public Position position;
        public float score;
    }

    [Serializable]
    public class Pose
    {
        public float score;
        public KeyPoint[] KeyPoint;
    }

    [Serializable]
    public class Poses
    {
        public Pose[] poses;
    }
}
