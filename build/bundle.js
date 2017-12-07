/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 16);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class SoundManager {
    constructor(game) {
        this.game = game;
    }
    init() {
        this.musicInside = this.game.add.audio('music/inside');
        this.musicOutside = this.game.add.audio('music/outside');
        this.musicOther = this.game.add.audio('music/other');
    }
    playInside() {
        this.musicOutside.mute = true;
        this.musicInside.mute = false;
        if (!this.musicInside.isPlaying) {
            this.musicInside.play('', 0, 0.6, true);
        }
    }
    playOutside() {
        this.musicInside.mute = true;
        this.musicOutside.mute = false;
        if (!this.musicOutside.isPlaying) {
            this.musicOutside.play('', 0, 0.6, true);
        }
    }
    playIntro() {
        this.musicInside.mute = true;
        this.musicOutside.mute = true;
        if (!this.musicOther.isPlaying) {
            this.musicOther.play('', 0, 0.6, true);
        }
    }
    stop() {
        this.musicInside.mute = true;
        this.musicOutside.mute = true;
        this.musicOther.mute = true;
    }
    destroyAll() {
        this.musicInside.destroy();
        this.musicOutside.destroy();
        this.musicOther.destroy();
    }
}
exports.SoundManager = SoundManager;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/// <reference path="../lib/phaser.d.ts"/>

Object.defineProperty(exports, "__esModule", { value: true });
const Boot_1 = __webpack_require__(2);
const Preload_1 = __webpack_require__(5);
const Menu_1 = __webpack_require__(3);
const Play_1 = __webpack_require__(4);
const Start_1 = __webpack_require__(6);
class SimpleGame extends Phaser.Game {
    constructor() {
        super(1024, 576, Phaser.CANVAS, // Open GL for effect / shader ?
        'content', null);
        this.antialias = false;
        this.state.add('Boot', Boot_1.default);
        this.state.add('Preload', Preload_1.default);
        this.state.add('Menu', Menu_1.default);
        this.state.add('Start', Start_1.default);
        this.state.add('Play', Play_1.default);
        this.state.start('Boot');
    }
}
window.onload = () => {
    new SimpleGame();
};


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Boot extends Phaser.State {
    create() {
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.state.start('Preload');
    }
}
exports.default = Boot;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// TODO RENAME TO GAME OVER
class Menu extends Phaser.State {
    init(data = { score: 0 }) {
        this.score = data.score;
    }
    create() {
        this.game.stage.backgroundColor = '#000000';
        let image = this.game.add.image(150, 0, 'gameover');
        image.scale.setTo(0.75, 0.75);
        this.game.add.text(520, 272, 'x ' + this.score, {
            font: "100px 'Jaldi'",
            fill: "#ffffff"
        });
        this.game.time.events.add(Phaser.Timer.SECOND * 2, this.bindSpace.bind(this));
    }
    startGame() {
        this.game.state.start('Play', true, false);
    }
    bindSpace() {
        let spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.startGame, this);
    }
}
exports.default = Menu;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Squirrel_1 = __webpack_require__(14);
const Terrier_1 = __webpack_require__(15);
const Branch_1 = __webpack_require__(8);
const Inventory_1 = __webpack_require__(7);
const SoundManager_1 = __webpack_require__(0);
var Level;
(function (Level) {
    Level[Level["Branch"] = 0] = "Branch";
    Level[Level["Terrier"] = 1] = "Terrier";
    Level[Level["Elevator"] = 2] = "Elevator";
})(Level || (Level = {}));
class Play extends Phaser.State {
    constructor() {
        super(...arguments);
        this.debug = false;
        this.isFadingDown = false;
        this.floorSquirrelY = 1845;
        this.branchSquirrelY = 280;
        this.timerMinutes = 3;
        this.timerSeconds = 30;
        this.isEnteringElevator = false;
    }
    create() {
        if (this.debug) {
            this.game.time.advancedTiming = true;
        }
        this.game.stage.backgroundColor = '#000000';
        this.game.time.advancedTiming = true;
        this.game.time.desiredFps = 60;
        this.game.time.slowMotion = 1.0;
        const tileSpriteRatio = 1;
        const width = 1600;
        const height = 1200;
        const heightPosition = 0;
        this.backgroundLayer = this.game.add.group();
        this.backgroundLayer.name = 'Background';
        this.background = this.game.add.tileSprite(-632, 0, 1656, 2048, 'background_terrier', 0, this.backgroundLayer);
        this.background.tileScale.set(tileSpriteRatio, tileSpriteRatio);
        const itemsLayer = this.game.add.group();
        itemsLayer.name = 'Items';
        this.lift = new Phaser.Sprite(this.game, 828, this.floorSquirrelY - 1095, 'lift');
        itemsLayer.add(this.lift);
        this.lift.scale.set(0.2, 0.21);
        this.game.physics.enable(this.lift, Phaser.Physics.ARCADE);
        // this.buildings = this.game.add.tileSprite(0,heightPosition,width,height,'buildings',0, itemsLayer);
        // this.buildings.tileScale.set(tileSpriteRatio, tileSpriteRatio);
        // this.buildings.animations.add('idle', [0, 1, 2], 2, true);
        // this.buildings.animations.play('idle');
        this.characterLayer = this.game.add.group();
        this.characterLayer.name = 'Characters';
        const interfaceLayer = this.game.add.group();
        interfaceLayer.name = 'Interface';
        this.game.camera.onFadeComplete.add(() => {
            this.isFadingDown = false;
        });
        this.game.camera.onFlashComplete.add(() => {
            this.isFadingDown = false;
        });
        this.currentLevel = Level.Terrier;
        this.branch = new Branch_1.Branch(itemsLayer);
        this.terrier = new Terrier_1.Terrier(itemsLayer, 10, 1700, '');
        this.squirrel = new Squirrel_1.Squirrel(this.characterLayer, 200, this.floorSquirrelY, 'squirrel', this.branch, this.terrier);
        this.terrier.buckets.map(bucket => {
            let sprite = new Phaser.Sprite(this.game, bucket.body.x - 60, bucket.body.y + 67, 'nest');
            sprite.scale.set(0.3);
            itemsLayer.add(sprite);
        });
        this.timer = this.game.time.create();
        const timerEvent = this.timer.add(Phaser.Timer.MINUTE * this.timerMinutes + Phaser.Timer.SECOND * this.timerSeconds, this.gameOver, this);
        this.timer.start();
        new Inventory_1.Inventory(interfaceLayer, 0, 0, 'Inventory', this.squirrel, this.terrier, this.timer, timerEvent);
        this.treeDoor = new Phaser.Sprite(this.game, 30, 0, 'tree_door');
        this.characterLayer.add(this.treeDoor);
        this.treeDoor.scale.set(1, 1);
        this.soundManager = new SoundManager_1.SoundManager(this.game);
        this.soundManager.init();
        this.soundManager.playInside();
        this.game.world.setBounds(0, 0, 1024, 2048);
        this.game.camera.y = 2048;
    }
    update() {
        if (this.currentLevel == Level.Branch) {
            if (this.squirrel.body.x >= 800) {
                this.enterElevatorTo(Level.Terrier);
                return;
            }
        }
        if (this.currentLevel == Level.Elevator) {
            this.updateElevator();
        }
        if (this.currentLevel == Level.Terrier) {
            if (this.squirrel.body.x >= 800) {
                this.enterElevatorTo(Level.Branch);
            }
            if (this.squirrel.body.x <= 200) {
                this.squirrel.body.x = 200;
            }
        }
        this.terrier.tryToAddHole();
    }
    render() {
        if (this.debug) {
            this.game.debug.text("FPS: " + this.game.time.fps + " ", 2, 14, "#00ff00");
            for (let i = 0; i < 6; i++) {
                if (this.terrier.getHoles()[i]) {
                    this.game.debug.body(this.terrier.getHoles()[i]);
                }
            }
            for (let i = 0; i < 6; i++) {
                if (this.branch.nuts()[i]) {
                    this.game.debug.body(this.branch.nuts()[i]);
                }
            }
            this.terrier.buckets.map(bucket => this.game.debug.body(bucket));
            this.branch.nuts().map((nut) => (this.game.debug.body(nut)));
            this.game.debug.body(this.squirrel);
            this.game.debug.body(this.treeDoor);
            this.game.debug.cameraInfo(this.game.camera, 32, 32);
        }
    }
    enterElevatorTo(toLevel) {
        if (this.currentLevel !== Level.Elevator && !this.isEnteringElevator) {
            this.elevatorDestination = toLevel;
            this.squirrel.elevatorIn();
            this.squirrel.body.x = 900;
            this.isEnteringElevator = true;
            if (toLevel == Level.Terrier) {
                this.game.camera.fade(0x000000, 250, true, 1);
                this.game.time.events.add(Phaser.Timer.SECOND * 0.4, () => {
                    this.currentLevel = Level.Elevator;
                    const sound = this.game.add.audio(`sound/lift`);
                    sound.play('', 0, 0.4);
                    this.switchToInterior();
                });
            }
            else {
                this.currentLevel = Level.Elevator;
                this.game.camera.fade(0x000000, 1500, true, 1);
                const sound = this.game.add.audio(`sound/lift`);
                sound.play('', 0, 0.4);
            }
        }
    }
    updateElevator() {
        let elevatorSpeed = 5;
        const maxCameraBranchY = 0;
        const maxSquirrelBranchY = this.branchSquirrelY;
        const maxCameraTerrierY = 1400;
        const maxSquirrelTerrierY = this.floorSquirrelY - 130;
        let cameraBump = false;
        let squirrelBump = false;
        // GO DEEPER
        if (this.elevatorDestination == Level.Terrier) {
            if (this.game.camera.y > 550 && this.game.camera.y < 600 && !this.isFadingDown) {
                this.game.camera.flash(0x000000, 1000, false, 1);
                this.isFadingDown = true;
                this.lift.alpha = 1;
                this.squirrel.body.x = 900;
            }
            if (this.game.camera.y < maxCameraTerrierY) {
                this.game.camera.y += elevatorSpeed;
            }
            else {
                cameraBump = true;
            }
            if (this.squirrel.body.y < maxSquirrelTerrierY) {
                this.squirrel.body.y += elevatorSpeed;
                this.lift.body.y += elevatorSpeed;
            }
            else {
                squirrelBump = true;
            }
        }
        // GO UPPER
        if (this.elevatorDestination == Level.Branch) {
            if (this.game.camera.y < 500) {
                elevatorSpeed *= 20;
            }
            if (this.game.camera.y > maxCameraBranchY) {
                this.game.camera.y -= elevatorSpeed;
            }
            else {
                cameraBump = true;
            }
            if (this.squirrel.body.y > maxSquirrelBranchY) {
                this.squirrel.body.y -= elevatorSpeed;
                this.lift.body.y -= elevatorSpeed;
            }
            else {
                squirrelBump = true;
            }
        }
        // FORBID THE SQUIRREL TO GET OUT ELEVATOR
        if (this.squirrel.body.x < 800) {
            this.squirrel.body.x = 800;
        }
        // DEFINE WHEN IT ARRIVES
        if (cameraBump && squirrelBump) {
            if (this.elevatorDestination == Level.Branch) {
                this.game.camera.flash(0x000000, 500, true, 1);
                this.switchToOutside();
                this.squirrel.body.y = maxSquirrelBranchY;
                this.lift.body.y = maxSquirrelBranchY - 965;
                this.lift.alpha = 0;
            }
            this.isFadingDown = false;
            this.squirrel.elevatorOut();
            this.squirrel.turnLeft();
            this.currentLevel = this.elevatorDestination;
            this.squirrel.body.x = 780;
            this.isEnteringElevator = false;
        }
    }
    switchToInterior() {
        this.soundManager.playInside();
    }
    switchToOutside() {
        this.soundManager.playOutside();
    }
    shutdown() {
        this.background.destroy();
        this.squirrel.destroy();
        this.soundManager.destroyAll();
    }
    gameOver() {
        this.soundManager.stop();
        this.timer.stop();
        this.game.state.start('Menu', true, false, { score: this.terrier.totalNuts() });
    }
}
exports.default = Play;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Preload extends Phaser.State {
    preload() {
        this.loadAudio();
        this.loadLevels();
        this.loadGameImages();
        this.loadFonts();
    }
    create() {
        this.game.state.start('Start'); // TODO: shortcuts "Menu" state :)
    }
    loadAudio() {
        this.load.audio('music/other', 'assets/ost/Other.mp3');
        this.load.audio('music/outside', 'assets/ost/Outside1.mp3');
        this.load.audio('music/inside', 'assets/ost/Inside2.mp3');
        this.load.audio('sound/lift', 'assets/ost/lift.mp3');
        this.load.audio('sound/walk', 'assets/ost/walk.mp3');
        this.load.audio('sound/leaf/leaf1', 'assets/ost/leaf/leaf1.mp3');
        this.load.audio('sound/leaf/leaf2', 'assets/ost/leaf/leaf2.mp3');
        this.load.audio('sound/leaf/leaf3', 'assets/ost/leaf/leaf3.mp3');
        this.load.audio('sound/leaf/leaf4', 'assets/ost/leaf/leaf4.mp3');
        this.load.audio('sound/leaf/leaf5', 'assets/ost/leaf/leaf5.mp3');
        this.load.audio('sound/leaf/leaf6', 'assets/ost/leaf/leaf6.mp3');
        this.load.audio('sound/leaf/leaf7', 'assets/ost/leaf/leaf7.mp3');
        this.load.audio('sound/bear/bear1', 'assets/ost/bear/bear1.mp3');
        this.load.audio('sound/bear/bear2', 'assets/ost/bear/bear2.mp3');
        this.load.audio('sound/bear/bear3', 'assets/ost/bear/bear3.mp3');
        this.load.audio('sound/bear/bear4', 'assets/ost/bear/bear4.mp3');
        this.load.audio('sound/bear/bear5', 'assets/ost/bear/bear5.mp3');
        this.load.audio('sound/mouse/mouse1', 'assets/ost/mouse/mouse1.mp3');
        this.load.audio('sound/mouse/mouse2', 'assets/ost/mouse/mouse2.mp3');
        this.load.audio('sound/mouse/mouse3', 'assets/ost/mouse/mouse3.mp3');
        this.load.audio('sound/mouse/mouse4', 'assets/ost/mouse/mouse4.mp3');
        this.load.audio('sound/mouse/mouse5', 'assets/ost/mouse/mouse5.mp3');
        this.load.audio('sound/raccoon/raccoon1', 'assets/ost/raccoon/raccoon1.mp3');
        this.load.audio('sound/raccoon/raccoon2', 'assets/ost/raccoon/raccoon2.mp3');
        this.load.audio('sound/raccoon/raccoon3', 'assets/ost/raccoon/raccoon3.mp3');
        this.load.audio('sound/raccoon/raccoon4', 'assets/ost/raccoon/raccoon4.mp3');
        this.load.audio('sound/raccoon/raccoon5', 'assets/ost/raccoon/raccoon5.mp3');
        this.load.audio('sound/bear_attacked/bear1', 'assets/ost/bear_attacked/bear1.mp3');
        this.load.audio('sound/bear_attacked/bear2', 'assets/ost/bear_attacked/bear2.mp3');
        this.load.audio('sound/bear_attacked/bear3', 'assets/ost/bear_attacked/bear3.mp3');
        this.load.audio('sound/mouse_attacked/mouse1', 'assets/ost/mouse_attacked/mouse1.mp3');
        this.load.audio('sound/mouse_attacked/mouse2', 'assets/ost/mouse_attacked/mouse2.mp3');
        this.load.audio('sound/mouse_attacked/mouse3', 'assets/ost/mouse_attacked/mouse3.mp3');
        this.load.audio('sound/raccoon_attacked/raccoon1', 'assets/ost/raccoon_attacked/raccoon1.mp3');
        this.load.audio('sound/raccoon_attacked/raccoon2', 'assets/ost/raccoon_attacked/raccoon2.mp3');
        this.load.audio('sound/raccoon_attacked/raccoon3', 'assets/ost/raccoon_attacked/raccoon3.mp3');
    }
    loadLevels() {
    }
    loadGameImages() {
        this.load.spritesheet('background_terrier', 'assets/backgrounds/background_terrier.png', 1656, 2048);
        this.load.spritesheet('gameover', 'assets/backgrounds/gameover.png', 970, 776);
        this.load.spritesheet('splash', 'assets/backgrounds/splash.jpg', 2048, 1152);
        this.load.spritesheet('start', 'assets/backgrounds/start.png', 1455, 775);
        this.load.spritesheet('start_illustration', 'assets/backgrounds/start_illustration.jpg', 1024, 576);
        this.load.spritesheet('tree_door', 'assets/backgrounds/treeDoor.png', 1656, 637);
        this.load.spritesheet('lift', 'assets/lift/lift.png', 1037, 5906);
        this.load.spritesheet('hole1', 'assets/holes/hole1.png', 519, 694);
        this.load.spritesheet('hole2', 'assets/holes/hole2.png', 519, 694);
        this.load.spritesheet('hole3', 'assets/holes/hole3.png', 519, 694);
        this.load.spritesheet('hole4', 'assets/holes/hole4.png', 519, 694);
        this.load.spritesheet('hole4_shadow', 'assets/holes/hole4_shadow.png', 519, 694);
        this.load.spritesheet('bear/empty', 'assets/hands/empty_bear.png', 573, 1243);
        this.load.spritesheet('bear/full', 'assets/hands/full_bear.png', 532, 1066);
        this.load.spritesheet('mouse/empty', 'assets/hands/empty_mouse.png', 656, 1159);
        this.load.spritesheet('mouse/full', 'assets/hands/full_mouse.png', 535, 1096);
        this.load.spritesheet('raccoon/empty', 'assets/hands/empty_raccoon.png', 446, 1269);
        this.load.spritesheet('raccoon/full', 'assets/hands/full_raccoon.png', 358, 1051);
        this.load.spritesheet('nest', 'assets/nuts/nest.png', 669, 134);
        this.load.spritesheet('bucket0', 'assets/nuts/bucket0.png', 500, 500);
        this.load.spritesheet('bucket1', 'assets/nuts/bucket1.png', 500, 500);
        this.load.spritesheet('bucket2', 'assets/nuts/bucket2.png', 500, 500);
        this.load.spritesheet('bucket3', 'assets/nuts/bucket3.png', 500, 500);
        this.load.spritesheet('bucket4', 'assets/nuts/bucket4.png', 500, 500);
        this.load.spritesheet('bucket5', 'assets/nuts/bucket5.png', 500, 500);
        this.load.spritesheet('bucket6', 'assets/nuts/bucket6.png', 500, 500);
        this.load.spritesheet('squirrel', 'assets/squirrel/squirrel.png', 1866, 1866);
        // before 32x32 x ratio 8 = 256x256
        // after 1866x1866 / 7.28 ~= 256x256 | 1866 x 0.14 = 261
        // http://www.imagemagick.org/Usage/montage/ to merge images
        // cd assets/squirrels
        // montage squirrel1.png squirrel2.png squirrel3.png squirrel4.png squirrel5.png squirrel6.png squirrel7.png squirrel8.png -geometry 1866x1866 -background none squirrel.png
        this.load.spritesheet('sky', 'assets/sprites/sky.png', 800, 600);
        this.load.spritesheet('background', 'assets/sprites/background.png', 800, 600);
        this.load.spritesheet('buildings', 'assets/sprites/buildings.png', 800, 600);
        this.load.spritesheet('InventoryPanel', 'assets/sprites/ui.png', 300, 300);
        this.load.spritesheet('Inventory', 'assets/sprites/inventory.png', 401, 281);
        this.load.spritesheet('LevelPanel', 'assets/sprites/level.png', 400, 300);
        this.load.spritesheet('citizen1', 'assets/sprites/citizen1.png', 32, 32);
        this.load.spritesheet('cop', 'assets/sprites/cop.png', 32, 32);
        this.load.spritesheet('cop-shotgun', 'assets/sprites/cop-shotgun.png', 32, 32);
        this.load.spritesheet('hero', 'assets/sprites/hero.png', 32, 32);
        this.load.spritesheet('nut', 'assets/nuts/nut1.png', 385, 375);
        this.load.spritesheet('nut_glow', 'assets/nuts/nut_glow1.png', 500, 500);
        // Leaves
        this.load.spritesheet('leaf1', 'assets/leaves/leaf1.png', 251, 286);
        this.load.spritesheet('leaf2', 'assets/leaves/leaf2.png', 162, 184);
        this.load.spritesheet('leaf3', 'assets/leaves/leaf3.png', 180, 191);
        this.load.spritesheet('leaf4', 'assets/leaves/leaf4.png', 250, 246);
        this.load.spritesheet('leaf5', 'assets/leaves/leaf5.png', 263, 264);
        this.load.spritesheet('leaf6', 'assets/leaves/leaf6.png', 311, 308);
        this.load.spritesheet('leaf7', 'assets/leaves/leaf7.png', 198, 199);
        this.load.spritesheet('Bullet', 'assets/sprites/bullets.png', 10, 10);
        this.load.spritesheet('Gun', 'assets/sprites/gun.png', 20, 20);
        this.load.spritesheet('ShotGun', 'assets/sprites/shotgun.png', 20, 20);
        this.load.spritesheet('Money', 'assets/sprites/money.png', 20, 20);
    }
    loadFonts() {
        this.load.bitmapFont('carrier-command', 'assets/fonts/carrier_command.png', 'assets/fonts/carrier_command.xml');
    }
}
exports.default = Preload;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const SoundManager_1 = __webpack_require__(0);
class Start extends Phaser.State {
    create() {
        this.game.stage.backgroundColor = '#000000';
        this.imageText = this.game.add.image(0, 0, 'start');
        this.imageText.scale.setTo(0.7, 0.7);
        this.imageText.alpha = 0;
        this.imageIllustration = this.game.add.image(0, 0, 'start_illustration');
        this.imageIllustration.alpha = 0;
        this.imageSplash = this.game.add.image(0, 0, 'splash');
        this.imageSplash.scale.setTo(0.5, 0.5);
        this.imageSplash.alpha = 0;
        this.startSplash();
        this.soundManager = new SoundManager_1.SoundManager(this.game);
        this.soundManager.init();
        this.soundManager.playIntro();
        this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    }
    startSplash() {
        let tween = this.game.add.tween(this.imageSplash).to({ alpha: 1 }, 1000, Phaser.Easing.power2, true);
        tween.onComplete.add(this.waitSplash, this);
    }
    waitSplash() {
        this.game.time.events.add(Phaser.Timer.SECOND * 3, this.removeSplash.bind(this));
        this.spaceKey.onDown.removeAll();
        this.spaceKey.onDown.add(this.removeSplash, this);
    }
    removeSplash() {
        if (this.imageSplash.alpha === 1) {
            let tween = this.game.add.tween(this.imageSplash).to({ alpha: 0 }, 1000, Phaser.Easing.power2, true);
            tween.onComplete.add(this.startIllus, this);
        }
    }
    startIllus() {
        let tween = this.game.add.tween(this.imageIllustration).to({ alpha: 1 }, 1000, Phaser.Easing.power2, true);
        tween.onComplete.add(this.waitIllus, this);
    }
    waitIllus() {
        this.game.time.events.add(Phaser.Timer.SECOND * 3, this.removeIllus.bind(this));
        this.spaceKey.onDown.removeAll();
        this.spaceKey.onDown.add(this.removeIllus, this);
    }
    removeIllus() {
        let tween = this.game.add.tween(this.imageIllustration).to({ alpha: 0 }, 1000, Phaser.Easing.power2, true);
        tween.onComplete.add(this.startText, this);
    }
    startText() {
        let tween = this.game.add.tween(this.imageText).to({ alpha: 1 }, 1000, Phaser.Easing.power2, true);
        this.spaceKey.onDown.removeAll();
        this.spaceKey.onDown.add(this.startGame, this);
    }
    startGame() {
        this.soundManager.stop();
        this.game.state.start('Play', true, false);
    }
}
exports.default = Start;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Inventory extends Phaser.Sprite {
    constructor(group, x, y, key, squirrel, terrier, timer, timerEvent) {
        super(group.game, x, y, key, 0);
        this.squirrel = squirrel;
        this.terrier = terrier;
        this.timer = timer;
        this.timerEvent = timerEvent;
        group.add(this);
        this.scale.setTo(0.45, 0.5);
        this.fixedToCamera = true;
        const fontStyle = {
            font: "40px 'Jaldi'",
            fill: "#ffffff"
        };
        const marginLeftAmountToImage = 0;
        const marginTopAmountToImage = 0;
        const timerX = 40;
        const timerY = 25;
        this.timerText = this.game.add.text(timerX - marginLeftAmountToImage, timerY + marginTopAmountToImage, '0', fontStyle, group);
        this.timerText.fixedToCamera = true;
        this.timerText.align = 'right';
        const nutX = timerX + 50;
        const nutY = timerY + 50;
        this.nutsText = this.game.add.text(nutX - marginLeftAmountToImage, nutY + marginTopAmountToImage, '0', fontStyle, group);
        this.nutsText.fixedToCamera = true;
        this.nutsText.align = 'right';
    }
    update() {
        this.nutsText.setText(this.alignText(this.terrier.totalNuts()));
        this.timerText.setText("" + this.formatTime(Math.round((this.timerEvent.delay - this.timer.ms) / 1000)));
    }
    alignText(amount) {
        let text = "" + amount;
        if (amount < 10) {
            text = " " + amount;
        }
        text = "x " + text;
        return text;
    }
    formatTime(totalSeconds) {
        // Convert seconds (s) to a nicely formatted and padded time string
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = (totalSeconds - minutes * 60);
        let minutesStr = "0" + minutes;
        let secondsStr = "0" + seconds;
        return minutesStr.substr(-2) + ":" + secondsStr.substr(-2);
    }
}
exports.Inventory = Inventory;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const LEAVES_MAX = 100;
const Y = 250;
const Nut_1 = __webpack_require__(13);
const Leaf_1 = __webpack_require__(12);
const FallingLeaf_1 = __webpack_require__(10);
class Branch {
    constructor(group) {
        this.minNutAddingTime = 3;
        this.maxNutAddingTime = 9;
        this.group = group;
        this.slots = [];
        this.slots.push(new Slot(1, 20, Y), new Slot(2, 100, Y), new Slot(3, 210, Y), new Slot(4, 350, Y), new Slot(5, 470, Y), new Slot(6, 540, Y), new Slot(7, 640, Y));
        for (let i = 0; i < LEAVES_MAX; i++) {
            let slot = Math.floor(Math.random() * 7);
            this.slots[slot].attachLeaf(group);
        }
        this.slots[0].attachNut(group);
        this.slots[1].attachNut(group);
        this.slots[2].attachNut(group);
        this.slots[3].attachNut(group);
        this.slots[4].attachNut(group);
        this.slots[5].attachNut(group);
        this.slots[6].attachNut(group);
        this.group.game.time.events.add(this.randomAddingNutTime(), this.addNut, this);
    }
    nuts() {
        const notEmptySlots = this.slots.filter(function (slot) {
            return !slot.free();
        });
        const attachedNuts = [];
        notEmptySlots.forEach(function (slot) {
            attachedNuts.push(slot.nut());
        });
        return attachedNuts;
    }
    randomAddingNutTime() {
        return this.group.game.rnd.between(this.minNutAddingTime, this.maxNutAddingTime) * Phaser.Timer.SECOND;
    }
    freeSlots() {
        const freeSlots = this.slots.filter(function (slot) {
            return slot.free();
        });
        return freeSlots;
    }
    addNut() {
        const freeSlots = this.freeSlots();
        if (freeSlots.length >= 1) {
            freeSlots[0].attachNut(this.group);
        }
        this.group.game.time.events.add(this.randomAddingNutTime(), this.addNut, this);
    }
}
exports.Branch = Branch;
class Slot {
    constructor(index, x, y) {
        this.index = index;
        this.x = x;
        this.y = y;
        this.leaves = [];
    }
    nut() {
        return this.attachedNut;
    }
    attachNut(group) {
        this.attachedNut = new Nut_1.Nut(group, this.x, this.y, this);
        return this;
    }
    free() {
        return this.attachedNut === null || this.attachedNut.alive === false;
    }
    animateLeaves() {
        this.leaves.forEach((leaf) => {
            leaf.runAnimation();
        });
    }
    attachLeaf(group) {
        this.leaves.push(new Leaf_1.Leaf(group, this.x, this.y));
    }
    generateFallingLeaf(group) {
        new FallingLeaf_1.FallingLeaf(group, this.x);
    }
}
exports.Slot = Slot;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const verticalPosition = 1900;
const CAPACITY = 6;
class Bucket extends Phaser.Sprite {
    constructor(itemLayer, horizontal, pos) {
        super(itemLayer.game, horizontal + 40, verticalPosition - 40, 'hole1');
        this.nuts = 0;
        this.pos = pos;
        itemLayer.game.physics.enable(this, Phaser.Physics.ARCADE);
        itemLayer.add(this);
        this.body.setSize(500, 500);
        this.scale.set(0.2);
        this.vertical = horizontal;
        itemLayer.add(this);
    }
    update() {
        this.loadTexture(`bucket${this.nuts}`, 0);
    }
    drop() {
        if (this.nuts >= CAPACITY) {
            return false;
        }
        this.nuts++;
        return true;
    }
    pick() {
        if (this.nuts <= 0) {
            return false;
        }
        this.nuts--;
        return true;
    }
    getNuts() {
        return this.nuts;
    }
}
exports.Bucket = Bucket;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const SCALE_MIN = 0.1;
const SCALE_MAX = 0.3;
const LEAF_COUNT = 7;
const GAP_VERTICAL = 50;
const MAX_ROTATION = Math.PI / 5;
class FallingLeaf extends Phaser.Sprite {
    constructor(group, x) {
        const top = -50;
        const bottom = top + 630;
        const leafnumber = 1 + Math.floor(Math.random() * LEAF_COUNT);
        super(group.game, x - GAP_VERTICAL, top, 'leaf' + leafnumber, 0);
        group.add(this);
        this.group = group;
        this.anchor.setTo(0.5, 0.1);
        const scale = Math.random() * (SCALE_MAX - SCALE_MIN) + SCALE_MIN;
        this.scale.setTo(scale, scale);
        this.rotation = MAX_ROTATION;
        this.alpha = 1;
        this.group.game.add.tween(this).to({ x: x + GAP_VERTICAL, rotation: -MAX_ROTATION }, 1000, Phaser.Easing.Quadratic.In, true, 0, 1000, true);
        let tween = this.group.game.add.tween(this).to({ y: bottom }, 12000, Phaser.Easing.Default, true);
        tween.onComplete.add(() => {
            let tween2 = this.group.game.add.tween(this).to({ alpha: 0 }, 1000, Phaser.Easing.Default, true);
            tween2.onComplete.add(() => {
                this.destroy();
            });
        });
    }
}
exports.FallingLeaf = FallingLeaf;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const horizontalPosition = 1650;
const MAX_LIFE = 100;
const HAND_TYPES = ['bear', 'mouse', 'raccoon'];
class Hole extends Phaser.Sprite {
    constructor(itemLayer, xPosition, pos, terrier) {
        super(itemLayer.game, xPosition, horizontalPosition, 'hole1');
        this.nuts = 0;
        this.isDescending = true;
        this.scale.set(1);
        this.xPosition = xPosition;
        this.pos = pos;
        this.terrier = terrier;
        this.life = 1;
        this.itemLayer = itemLayer;
        this.terrier = terrier;
        this.timer = itemLayer.game.time.events.loop(0.2 * Phaser.Timer.SECOND, this.gainLife, this);
        itemLayer.add(this);
        itemLayer.game.physics.enable(this, Phaser.Physics.ARCADE);
        this.inputEnabled = true;
        this.body.setSize(50, 500, 50);
        this.filled = false;
    }
    gainLife() {
        if (this.filled) {
            return;
        }
        if (this.life >= MAX_LIFE) {
            return;
        }
        this.life++;
    }
    update() {
        if (this.life <= 10) {
            this.loadTexture('hole1', 0);
            if (this.hasHand()) {
                this.removeHand();
            }
        }
        else if (this.life <= 20) {
            this.loadTexture('hole2', 0);
            if (this.hasHand()) {
                this.removeHand();
            }
        }
        else if (this.life <= 30) {
            this.loadTexture('hole3', 0);
            if (this.hasHand()) {
                this.removeHand();
            }
        }
        else {
            this.loadTexture('hole4', 0);
            if (!this.hasHand()) {
                this.addHand();
            }
        }
        if (this.hasHand()) {
            this.pic.updateCrop();
        }
    }
    hit() {
        this.life = this.life - 10;
        if (this.hasHand()) {
            const sound = this.itemLayer.game.add.audio(`sound/${this.handType}_attacked/${this.handType}${Math.floor(1 + Math.random() * 3)}`);
            sound.play();
        }
        if (this.life < 0) {
            this.destroy();
            this.fill();
            this.terrier.cleanFilledHoles();
        }
        if (this.nuts > 0) {
            this.nuts = 0;
            this.handState = 'empty';
            this.refreshTexture();
            return true;
        }
        return false;
    }
    isFilled() {
        return this.filled;
    }
    fill() {
        this.filled = true;
    }
    hasHand() {
        return this.pic !== null;
    }
    removeHand() {
        if (this.pic) {
            this.pic.destroy();
        }
        if (this.shadow) {
            this.shadow.destroy();
        }
        this.pic = null;
        this.shadow = null;
        if (this.grabTween) {
            this.grabTween.stop(false);
        }
    }
    endHandMovement() {
        const matchingBucket = this.terrier.getBuckets().find((bucket) => bucket.pos === this.pos);
        if (this.handState == 'full') {
            // DESTROY THE NUT
            this.nuts = 0;
            this.handState = 'empty';
            this.refreshTexture();
        }
        else if (this.handState == 'empty' && this.isDescending) {
            // PICK UP A NUT
            if (matchingBucket && matchingBucket.nuts > 0) {
                matchingBucket.pick();
                this.nuts++;
                this.handState = 'full';
                this.refreshTexture();
            }
        }
        this.isDescending = !this.isDescending;
    }
    addHand() {
        const xPosition = this.xPosition;
        this.handType = HAND_TYPES[Math.floor(Math.random() * HAND_TYPES.length)];
        this.handState = 'empty';
        const picKey = this.handType + '/' + this.handState;
        let pic = this.itemLayer.game.add.image(xPosition + 40, horizontalPosition + 65, picKey);
        let cropRect = new Phaser.Rectangle(0, pic.height, pic.width, pic.height);
        this.grabTween = this.itemLayer.game.add.tween(cropRect).to({ y: 100 }, 3000, Phaser.Easing.Default, false, 0, 1000, true);
        const sound = this.itemLayer.game.add.audio(`sound/${this.handType}/${this.handType}${Math.floor(1 + Math.random() * 5)}`);
        sound.play();
        const shadow = this.itemLayer.game.add.image(xPosition, horizontalPosition, 'hole4_shadow');
        this.grabTween.onRepeat.add(() => {
            // console.log(`hand down ${this.pos}`);
            const sound = this.itemLayer.game.add.audio(`sound/${this.handType}/${this.handType}${Math.floor(1 + Math.random() * 5)}`);
            this.endHandMovement();
            sound.play();
        });
        pic.crop(cropRect);
        pic.scale.set(0.16);
        this.isDescending = true;
        this.grabTween.start();
        this.pic = pic;
        this.shadow = shadow;
    }
    refreshTexture() {
        this.pic.loadTexture(this.handType + '/' + this.handState);
    }
}
exports.Hole = Hole;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const SCALE_MIN = 0.3;
const SCALE_MAX = 0.6;
const LEAF_COUNT = 7;
const TOP_HEIGHT = 10;
const BOTTOM_HEIGHT = 300;
const GAP_WIDTH = 150;
const MAX_ROTATION = Math.PI / 5;
class Leaf extends Phaser.Sprite {
    constructor(group, x, y) {
        const leafnumber = 1 + Math.floor(Math.random() * LEAF_COUNT);
        const xRandom = x + (Math.random() * GAP_WIDTH) - (GAP_WIDTH / 2);
        const yRandom = TOP_HEIGHT + (Math.random() * (BOTTOM_HEIGHT - TOP_HEIGHT));
        super(group.game, xRandom, yRandom, 'leaf' + leafnumber, 0);
        group.add(this);
        this.group = group;
        this.anchor.setTo(0.5, 0.2);
        const scale = Math.random() * (SCALE_MAX - SCALE_MIN) + SCALE_MIN;
        this.scale.setTo(scale, scale);
        this.rotation = Math.random() * MAX_ROTATION * 2 - MAX_ROTATION;
        this.updateTween();
    }
    runAnimation() {
        if (this.tween.isRunning) {
            return null;
        }
        this.tween.start();
    }
    updateTween() {
        this.tween = this.group.game.add.tween(this).to({ rotation: Math.random() * MAX_ROTATION * 2 - MAX_ROTATION }, 100, Phaser.Easing.power2, false);
        this.tween.onComplete.add(this.updateTween, this);
    }
}
exports.Leaf = Leaf;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const MAX_ROTATION = Math.PI / 6;
class Nut extends Phaser.Sprite {
    constructor(group, x, y, slot) {
        super(group.game, x, y, 'nut_glow', 0);
        this.resistance = 5;
        this.slot = slot;
        this.group = group;
        group.game.physics.enable(this, Phaser.Physics.ARCADE);
        group.add(this);
        this.inputEnabled = true;
        this.anchor.setTo(0.5, Math.random());
        this.scale.setTo(0.15, 0.15);
        this.rotation = Math.random() * MAX_ROTATION * 2 - MAX_ROTATION;
        this.body.setSize(385, 2000);
        this.body.allowGravity = false;
        this.body.collideWorldBounds = true;
        this.updateTween();
    }
    runAnimation() {
        if (this.tween.isRunning) {
            return null;
        }
        this.tween.start();
    }
    updateTween() {
        this.tween = this.group.game.add.tween(this).to({ rotation: Math.random() * MAX_ROTATION * 2 - MAX_ROTATION }, 100, Phaser.Easing.power2, false);
        this.tween.onComplete.add(this.updateTween, this);
    }
    pickable() {
        return this.resistance <= 0;
    }
    hit() {
        this.runAnimation();
        this.group.game.add.tween(this).to({ y: this.y + 10 }, 30, Phaser.Easing.power2, true);
        this.slot.animateLeaves();
        this.resistance--;
        if (Math.random() > 0.7) {
            this.slot.generateFallingLeaf(this.group);
        }
    }
}
exports.Nut = Nut;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Squirrel extends Phaser.Sprite {
    constructor(group, x, y, key, branch, terrier) {
        super(group.game, x, y, key, 0);
        this.speed = 1000;
        this.scaleRatio = 0.14;
        this.nuts = 0;
        this.attacking = false;
        this.elevating = false;
        this.walking = false;
        this.branch = branch;
        this.terrier = terrier;
        group.game.physics.enable(this, Phaser.Physics.ARCADE);
        group.add(this);
        this.walk = this.game.add.audio(`sound/walk`);
        const sound = this.game.add.audio(`sound/walk`);
        this.inputEnabled = true;
        this.scale.setTo(this.scaleRatio, this.scaleRatio);
        this.anchor.setTo(0.5, 0.5);
        this.body.setSize(400, 1800, 700);
        this.body.allowGravity = false;
        this.body.collideWorldBounds = true;
        this.animations.add('idle', [0], 4, true);
        this.animations.add('idle-fat', [2], 4, true);
        this.animations.add('walk', [0, 1], 12, true);
        this.animations.add('walk-fat', [2, 3], 8, true);
        this.animations.add('elevator', [4], 8, true);
        this.animations.add('elevator-fat', [5], 8, true);
        const kickAnimation = this.animations.add('kick', [6, 7], 12, false);
        const dropAnimation = this.animations.add('drop', [0, 2], 12, false);
        kickAnimation.onStart.add(this.action, this);
        dropAnimation.onStart.add(this.action, this);
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.actionKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    }
    update() {
        this.move();
    }
    pick(nut) {
        this.nuts++;
        nut.destroy();
    }
    currentSpeed() {
        return this.speed / (1 + this.nuts * 2);
    }
    turnLeft() {
        this.scale.x = -this.scaleRatio;
        this.body.velocity.x = -this.currentSpeed();
    }
    turnRight() {
        this.scale.x = this.scaleRatio;
        this.body.velocity.x = this.currentSpeed();
    }
    elevatorIn() {
        this.elevating = true;
    }
    elevatorOut() {
        this.elevating = false;
    }
    move() {
        const previousWalking = this.walking;
        const fat = this.nuts > 0;
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
        if (this.elevating) {
            this.walking = false;
            if (fat) {
                this.animations.play('elevator-fat');
            }
            else {
                this.animations.play('elevator');
            }
            this.stopWalk(fat);
            return;
        }
        if (this.cursors.left.isDown) {
            this.walking = true;
            this.turnLeft();
        }
        else if (this.cursors.right.isDown) {
            this.walking = true;
            this.turnRight();
        }
        else if (this.actionKey.isDown) {
            this.walking = false;
            if (this.nuts > 0 && this.body.y > 500) {
                this.animations.play('drop');
            }
            else {
                this.animations.play('kick');
            }
        }
        else {
            this.walking = false;
            if (fat) {
                this.animations.play('idle-fat');
            }
            else {
                this.animations.play('idle');
            }
        }
        if (previousWalking !== this.walking || false === this.walking) {
            if (this.walking) {
                this.startWalk(fat);
            }
            else {
                this.stopWalk(fat);
            }
        }
    }
    startWalk(fat = false) {
        if (fat) {
            this.animations.play('walk-fat');
        }
        else {
            this.animations.play('walk');
        }
        this.walk.play('', 0, 0.5, true);
    }
    stopWalk(fat = false) {
        this.walk.stop();
    }
    action() {
        if (this.attacking === false) {
            this.attacking = true;
            this.game.physics.arcade.overlap(this, this.branch.nuts(), function (squirrel, nut) {
                const sound = this.game.add.audio(`sound/leaf/leaf${Math.floor(1 + Math.random() * 7)}`);
                sound.play('', 0, 0.3);
                nut.hit();
                if (nut.pickable()) {
                    squirrel.pick(nut);
                }
            }, null, this);
            if (this.nuts > 0) {
                this.game.physics.arcade.overlap(this, this.terrier.getBuckets(), function (squirrel, bucket) {
                    if (this.nuts > 0 && bucket.drop()) {
                        this.nuts--;
                    }
                }, null, this);
            }
            else {
                this.game.physics.arcade.overlap(this, this.terrier.getHoles(), function (squirrel, hole) {
                    const bucket = this.terrier.getBuckets().find((bucket) => bucket.pos === hole.pos);
                    if (bucket && hole.hit()) {
                        bucket.drop();
                    }
                }, null, this);
            }
            this.attacking = false;
        }
    }
}
exports.Squirrel = Squirrel;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Hole_1 = __webpack_require__(11);
const Bucket_1 = __webpack_require__(9);
const SLOTS = 4;
const MIN_HOLE_TIME = 4;
const MAX_HOLE_TIME = 7;
const MIN_SLOT_X = 150;
const MAX_SLOT_X = 800;
const SLOT_SIZE = (MAX_SLOT_X - MIN_SLOT_X) / SLOTS;
class Terrier extends Phaser.Sprite {
    constructor(itemLayer, x, y, key) {
        super(itemLayer.game, x, y, key);
        this.nextHoleIsComing = false;
        this.holes = [];
        this.buckets = [];
        this.itemLayer = itemLayer;
        this.addBuckets();
    }
    cleanFilledHoles() {
        this.holes = this.holes.filter(hole => !hole.isFilled());
    }
    getHoles() {
        return this.holes;
    }
    getBuckets() {
        return this.buckets;
    }
    addHole() {
        const availableSlot = this.randomAvailableSlot();
        if (null !== availableSlot) {
            this.holes.push(new Hole_1.Hole(this.itemLayer, MIN_SLOT_X + SLOT_SIZE * (availableSlot - 1), availableSlot, this));
        }
        this.nextHoleIsComing = false;
    }
    addBuckets() {
        for (let i = 1; i <= SLOTS; i++) {
            this.addBucket(i);
        }
    }
    addBucket(slot) {
        if (null !== slot) {
            this.buckets.push(new Bucket_1.Bucket(this.itemLayer, MIN_SLOT_X + SLOT_SIZE * (slot - 1), slot));
        }
    }
    randomTime() {
        return this.itemLayer.game.rnd.between(MIN_HOLE_TIME, MAX_HOLE_TIME) * Phaser.Timer.SECOND;
    }
    randomAvailableSlot() {
        const emptySlots = this.getEmptySlots();
        if (emptySlots.length === 0) {
            return null;
        }
        let randomSlotIndex = this.itemLayer.game.rnd.integerInRange(0, emptySlots.length - 1);
        return emptySlots[randomSlotIndex];
    }
    getEmptySlots() {
        let allSlotsPosition = [];
        for (let i = 1; i <= SLOTS; i++) {
            allSlotsPosition.push(i);
        }
        const occupiedPositions = this.holes.map(hole => hole.pos);
        return allSlotsPosition.filter(pos => occupiedPositions.indexOf(pos) === -1);
    }
    totalNuts() {
        let nuts = 0;
        this.buckets.forEach(function (bucket) {
            nuts += bucket.getNuts();
        });
        return nuts;
    }
    tryToAddHole() {
        const nutsPerHand = 3;
        if (this.nextHoleIsComing) {
            return;
        }
        // NO NUT
        if (this.totalNuts() === 0) {
            return;
        }
        const neededHoles = Math.floor(this.totalNuts() / nutsPerHand);
        // ALREADY ALL NEEDED HOLES
        if (this.getHoles().length >= neededHoles) {
            return;
        }
        this.nextHoleIsComing = true;
        this.itemLayer.game.time.events.add(this.randomTime(), this.addHole, this);
    }
}
exports.Terrier = Terrier;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ })
/******/ ]);