
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
    }

    private loadLevels()
    {
    }

    private loadGameImages()
    {
        this.load.spritesheet('background_terrier', 'assets/backgrounds/background_terrier.png', 1656, 2048);
        this.load.spritesheet('background_tree', 'assets/backgrounds/background_tree.png', 1656, 2048);
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


        this.load.spritesheet('bucket0', 'assets/nuts/bucket0.png', 150, 150);
        this.load.spritesheet('bucket1', 'assets/nuts/bucket1.png', 150, 150);
        this.load.spritesheet('bucket2', 'assets/nuts/bucket2.png', 150, 150);
        this.load.spritesheet('bucket3', 'assets/nuts/bucket3.png', 150, 150);
        this.load.spritesheet('bucket4', 'assets/nuts/bucket4.png', 150, 150);

        this.load.spritesheet('sky', 'assets/sprites/sky.png', 800, 600);
        this.load.spritesheet('background', 'assets/sprites/background.png', 800, 600);
        this.load.spritesheet('buildings', 'assets/sprites/buildings.png', 800, 600);
        this.load.spritesheet('InventoryPanel', 'assets/sprites/ui.png', 300, 300);
        this.load.spritesheet('Inventory', 'assets/sprites/inventory.png', 80, 40);
        this.load.spritesheet('LevelPanel', 'assets/sprites/level.png', 400, 300);
        this.load.spritesheet('citizen1', 'assets/sprites/citizen1.png', 32, 32);
        this.load.spritesheet('cop', 'assets/sprites/cop.png', 32, 32);
        this.load.spritesheet('cop-shotgun', 'assets/sprites/cop-shotgun.png', 32, 32);
        this.load.spritesheet('squirrel', 'assets/sprites/hero.png', 32, 32);
        this.load.spritesheet('nut', 'assets/nuts/nut1.png', 385, 375);
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
