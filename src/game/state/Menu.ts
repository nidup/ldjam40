
export default class Menu extends Phaser.State {
    private startText : Phaser.Text;

    public create ()
    {
        this.game.stage.backgroundColor = '#000000';

        let spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.startGame, this);

        this.startText = this.game.add.text(300, 450,'Press space to start', {
            font: "50px Arial",
            fill: "#ffffff",
            align: "center"
        });
    }

    public startGame ()
    {
        this.game.state.start('Play');
    }

    public shutdown ()
    {
        this.startText.destroy();
    }
}
