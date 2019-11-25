#!/bin/bash
currentDirectory="$(dirname "$BASH_SOURCE")"
cd "$currentDirectory/generic-server.js"
npm install
node ./generic-server.js &
cd ..
cd "$currentDirectory/posenet-for-installations"
yarn start
