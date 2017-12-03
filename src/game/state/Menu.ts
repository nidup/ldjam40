
export default class Menu extends Phaser.State {
    private score: number;

    public init (data = { score: 0 })
    {
        this.score = data.score;
        this.score = 13;
    }

    public create ()
    {
        this.game.stage.backgroundColor = '#000000';

        let spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.startGame, this);

        let image = this.game.add.image(150, 0, 'gameover');
        image.scale.setTo(0.75, 0.75)

        this.game.add.text(520, 272, 'x ' + this.score, {
            font: "100px 'Jaldi'",
            fill: "#ffffff"
        });
    }

    public startGame ()
    {
        this.game.state.start('Play', true, false);
    }
}
