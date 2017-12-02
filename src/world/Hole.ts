const MAX_STATE = 4;
const horizontalPosition = 100;

export class Hole extends Phaser.Sprite
{
    private vertical: number;
    private state: number;

    constructor(itemLayer: Phaser.Group, vertical: number)
    {
        let key = 'hole1';
        super(itemLayer.game, vertical, horizontalPosition, key);

        this.scale.set(0.4);
        this.vertical = vertical;
        this.state = 1;

        itemLayer.game.time.events.loop(2 * Phaser.Timer.SECOND, this.updateLayer, this);

        itemLayer.add(this);
    }

    updateLayer() {
        if (this.state >= MAX_STATE) {
            return;
        }

        this.state++;
        let key = 'hole' + this.state;

        this.loadTexture(key, 0);
    }
}
