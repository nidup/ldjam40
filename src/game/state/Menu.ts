
export default class Menu extends Phaser.State {
    private startText : Phaser.Text;
    private score: number;

    public init (data = { score: 0 })
    {
        this.score = data.score;
    }

    public create ()
    {
        this.game.stage.backgroundColor = '#000000';

        let spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.startGame, this);

        this.game.add.text(300, 150, 'Score: ' + this.score, {
            font: "50px Arial",
            fill: "#ffffff",
            align: "center"
        });

        this.startText = this.game.add.text(300, 450, 'Press space to start', {
            font: "50px Arial",
            fill: "#ffffff",
            align: "center"
        });
    }

    public startGame ()
    {
        this.game.state.start('Play', true, false);
        // this.game.state.start('Play');
    }

    public shutdown ()
    {
        this.startText.destroy();
    }
}
