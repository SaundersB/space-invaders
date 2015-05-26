BasicGame.Game = function (game) 
{
};

BasicGame.Game.prototype = 
{
	create: function () 
	{
		this.firingTimer = 0;
		this.bulletTime = 0;
		this.score = 0;
		this.livingEnemies = [];
		this.laser = this.add.audio('laser');
		this.explosionaudio = this.add.audio('explosionaudio');
		this.physics.startSystem(Phaser.Physics.ARCADE);
		this.starfield = this.add.tileSprite(0, 0, 800, 600, 'starfield');
		this.bullets = this.add.group();
		this.bullets.enableBody = true;
		this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
		this.bullets.createMultiple(30, 'bullet');
		this.bullets.setAll('anchor.x', 0.5);
		this.bullets.setAll('anchor.y', 1);
		this.bullets.setAll('outOfBoundsKill', true);
		this.bullets.setAll('checkWorldBounds', true);
		this.enemyBullets = this.add.group();
		this.enemyBullets.createMultiple(30, 'enemyBullet');
		this.enemyBullets.enableBody = true;
		this.enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
		this.enemyBullets.setAll('anchor.x', 0.5);
		this.enemyBullets.setAll('anchor.y', 1);
		this.enemyBullets.setAll('outOfBoundsKill', true);
		this.enemyBullets.setAll('checkWorldBounds', true);
		this.player = this.add.sprite(400, 500, 'ship');
		this.player.anchor.setTo(0.5, 0.5);
		this.physics.enable(this.player, Phaser.Physics.ARCADE);
		this.aliens = this.add.group();
		this.aliens.enableBody = true;
		this.aliens.physicsBodyType = Phaser.Physics.ARCADE;
		this.createAliens();
		this.scoreString = 'Score : ';
		this.scoreText = this.add.text(10, 10, this.scoreString + this.score, { font: '34px Arial', fill: '#fff' });
		this.lives = this.add.group();
		this.add.text(this.world.width - 100, 10, 'Lives : ', { font: '34px Arial', fill: '#fff' });
		this.stateText = this.add.text(this.world.centerX,this.world.centerY,' ', { font: '84px Arial', fill: '#fff' });
		this.stateText.anchor.setTo(0.5, 0.5);
		this.stateText.visible = false;

		for (var i = 0; i < 3; i++) 
		{
			var ship = this.lives.create(this.world.width - 100 + (30 * i), 60, 'ship');
			ship.anchor.setTo(0.5, 0.5);
			ship.angle = 90;
			ship.alpha = 0.4;
		}
		this.explosions = this.add.group();
		this.explosions.createMultiple(30, 'kaboom');
		this.explosions.forEach(this.setupInvader, this);
		this.cursors = this.input.keyboard.createCursorKeys();
		this.fireButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		this.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
		var fullscreen = this.add.button(this.game.width-8, this.game.height-8,'fullscreen',BasicGame.toggleFullscreen,this,'over', 'up', 'down');
		fullscreen.pivot.x = fullscreen.width;
		fullscreen.pivot.y = fullscreen.height;

		this.leftButton = this.add.button(this.world.centerX - 200, this.world.centerY + 290,'left', null, this);
		this.leftButton.pivot.x = this.leftButton.width;
		this.leftButton.pivot.y = this.leftButton.height;

		this.rightButton = this.add.button(this.world.centerX + 200, this.world.centerY + 290,'right', null, this);
		this.rightButton.pivot.x = this.rightButton.width;
		this.rightButton.pivot.y = this.rightButton.height;

		this.decision = false;
		this.leftButton.events.onInputDown.add(function(){this.decision=true;});
		this.rightButton.events.onInputDown.add(function(){this.decision=true;});

		this.leftButton.inputEnabled = true;
		this.rightButton.inputEnabled = true;
	},

	update: function () 
	{
	this.starfield.tilePosition.y += 2;

		if(this.player.alive)
		{
			this.player.body.velocity.setTo(0, 0);
		  
			if (this.cursors.left.isDown || this.decision)
			{
				this.player.body.velocity.x = -200;
			}
			else if (this.cursors.right.isDown)
			{
				this.player.body.velocity.x = 200;
			}
			if (this.fireButton.isDown)
			{
				this.fireBullet();
			}
			if (this.time.now > this.firingTimer)
			{
				this.enemyFires();
			}
			
			this.physics.arcade.overlap(this.bullets, this.aliens, this.collisionHandler, null, this);
			this.physics.arcade.overlap(this.enemyBullets, this.player, this.enemyHitsPlayer, null, this);
			this.physics.arcade.overlap(this.player, this.aliens, this.playerCollision, null, this);
		}
	},

	restart: function () 
	{
		this.lives.callAll('revive');
		this.aliens.removeAll();
		this.createAliens();
		this.player.revive();
		this.stateText.visible = false;
	},

	playerCollision: function(player,aliens)
	{
		this.player.kill();
		this.live = this.lives.getFirstAlive();

		if (this.live)
		{ 
			this.live.kill();
		}

		aliens.reset();
		this.createAliens();
		var explosion = this.explosions.getFirstExists(false);
		explosion.reset(player.body.x, player.body.y);
		explosion.play('kaboom', 30, false, true);
		player.revive();

		if (this.lives.countLiving() < 1)
		{
			player.kill();
			this.enemyBullets.callAll('kill'); //
			this.stateText.text=" GAME OVER \n Click to restart";
			this.stateText.visible = true;
			this.input.onTap.addOnce(this.restart,this);
		}
	},

	enemyFires: function() 
	{
		this.enemyBullet = this.enemyBullets.getFirstExists(false);
		this.livingEnemies.length = 0;
		this.aliens.forEachAlive(function(alien){
			this.livingEnemies.push(alien);
		},this);
		this.physics.enable(this.enemyBullet, Phaser.Physics.ARCADE);

		if (this.enemyBullet && this.livingEnemies.length > 0)
		{
			var random = this.rnd.integerInRange(0,this.livingEnemies.length-1);
			var shooter = this.livingEnemies[random];
			this.enemyBullet.reset(shooter.body.x, shooter.body.y);
			this.physics.arcade.moveToObject(this.enemyBullet,this.player,120);
			this.firingTimer = this.time.now + 2000;
		}
	},


	collisionHandler: function(bullet, alien) 
	{
		bullet.kill();
		alien.kill();
		this.score += 20;
		this.scoreText.text = this.scoreString + this.score;
		this.explosion = this.explosions.getFirstExists(false);
		this.explosion.reset(alien.body.x, alien.body.y);
		this.explosion.play('kaboom', 30, false, true);
		this.explosionaudio.play();

		if (this.aliens.countLiving() == 0)
		{
			this.score += 1000;
			this.scoreText.text = this.scoreString + this.score;
			this.stateText.text = " You Won, \n Click to restart";
			this.stateText.visible = true;
			this.enemyBullets.callAll('kill');
			this.input.onTap.addOnce(this.restart,this);
		}
	},

	fireBullet: function() 
	{
		if (this.time.now > this.bulletTime)
		{
			this.bullet = this.bullets.getFirstExists(false);

			if (this.bullet)
			{
				this.laser.play();
				this.bullet.reset(this.player.x, this.player.y + 8);
				this.bullet.body.velocity.y = -400;
				this.bulletTime = this.time.now + 200;
			}
		}
	},

	restart: function() 
	{
		this.lives.callAll('revive');
		this.aliens.removeAll();
		this.createAliens();
		this.player.revive();
		this.stateText.visible = false;
	},

	gofull: function() 
	{
		if (this.scale.isFullScreen)
		{
			this.scale.stopFullScreen();
		}

		else
		{
			this.scale.startFullScreen(false);
		}
	},


	resetBullet: function(bullet) 
	{	
		bullet.kill();
	},

	setupInvader: function (invader) 
	{
		invader.anchor.x = 0.5;
		invader.anchor.y = 0.5;
		invader.animations.add('kaboom');
	},

	descend: function()
	{
		this.aliens.y += 10;
	},

	createAliens: function () 
	{
		for (var y = 0; y < 4; y++)
		{
			for (var x = 0; x < 10; x++)
			{
				var alien = this.aliens.create(x * 48, y * 50, 'invader');
				alien.anchor.setTo(0.5, 0.5);
				alien.animations.add('fly', [ 0, 1, 2, 3 ], 20, true);
				alien.play('fly');
				alien.body.moves = false;
			}
		}
		this.aliens.x = 100;
		this.aliens.y = 50;
		this.tween = this.add.tween(this.aliens).to( { x: 200 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);
		this.tween.onLoop.add(this.descend, this);
	},

	enemyHitsPlayer: function(player,bullet)
	{
		bullet.kill();
		this.live = this.lives.getFirstAlive();

		if (this.live)
		{
			this.live.kill();
		}
		var explosion = this.explosions.getFirstExists(false);
		explosion.reset(player.body.x, player.body.y);
		explosion.play('kaboom', 30, false, true);
		this.explosionaudio.play();

		if (this.lives.countLiving() < 1)
		{
			player.kill();
			this.enemyBullets.callAll('kill');
			this.stateText.text=" GAME OVER \n Click to restart";
			this.stateText.visible = true;
			this.input.onTap.addOnce(this.restart,this);
		}
	},

	quitGame: function (pointer) 
	{
		this.state.start('MainMenu');
	},

};
