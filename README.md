# Going Nuts

Entry submitted for the Ludum Dare 40.

<p align="center">
<img src="https://github.com/nidup/ldjam40/blob/master/assets/doc/goingnuts.png" alt="Going Nuts"/>
</p>

## Description

Oh... you wake up late to prepare your stocks for the winter.
You must collect as much nuts as you can before it's too late.

## How to Play

Use arrow keys to move left or right, and space bar for actions.
The sound is important in this game, so turn on the sound (even better with headset on!).

## Links

[Play the game on Itch.io](https://grena.itch.io/going-nuts) (it downloads the whole internet, so please be patient <3) TODO

## Credits

Game submitted in jam mode, but made in ~48h with compo constraints (except we were 5 evil laugh):

 - grena (https://twitter.com/grenagluman) - Code, game design, SFX
 - juliensnz (https://twitter.com/juliensnz) - Code, game design, SFX
 - nao (https://twitter.com/nao__ink) - Arts & graphics
 - pierallard (https://twitter.com/Pierrallard) - Code, game design
 - nidup (https://twitter.com/duponico) - Code, game design

## Licenses

MIT for the code of this repository (src folder).

Copyright Nao ink for the artwork (assets folder).

# Getting Started to Dev

## Run the dev image

Run to mount local project code inside the container and bind ports
```
docker run --name phaser --rm -v "$PWD":/usr/src/app -p 8080:8080 -d nidup/phaser:latest
```

Your container should appears in the list when typing,
```
docker ps
```

## Install / update project dependencies

```
docker exec -it phaser npm install
```

## Running the project in dev mode:

Launch webpack server in watch mode,
```
docker exec -it phaser npm run dev
```

You can access your project in your browser,
```
http://localhost:8080/
```

# Deploy the demo

## Build the bundle.js

```
docker exec -it phaser npm run build
```

## Commit then push the bundle.js

```
git add build/bundle.js
git commit
git push
```

# Utils

## Connect in bash to the dev image

Run,
```
docker exec -it phaser bash
```

Your local files should be mounted in the container,
```
ls
Dockerfile  LICENSE  README.md	assets	bin  doc  index.html  lib  package.json  src  tsconfig.json  webpack.config.js
```
