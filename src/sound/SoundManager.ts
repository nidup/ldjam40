import Game = Phaser.Game;

export class SoundManager
{
    private game: Game;

    private musicInside;
    private musicOutside;
    private musicOther;


    constructor(game: Game) {
        this.game = game;
    }

    init()
    {
        this.musicInside = this.game.add.audio('music/inside');
        this.musicOutside = this.game.add.audio('music/outside');
        this.musicOther = this.game.add.audio('music/other');
    }

    playInside()
    {
        this.musicOutside.mute = true;
        this.musicInside.mute = false;

        if (!this.musicInside.isPlaying) {
            this.musicInside.play('', 0, 0.6, true);
        }
    }

    playOutside()
    {
        this.musicInside.mute = true;
        this.musicOutside.mute = false;

        if (!this.musicOutside.isPlaying) {
            this.musicOutside.play('', 0, 0.6, true);
        }
    }
}
