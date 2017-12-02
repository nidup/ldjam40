const horizontalPosition = 1500;
const MAX_LIFE = 100;

const HAND_TYPES = ['bear', 'human', 'racoon'];

export class Hole extends Phaser.Sprite
{
    public pos: number;
    private xPosition: number;
    private life: number;
    private timer: any;
    private pic: Phaser.Image;
    private handType: string;
    private itemLayer: Phaser.Group;
    private handState: number;

    constructor(itemLayer: Phaser.Group, xPosition: number, pos: number)
    {
        let key = 'hole1';
        super(itemLayer.game, xPosition, horizontalPosition, key);

        this.scale.set(0.4);
        this.xPosition = xPosition;
        this.pos = pos;
        this.life = 1;
        this.itemLayer = itemLayer;

        this.timer = itemLayer.game.time.events.loop(0.2 * Phaser.Timer.SECOND, this.gainLife, this);

        itemLayer.add(this);

        itemLayer.game.physics.enable(this, Phaser.Physics.ARCADE);
        this.inputEnabled = true;
        this.body.setSize(250, 500, 200);
    }

    gainLife() {
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
        } else if (this.life <= 20) {
            this.loadTexture('hole2', 0);
            if (this.hasHand()) {
                this.removeHand();
            }
        } else if (this.life <= 30) {
            this.loadTexture('hole3', 0);
            if (this.hasHand()) {
                this.removeHand();
            }
        } else {
            this.loadTexture('hole4', 0);
            if (!this.hasHand()) {
                this.addHand();
            }
        }

        if (this.hasHand()) {
            this.pic.updateCrop();
            if (Math.random() > 0.97) {
                this.handState = (this.handState + 1) % 2;
                this.pic.loadTexture(this.handType + (this.handState + 1));
            }
        }
    }

    hit() {
        this.life = this.life - 10;
        if (this.life < 0) {
            this.destroy();
        }
    }

    private hasHand(): boolean
    {
        return this.pic !== null;
    }

    private removeHand()
    {
        if (this.pic) {
            this.pic.destroy();
        }
        this.pic = null;
    }

    private addHand() {

        const xPosition = this.xPosition;
        this.handType = HAND_TYPES[Math.floor(Math.random() * HAND_TYPES.length)];
        this.handState = 0;

        let pic = this.itemLayer.game.add.image(xPosition + 70, horizontalPosition + 60, this.handType + (this.handState + 1));
        let cropRect = new Phaser.Rectangle(0, pic.height, pic.width, pic.height);
        let tween = this.itemLayer.game.add.tween(cropRect).to({ y: 0 }, 3000, Phaser.Easing.Default, false, 0, 1000, true);
        pic.crop(cropRect);
        tween.start();
        pic.scale.set(0.3);
        this.pic = pic;
    }
}
