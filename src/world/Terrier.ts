import {Hole} from "./Hole";

export class Terrier
{
    private nuts: number = 0;
    private holes: Hole[];

    constructor(itemLayer: Phaser.Group)
    {
        this.holes = [];

        this.holes.push(
            new Hole(itemLayer, 100)
        )
    }
}
