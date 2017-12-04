

// TODO RENAME TO GAME OVER
export default class Menu extends Phaser.State {
    private score: number;

    public init (data = { score: 0 })
    {
        this.score = data.score;
    }

    public create ()
    {
        this.game.stage.backgroundColor = '#000000';

        let image = this.game.add.image(150, 0, 'gameover');
        image.scale.setTo(0.75, 0.75)

        this.game.add.text(520, 272, 'x ' + this.score, {
            font: "100px 'Jaldi'",
            fill: "#ffffff"
        });

        this.game.time.events.add(Phaser.Timer.SECOND * 2, this.bindSpace.bind(this));
    }

    public startGame ()
    {
        this.game.state.start('Play', true, false);
    }

    public bindSpace()
    {
        let spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.startGame, this);
    }
}
