
import {Config} from "../game/Config";
import {Hero} from "../world/Hero";
import {Squirrel} from "../world/Squirrel";
import {Terrier} from "../world/Terrier";
import Timer = Phaser.Timer;
import TimerEvent = Phaser.TimerEvent;

export class Inventory extends Phaser.Sprite
{
    private terrier: Terrier;
    private squirrel: Squirrel;
    private nutsText: Phaser.Text;
    private timerText: Phaser.Text;
    private timer: Timer;
    private timerEvent: TimerEvent;

    constructor(group: Phaser.Group, x: number, y: number, key: string, squirrel: Squirrel, terrier: Terrier, timer: Timer, timerEvent: TimerEvent)
    {
        super(group.game, x, y, key, 0);
        this.squirrel = squirrel;
        this.terrier = terrier;
        this.timer = timer;
        this.timerEvent = timerEvent;
        group.add(this);

        this.scale.setTo(0.45, 0.5);
        this.fixedToCamera = true;

        const fontStyle = {
            font: "40px 'Jaldi'",
            fill: "#ffffff"
        }
        const marginLeftAmountToImage = 0;
        const marginTopAmountToImage = 0;

        const timerX = 40;
        const timerY = 25;

        this.timerText = this.game.add.text(timerX - marginLeftAmountToImage, timerY + marginTopAmountToImage, '0', fontStyle, group);
        this.timerText.fixedToCamera = true;
        this.timerText.align = 'right';

        const nutX = timerX + 50;
        const nutY = timerY + 50;

        this.nutsText = this.game.add.text(nutX - marginLeftAmountToImage, nutY + marginTopAmountToImage, '0', fontStyle, group);
        this.nutsText.fixedToCamera = true;
        this.nutsText.align = 'right';


    }

    public update()
    {
        this.nutsText.setText(this.alignText(this.terrier.totalNuts()));
        this.timerText.setText(""+this.formatTime(Math.round((this.timerEvent.delay - this.timer.ms) / 1000)));
    }

    private alignText(amount: number): string
    {
        let text = "" + amount;
        if (amount < 10) {
            text = " " + amount;
        }

        text = "x " + text;

        return text;
    }


    private formatTime(totalSeconds)
    {
        // Convert seconds (s) to a nicely formatted and padded time string
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = (totalSeconds - minutes * 60)

        let minutesStr = "0" +minutes;
        let secondsStr = "0" +seconds;

        return minutesStr.substr(-2) + ":" + secondsStr.substr(-2);
    }
}
