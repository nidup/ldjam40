
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
    }

    private loadLevels()
    {
    }

    private loadGameImages()
    {
        this.load.spritesheet('background_terrier', 'assets/backgrounds/background_terrier.png', 1024, 2048);
        this.load.spritesheet('background_tree', 'assets/backgrounds/background_tree.png', 1024, 2048);
        this.load.spritesheet('hole1', 'assets/holes/hole1.png', 519, 694);
        this.load.spritesheet('hole2', 'assets/holes/hole2.png', 519, 694);
        this.load.spritesheet('hole3', 'assets/holes/hole3.png', 519, 694);
        this.load.spritesheet('hole4', 'assets/holes/hole4.png', 519, 694);

        this.load.spritesheet('bucket0', 'assets/nuts/bucket4.png', 150, 150);
        this.load.spritesheet('bucket1', 'assets/nuts/bucket1.png', 150, 150);
        this.load.spritesheet('bucket2', 'assets/nuts/bucket2.png', 150, 150);
        this.load.spritesheet('bucket3', 'assets/nuts/bucket3.png', 150, 150);
        this.load.spritesheet('bucket4', 'assets/nuts/bucket4.png', 150, 150);

        this.load.spritesheet('sky', 'assets/sprites/sky.png', 800, 600);
        this.load.spritesheet('background', 'assets/sprites/background.png', 800, 600);
        this.load.spritesheet('buildings', 'assets/sprites/buildings.png', 800, 600);
        this.load.spritesheet('InventoryPanel', 'assets/sprites/ui.png', 300, 300);
        this.load.spritesheet('LevelPanel', 'assets/sprites/level.png', 400, 300);
        this.load.spritesheet('citizen1', 'assets/sprites/citizen1.png', 32, 32);
        this.load.spritesheet('cop', 'assets/sprites/cop.png', 32, 32);
        this.load.spritesheet('cop-shotgun', 'assets/sprites/cop-shotgun.png', 32, 32);
        this.load.spritesheet('squirrel', 'assets/sprites/hero.png', 32, 32);
        this.load.spritesheet('nut', 'assets/nuts/mini-nut.png', 50, 56);
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
