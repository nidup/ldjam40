
import {Nut} from "./Nut";
import {Squirrel} from "./Squirrel";

export class Branch
{
    private group: Phaser.Group;
    private nuts: Nut[];

    constructor(group: Phaser.Group, squirrel: Squirrel)
    {
        this.group = group;
        this.nuts = [];
        this.nuts.push(
            new Nut(group, 170, 400, squirrel),
            new Nut(group, 290, 400, squirrel)
        )
    }
}
