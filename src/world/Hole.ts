const horizontalPosition = 100;
const MAX_LIFE = 100;

export class Hole extends Phaser.Sprite
{
    private vertical: number;
    private life: number;
    private timer: any;

    constructor(itemLayer: Phaser.Group, vertical: number)
    {
        let key = 'hole1';
        super(itemLayer.game, vertical, horizontalPosition, key);

        this.scale.set(0.4);
        this.vertical = vertical;
        this.life = 1;

        this.timer = itemLayer.game.time.events.loop(0.2 * Phaser.Timer.SECOND, this.gainLife, this);

        itemLayer.add(this);
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
        } else if (this.life <= 20) {
            this.loadTexture('hole2', 0);
        } else if (this.life <= 30) {
            this.loadTexture('hole3', 0);
        } else {
            this.loadTexture('hole4', 0);
        }
    }

    hit() {
        this.life--;

        if (0 === this.life) {
            this.destroy();
        }
    }
}
