var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, render: render });
var velocity = 800;
var zero = 0;
var debug = 32;
var sprite;
var OneThousand = 1000;
var ThreeThousand = 3000;

function preload() 
{
	game.load.image('beetlejuice', 'assets/sprites/beetlejuice.jpg');
}

function listener(e)
{
	tween = game.add.tween(sprite);
	tween.to({ x: e.clientX, y: e.clientY }, this.game.rnd.integerInRange(OneThousand, ThreeThousand));
	tween.start();
}

function create() 
{
	game.physics.startSystem(Phaser.Physics.ARCADE);
	sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'beetlejuice');
	sprite.anchor.set(0.5);
	game.physics.arcade.enable(sprite);
	this.game.input.maxPointers = 1;
	this.input.onDown.add(listener,this);
	var Tween = game.add.tween(sprite).to({x:game.world.randomX,y:game.world.randomY},this.game.rnd.integerInRange(OneThousand, ThreeThousand));
	Tween.onComplete.add(
	function()
	{
		sprite.x = game.world.randomX; 
		sprite.y = game.world.randomY;
		Tween.start();
	});
	Tween.start();
}

function render () 
{
	game.debug.inputInfo(debug,debug);
}

