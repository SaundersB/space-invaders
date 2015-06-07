var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });

function preload() 
{
	game.load.image('bulb', 'assets/pics/bulb.png');
}

function create() 
{
	var image = game.add.sprite(200, 300, 'bulb');
	var image2 = game.add.sprite(400, 135, 'bulb');
	image.anchor.set(0.5);
	image2.anchor.set(0);
	image.inputEnabled = true;
	image2.inputEnabled = true;
	image.events.onInputDown.add(listener, this);
	image2.events.onInputDown.add(listener, this);   
	this.game.input.maxPointers = 1;
	text = game.add.text(250, 16, '', { fill: '#ffffff' });
}

function listener () 
{
	var x = game.input.x;
	var y = game.input.y;
	text.text = "(" + x + "," + y + ")";
}	

  