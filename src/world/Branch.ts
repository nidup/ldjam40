
import {Nut} from "./Nut";
import {Nuts} from "./Nuts";

export class Branch
{
    private group: Phaser.Group;
    private nuts: Nuts;

    constructor(group: Phaser.Group)
    {
        this.group = group;
        this.nuts = new Nuts();
        this.nuts.add(new Nut(group, 10, 500));
    }
}
