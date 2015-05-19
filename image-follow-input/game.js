var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, render: render });
var velocity = 800;
var zero = 0;
var debug = 32;
var sprite;

function preload() 
{
	game.load.image('phaser', 'assets/sprites/orb.png');
}

function listener(m,e)
{
	var tween = game.add.tween(sprite);
	tween.to({ x: e.clientX, y: e.clientY }, 1000);
	tween.start();
}

function create() 
{
	game.physics.startSystem(Phaser.Physics.ARCADE);
	sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'phaser');
	sprite.anchor.set(0.5);
	game.physics.arcade.enable(sprite);
	this.game.input.maxPointers = 1;
	this.input.onDown.add(listener,this);
}

function render () 
{
	game.debug.inputInfo(debug,debug);
}