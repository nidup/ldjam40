import {Hole} from "./Hole";

export class Terrier
{
    private nuts: number = 0;
    private holes: Hole[];
    private itemLayer: Phaser.Group;

    constructor(itemLayer: Phaser.Group)
    {
        this.holes = [];
        this.itemLayer = itemLayer;

        this.itemLayer.game.time.events.add(this.randomTime(), this.addHole, this);
    }

    addHole()
    {
        this.holes.push(
            new Hole(this.itemLayer, this.randomPlace())
        );

        this.itemLayer.game.time.events.add(this.randomTime(), this.addHole, this);
    }

    randomTime(): number
    {
        return Phaser.Timer.SECOND * (5 + Math.random() * 5);
    }

    randomPlace(): number
    {
        return 100 + Math.random() * 800
    }
}
