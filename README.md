# kabk_imd_19_posenet
repository for detecting people through webcam and distribute their data via websockets

# PoseNet preparation Mac
- open terminal
- install brew (http://brew.sh) type `/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`
- hit `enter`
- wait
- type `brew update`
- hit `enter`
- type `brew install yarn`
- hit `enter`

# PoseNet preparation Windows
- install python (e.g. 3.7, but try different versions if it doesn't work)
- add python path to system path (google this, it's explained on python website)

# PoseNet setup
- download this repository or clone it
- open terminal
- type `cd ` (don't forget the space at the end)
- drag and drop the folder `kabk_imd_19_posenet/posenet-for-installations/` in the terminal
- hit enter
- type `yarn setup`
- hit `enter`
- wait until finished
- type `yarn download-models`
- hit `enter`
- wait until finished without errors, if there are errors, type the same command again (it depends on your internet connection...)

# PoseNet usage
## run the posenet camera tracker
- open a new terminal
- type `cd ` (don't forget the space at the end)
- drag and drop the folder `kabk_imd_19_posenet/posenet-for-installations/` in the terminal
- hit `enter`
- type `yarn start`
- hit `enter`
- wait until browser opens and you can see the default site
- click on the camera icon
- select your camera
- toggle `capture` and click `close`
- click on the figure
- toggle `active`
- always keep this tab in focus!

## run a websocket server
- open a new terminal
- type `cd ` (don't forget the space at the end)
- drag and drop the folder `kabk_imd_19_posenet/generic-server.js/` in the terminal
- hit `enter`
- type `node generic-server.js`
- hit `enter`

## connect posenet camera tracker to websocket server
- open the broswer with the posenet camera tracker
- click on the leftmost icon (the wifi-screenish thing)
- fill in host `localhost`
- fill in port `8080`
- click connect
- click close

# Web usage
## tryout the example!
- open a new terminal
- type `cd ` (don't forget the space at the end)
- drag and drop the folder `kabk_imd_19_posenet/posenetClientExamples/` in the terminal
- hit `enter`
- on a mac/linux type: `php -S localhost:9999`
- on a windows type: `python -m SimpleHTTPServer 9999`
- on a windows alternatively type: `python -m http.server 9999`
- hit `enter`
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

When you installed everything, open Unity and create an account

# Unity usage

download this repository or clone it, if you didn't already do it

- open Unity
- open the folder `kabk_imd_19_posenet/unityExamples/unityWebsockets/` in Unity

# Troubleshooting FAQ
- let me know when you run into errors or troubles! I will put here a FAQ :-)
