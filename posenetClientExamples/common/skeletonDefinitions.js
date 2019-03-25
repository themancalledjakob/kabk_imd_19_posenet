/****************************************************************************
* Skeleton Definitions
*
* Don't forget to run the server with `node index.js` in terminal
* open `localhost:8080/01_basic` with browser
****************************************************************************/
// To avoid having a 'for loop' everytime I want to access a specific keypoint,
// I console logged the keypoints from the pose
// and then assigned them in order to their respective place
//keypoints: Array(17)0: {score: 0.992160975933075, part: "nose", position: {…}}1: {score: 0.3075892925262451, part: "leftEye", position: {…}}2: {score: 0.9983727931976318, part: "rightEye", position: {…}}3: {score: 0.6810755133628845, part: "leftEar", position: {…}}4: {score: 0.4896487593650818, part: "rightEar", position: {…}}5: {score: 0.0780579149723053, part: "leftShoulder", position: {…}}6: {score: 0.09449974447488785, part: "rightShoulder", position: {…}}7: {score: 0.05956749990582466, part: "leftElbow", position: {…}}8: {score: 0.20672185719013214, part: "rightElbow", position: {…}}9: {score: 0.0010570894228294492, part: "leftWrist", position: {…}}10: {score: 0.004411289002746344, part: "rightWrist", position: {…}}11: {score: 0.0015992302214726806, part: "leftHip", position: {…}}12: {score: 0.010474851354956627, part: "rightHip", position: {…}}13: {score: 0.0004480510833673179, part: "leftKnee", position: {…}}14: {score: 0.0012133062118664384, part: "rightKnee", position: {…}}15: {score: 0.0003004006575793028, part: "leftAnkle", position: {…}}16: {score: 0.002315996680408716, part: "rightAnkle", position: {…}}length: 17__proto__: Array(0)score: 0.2311479156213703__proto__: Object

var SkeletonDefinitions = Object.freeze({
    Nose:0,
    LeftEye:1,
    RightEye:2, 
    LeftEar:3,
    RightEar:4,
    LeftShoulder:5,
    RightShoulder:6,
    LeftElbow:7,
    RightElbow:8,
    LeftWrist:9,
    RightWrist:10,
    LeftHip:11,
    RightHip:12,
    LeftKnee:13,
    RightKnee:14,
    LeftAnkle:15,
    RightAnkle:16
});

function Enu(thing) {
    return ParseInt(thing);
}
