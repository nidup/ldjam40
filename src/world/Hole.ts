import { Terrier } from "./Terrier";
import { Bucket } from "./Bucket";

const horizontalPosition = 1600;
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
    private terrier: Terrier;
    private filled: boolean;
    private nuts: number = 0;

    constructor(itemLayer: Phaser.Group, xPosition: number, pos: number, terrier: Terrier)
    {
        super(itemLayer.game, xPosition, horizontalPosition, 'hole1');

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
        this.body.setSize(250, 500, 200);

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
            this.fill();
            this.terrier.cleanFilledHoles();
        }

        if (this.nuts > 0) {
            this.nuts--;

            return true;
        }

        return false;
    }

    isFilled(): boolean
    {
        return this.filled;
    }

    private fill()
    {
        this.filled = true;
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

    private grab() {
        const bucket = this.terrier.getBuckets().find((bucket: Bucket) => bucket.pos === this.pos);

        if (bucket && 1 > this.nuts && bucket.pick()) {
            console.log(`grab nuts for hole ${this.pos}`);
            this.nuts++;
            setTimeout(() => {
                this.nuts--;
                console.log(`Nut gone ${this.pos}`);
            }, 3000);
        }
    }

    private addHand() {

        const xPosition = this.xPosition;
        this.handType = HAND_TYPES[Math.floor(Math.random() * HAND_TYPES.length)];
        this.handState = 0;

        let pic = this.itemLayer.game.add.image(xPosition, horizontalPosition + 70, this.handType + (this.handState + 1));
        let cropRect = new Phaser.Rectangle(0, pic.height, pic.width, pic.height);
        let tween = this.itemLayer.game.add.tween(cropRect).to({ y: 0 }, 3000, Phaser.Easing.Default, false, 0, 1000, true);

        tween.onRepeat.add(() => {
            //console.log(`hand down ${this.pos}`);
            this.grab();
        });

        pic.crop(cropRect);
        tween.start();
        pic.scale.set(0.25);
        this.pic = pic;
    }
}
