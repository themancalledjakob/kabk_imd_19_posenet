# kabk_imd_19_posenet
repository for detecting people through webcam and distribute their data via websockets

# PoseNet setup
- download this repository or clone it
- open terminal
- type `cd ` (don't forget the space at the end)
- drag and drop the folder `kabk_imd_19_posenet/posenet-for-installations/` in the terminal
- hit enter
- type `yarn setup`
- wait until finished
- type `yarn download-models`
- wait until finished without errors, if there are errors, type the same command again (it depends on your internet connection...)

# PoseNet usage
- open a new terminal
- type `cd ` (don't forget the space at the end)
- drag and drop the folder `kabk_imd_19_posenet/posenet-for-installations/` in the terminal
- type `yarn start`
- wait until browser opens and you can see the default site
- click on the camera icon
- select your camera
- toggle `capture` and click `close`
- click on the figure
- toggle `active`
- always keep this tab in focus!

- open a new terminal
- type `cd ` (don't forget the space at the end)
- drag and drop the folder `kabk_imd_19_posenet/generic-server.js/` in the terminal
- type `node generic-server.js`

- open a new terminal
- type `cd ` (don't forget the space at the end)
- drag and drop the folder `kabk_imd_19_posenet/posenetClientExamples/` in the terminal
- type `php -S localhost:9999`
- open `localhost:9999/01_basic/` in a new browser window


# Unity setup

You need to download Unity3D Community (Personal):

https://unity3d.com/get-unity/download

And you also need an editor for the code.

I recommend for macOS and Linux:

https://www.monodevelop.com/download/

And for Windows:

https://visualstudio.microsoft.com/vs/unity-tools/

during installing you will be asked to install build tools.

install:
`Linux Build Support`
`WebGL Build Support`

If you're on a Windows computer also install:
`Windows Build Support`

If you're on a Mac also install:
`Mac Build Support`

When installing Visual studio it asks you to install workloads, select:
- `.NET desktop development`
- `Desktop development with C++`
- `Universal Windows Platform development`

# Unity usage

download this repository or clone it

- open Unity
- open the folder `kabk_imd_19_posenet/unityExamples/unityWebsockets/` in Unity
