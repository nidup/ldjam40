
export default class Preload extends Phaser.State {

    public preload ()
    {
        this.loadAudio();
        this.loadLevels();
        this.loadGameImages();
        this.loadFonts();
    }

    public create ()
    {
        this.game.state.start('Play'); // TODO: shortcuts "Menu" state :)
    }

    private loadAudio()
    {
        this.load.audio('music/other', 'assets/ost/Other.mp3');
        this.load.audio('music/outside', 'assets/ost/Outside1.mp3');
        this.load.audio('music/inside', 'assets/ost/Inside2.mp3');

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

    private loadLevels()
    {
    }

    private loadGameImages()
    {
        this.load.spritesheet('background_terrier', 'assets/backgrounds/background_terrier.png', 1656, 2048);
        this.load.spritesheet('background_tree', 'assets/backgrounds/background_tree.png', 1656, 2048);
        this.load.spritesheet('tree_door', 'assets/backgrounds/treeDoor.png', 1656, 637);
        this.load.spritesheet('lift', 'assets/lift/lift.png', 1037, 5906);
        this.load.spritesheet('hole1', 'assets/holes/hole1.png', 519, 694);
        this.load.spritesheet('hole2', 'assets/holes/hole2.png', 519, 694);
        this.load.spritesheet('hole3', 'assets/holes/hole3.png', 519, 694);
        this.load.spritesheet('hole4', 'assets/holes/hole4.png', 519, 694);

        this.load.spritesheet('human1', 'assets/hands/human1.png', 423, 598);
        this.load.spritesheet('human2', 'assets/hands/human2.png', 423, 598);
        this.load.spritesheet('bear1', 'assets/hands/bear1.png', 423, 598);
        this.load.spritesheet('bear2', 'assets/hands/bear2.png', 423, 598);
        this.load.spritesheet('racoon1', 'assets/hands/racoon1.png', 423, 598);
        this.load.spritesheet('racoon2', 'assets/hands/racoon2.png', 423, 598);

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

        this.load.spritesheet('squirrel', 'assets/squirrel/squirrel.png', 1866, 1866);
        // before 32x32 x ratio 8 = 256x256
        // after 1866x1866 / 7.28 ~= 256x256 | 1866 x 0.14 = 261
        // http://www.imagemagick.org/Usage/montage/ to merge images
        // cd assets/squirrels
        // montage squirrel1.png squirrel2.png squirrel3.png squirrel4.png squirrel5.png squirrel6.png squirrel7.png -geometry 1866x1866 -background none squirrel.png

        this.load.spritesheet('sky', 'assets/sprites/sky.png', 800, 600);
        this.load.spritesheet('background', 'assets/sprites/background.png', 800, 600);
        this.load.spritesheet('buildings', 'assets/sprites/buildings.png', 800, 600);
        this.load.spritesheet('InventoryPanel', 'assets/sprites/ui.png', 300, 300);
        this.load.spritesheet('Inventory', 'assets/sprites/inventory.png', 80, 40);
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

    private loadFonts()
    {
        this.load.bitmapFont('carrier-command', 'assets/fonts/carrier_command.png', 'assets/fonts/carrier_command.xml');
    }
}
