var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });

function preload() 
{
	game.load.image('einstein', 'assets/pics/background.png');
}

function create() 
{
	game.add.sprite(0, 0, 'einstein');
}