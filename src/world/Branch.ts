
import {Nut} from "./Nut";

export class Branch
{
    private group: Phaser.Group;
    private attachedNuts: Nut[];

    constructor(group: Phaser.Group)
    {
        this.group = group;
        this.attachedNuts = [];
        this.attachedNuts.push(
            new Nut(group, 170, 300),
            new Nut(group, 290, 300)
        )
    }

    public nuts(): Nut[]
    {
        return this.attachedNuts;
    }
}
