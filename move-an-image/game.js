var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });
var xPos = 256;
var yPos = 256;
var speed = 500;
var anchor = 0.5;
var textSize = 16;
var textPlacement = 250;

function preload() 
{
	game.load.image('bulb', 'assets/pics/pong.png');
}

function create() 
{
	var image = game.add.sprite(xPos, yPos, 'bulb');	
	game.physics.setBoundsToWorld();
	image.anchor.set(anchor,anchor);
	image.inputEnabled = true;
	image.events.onInputDown.add(listener, this);
	this.game.input.maxPointers = 1;
	game.physics.enable(image, Phaser.Physics.ARCADE);
	image.body.velocity.x = speed;
	image.enableBody = true;
	image.checkWorldBounds = true;
	image.events.onOutOfBounds.add(resetimage, this);
	text = game.add.text(textPlacement, textSize, '', { fill: '#ffffff' });
}

function listener () 
{
	var x = game.input.x;
	var y = game.input.y;
	text.text = "(" + x + "," + y + ")";
}

function resetimage(image) 
{
	image.reset(xPos,yPos);
}
