#!/bin/bash
currentDirectory="$(dirname "$BASH_SOURCE")"
cd "$currentDirectory"

if type brew >&- ; then
   echo "brew is installed"
else
   /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
fi
"install yarn"
brew update
brew install yarn

cd posenet-for-installations
yarn setup
yarn download-models
