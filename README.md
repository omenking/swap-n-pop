![Swap'N'Pop Logo](http://www.swapnpop.com/logo.png)

# Swap'N'Pop
Download: http://swapnpop.com

## Cross-platform Realtime-Puzzle Game
We all remember our favorite match three puzzle game. Swap'N'Pop brings it back, but with a new look, new gameplay mechanics, with multiplayer designed for competitive play, integration with Discord and built in ranked ladder. 

## Project Info
We use Phaser together Electron to be cross-compatible. We recently switched to Typescript since we want to ensure typesafety. Webpack is also used to bundle all our files. Test Code runs through Chai and Sinon.

![](https://github.com/omenking/swap-n-pop/blob/master/screenshots/titlescreen.png)

![](https://github.com/omenking/swap-n-pop/blob/master/screenshots/vs.png)

![](https://github.com/omenking/swap-n-pop/blob/master/screenshots/debugger.png)


## Current Team
| Role              | Name              | Site 
| -                 | -                 | -  
| Developer         | Omenking          |    
| Developer         | Halfbakedprophet  |      
| Developer         | Cappu             |
| Developer         | Skytrias          | 
| Concept Artist    | Wish              | [deviantart](https://wishh-starr.deviantart.com)
| Spriter           | Neweegee          | [deviantart](https://neoweegee.deviantart.com)
| Spriter           | Gaem              |
| Spriter           | RJ                |
| Ui                | Jash              |
| Music             | Jaxcheese         | [bandcamp](https://jaxcheese.bandcamp.com/)

## Development
Please read the how to contribute code page on our [gitbook](https://omenking.gitbooks.io/swap-n-pop/content/how-to-contribute-code.html) for more info.

There are two `package.json` files
* `/package.json`     - the app itself, packaging the app for distribution
* `/app/package.json` - additional devtools

To run the latest master branch locally:
1. `clone Swap'N'Pop `
1. `npm install` (in root)
1. `cd app`
1. `npm install`
1. `cd ..`
1. `npm start`

To build a binary for the filesystem you are on use `npm dist` in root:


## Links
More on the project: [Gitbook](https://omenking.gitbooks.io/swap-n-pop/content/)
Our official discord server: [Discord](https://discord.gg/ZKZkug8)

## Special Thanks
To the data miners over at the TetrisAttackOnline Discord Server.

## Seperate Licensing for Creative Content

Our Lead Designer and Game Designer is Wish:
https://c0w-bell.deviantart.com/

Wish is contributing a theme to our game from their existing content, such as characters,
graphics, storyline that are of their own ownership. The MIT liscnese does not
apply to these assets and is considered to be All rights reserved by
Wish for the time being.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![Build Status](https://travis-ci.org/omenking/swap-n-pop.svg?branch=master)](https://travis-ci.org/omenking/swap-n-pop) ![Test](https://ci.appveyor.com/api/projects/status/github/omenking/swap-n-pop?branch=master&svg=true) 

#How to create custom Mac Icon
https://www.youtube.com/watch?v=QbVni3ot76U
iconutil -c icns myicon.iconset
