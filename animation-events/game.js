var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });

function preload() 
{
	game.load.image('lazur', 'assets/pics/thorn_lazur.png');
	game.load.spritesheet('mummy', 'assets/sprites/metalslug_mummy37x45.png', 37, 45, 18);
}
var back;
var mummy;
var anim;
var toggle = false;

function create() 
{
	back = game.add.image(0, -400, 'lazur');
	back.scale.set(2);
	back.smoothed = false;
	mummy = game.add.sprite(200, 360, 'mummy');
	mummy.scale.set(4);
	mummy.smoothed = false;
	anim = mummy.animations.add('walk');
	mummy.anchor.set(0.5);
	anim.onLoop.add(animationLooped, this);
	anim.play(10, true);
}

function animationLooped(sprite, animation) 
{
	if (animation.loopCount === 3 && toggle === false)
	{
		animation.loopCount = 0;
		mummy.scale.x *= -1;
		toggle = true;
	}
	else if (animation.loopCount === 3 && toggle === true)
	{
		mummy.scale.x *= -1;
		animation.loopCount = 0;
		toggle = false;
	}
}

function update() 
{
	if (toggle === false)
	{
		back.x -= 1;
	}
	else
	{	 	
		back.x += 1;
	}
}
