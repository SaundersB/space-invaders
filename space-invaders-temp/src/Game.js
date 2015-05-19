
BasicGame.Game = function (game) 
{
  this.enemyBullet
  this.player;
  this.aliens;
  this.alien;
  this.bullets;
  this.starfield;
  this.firingTimer;
  this.bulletTime;
  this.enemyBullets;
  this.livingEnemies;
  this.score;
  this.explosions;
  this.lives;
  this.live;
  this.scoreText;
  this.scoreString;
  this.stateText;
};

  


BasicGame.Game.prototype = 
{
  create: function () 
  {
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
    
    this.enemyBullet = this.add.group();
    this.enemyBullet.createMultiple(30, 'enemyBullet');
    this.enemyBullet.enableBody = true;
    this.enemyBullet.physicsBodyType = Phaser.Physics.ARCADE;
    this.enemyBullet.setAll('anchor.x', 0.5);
    this.enemyBullet.setAll('anchor.y', 1);
    this.enemyBullet.setAll('outOfBoundsKill', true);
    this.enemyBullet.setAll('checkWorldBounds', true);
    this.enemyBullet = this.enemyBullet.getFirstExists(false);

  
    this.player = this.add.sprite(400, 500, 'ship');
    this.player.anchor.setTo(0.5, 0.5);

    this.physics.enable(this.player, Phaser.Physics.ARCADE);

    this.aliens = this.add.group();
    this.aliens.enableBody = true;
    this.aliens.physicsBodyType = Phaser.Physics.ARCADE;

    var tween = this.add.tween(this.aliens).to( { x: 200 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);

    for (var y = 0; y < 4; y++)
        {

          for (var x = 0; x < 10; x++)
          {
            this.alien = this.aliens.create(x * 48, y * 50, 'invader');
            this.alien.anchor.setTo(0.5, 0.5);
            this.alien.animations.add('fly', [ 0, 1, 2, 3 ], 20, true);
            this.alien.play('fly');
            this.alien.body.moves = false;
          }
        }

    this.aliens.x = 100;
    this.aliens.y = 50;


    //createAliens();
    tween.onLoop.add(descend, this);
    

    this.scoreString = '';
    this.firingTimer = 0;
    this.bulletTime = 0;
    this.livingEnemies = [];
    this.score = 0;

    scoreString = 'Score : ';
    this.scoreText = this.add.text(10, 10, scoreString + this.score, { font: '34px Arial', fill: '#fff' });

    this.lives = this.add.group();
    this.add.text(this.world.width - 100, 10, 'Lives : ', { font: '34px Arial', fill: '#fff' });
    stateText = this.add.text(this.world.centerX,this.world.centerY,' ', { font: '84px Arial', fill: '#fff' });
    stateText.anchor.setTo(0.5, 0.5);
    stateText.visible = false;

    for (var i = 0; i < 3; i++) 
    {
        var ship = this.lives.create(this.world.width - 100 + (30 * i), 60, 'ship');
        ship.anchor.setTo(0.5, 0.5);
        ship.angle = 90;
        ship.alpha = 0.4;
    }

    this.explosions = this.add.group();
    this.explosions.createMultiple(30, 'kaboom');
    this.explosions.forEach(setupInvader, this);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.fireButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;

    function createAliens () 
    {
    for (var y = 0; y < 4; y++)
    {

      for (var x = 0; x < 10; x++)
      {
        this.alien = aliens.create(x * 48, y * 50, 'invader');
        this.alien.anchor.setTo(0.5, 0.5);
        this.alien.animations.add('fly', [ 0, 1, 2, 3 ], 20, true);
        this.alien.play('fly');
        this.alien.body.moves = false;
      }
    }
    aliens.x = 100;
    aliens.y = 50;
    }

    function descend() 
    {
      aliens.y += 10;
    }

    function setupInvader (invader) 
    {
    invader.anchor.x = 0.5;
    invader.anchor.y = 0.5;
    invader.animations.add('kaboom');
    }

    function resetBullet (bullet) 
    {
      this.bullet.kill();
    }

    function restart () 
    {
      this.lives.callAll('revive');
      this.aliens.removeAll();
      createAliens();
      this.player.revive();
      this.stateText.visible = false;
    }

    function gofull() 
    {

        if (this.scale.isFullScreen)
        {
            this.scale.stopFullScreen();
        }
        else
        {
            this.scale.startFullScreen(false);
        }
    }


    var fullscreen = this.add.button(this.game.width-8, this.game.height-8,'fullscreen',BasicGame.toggleFullscreen,this,'over', 'up', 'down');
    fullscreen.pivot.x = fullscreen.width;
    fullscreen.pivot.y = fullscreen.height;


   },

  update: function () 
  {
    firingTimer = this.firingTimer;
    time = this.time;
    bulletTime = this.bulletTime;
    player = this.player;
    livingEnemies = this.livingEnemies;
    aliens = this.aliens;
    bullets = this.bullets;
    //enemyBullets = this.enemyBullets;
    //enemyBullet = this.enemyBullet;
    this.starfield.tilePosition.y += 2;


    if(player.alive)
    {
      player.body.velocity.setTo(0, 0);
      
      if (this.cursors.left.isDown)
      {
        player.body.velocity.x = -200;
      }

      else if (this.cursors.right.isDown)
      {
        player.body.velocity.x = 200;
      }
      if (this.fireButton.isDown)
      {
        fireBullet();
      }
      if (time.now > firingTimer)
      {
        enemyFires();
      }
      console.log(this.bullets);
      this.physics.arcade.overlap(this.bullets, aliens, collisionHandler, null, this);
      this.physics.arcade.overlap(this.enemyBullets, this.player, enemyHitsPlayer, null, this);
      this.physics.arcade.overlap(this.player, this.aliens, playerCollision, null, this);
    }

    function fireBullet () 
        {
          if (time.now > this.bulletTime)
          {
            this.bullet = this.bullets.getFirstExists(false);
            if (this.bullet)
            {
              this.bullet.reset(player.x, player.y + 8);
              this.bullet.body.velocity.y = -400;
              this.bulletTime = time.now + 200;
            }
          }
        }

    function collisionHandler (bullet, alien) 
    {
      score = this.score;
      explosions = this.explosions;
      bullet.kill();
      alien.kill();
      this.score += 20;
      this.scoreText.text = scoreString + this.score;
      this.explosion = explosions.getFirstExists(false);
      this.explosion.reset(alien.body.x, alien.body.y);
      this.explosion.play('kaboom', 30, false, true);


      if (this.aliens.countLiving() == 0)
      {
        this.score += 1000;
        this.scoreText.text = scoreString + score;
        this.stateText.text = " You Won, \n Click to restart";
        this.stateText.visible = true;
        this.enemyBullets.callAll('kill');
        this.input.onTap.addOnce(restart,this);
      }
    }


    function enemyHitsPlayer (player,bullet) 
    {
      this.bullet.kill();
      live = this.lives.getFirstAlive();

    if (this.live)
    {
      this.live.kill();
    }
    var explosion = explosions.getFirstExists(false);
    this.explosion.reset(player.body.x, player.body.y);
    this.explosion.play('kaboom', 30, false, true);

    if (this.lives.countLiving() < 1)
    {
      this.player.kill();
      this.enemyBullets.callAll('kill');
      this.stateText.text=" GAME OVER \n Click to restart";
      this.stateText.visible = true;
      this.input.onTap.addOnce(restart,this);
    }

    }

    function playerCollision (player,aliens)
    {
      this.player.kill();
      this.live = this.lives.getFirstAlive();

      if (this.live)
      { 
        this.live.kill();
      }
      aliens.reset();
      
      for (var y = 0; y < 4; y++)
      {

        for (var x = 0; x < 10; x++)
        {
          this.alien = this.aliens.create(x * 48, y * 50, 'invader');
          this.alien.anchor.setTo(0.5, 0.5);
          this.alien.animations.add('fly', [ 0, 1, 2, 3 ], 20, true);
          this.alien.play('fly');
          this.alien.body.moves = false;
        }
      }



      var explosion = this.explosions.getFirstExists(false);
      explosion.reset(player.body.x, player.body.y);
      explosion.play('kaboom', 30, false, true);
      this.player.revive();

      if (this.lives.countLiving() < 1)
      {
        this.player.kill();
        this.enemyBullets.callAll('kill'); //
        stateText.text=" GAME OVER \n Click to restart";
        stateText.visible = true;
        this.input.onTap.addOnce(restart,this);
      }
    }
    

    function enemyFires () 
    {
      this.livingEnemies.length = 0;
      this.aliens.forEachAlive(function(alien)
      {

        this.livingEnemies.push(alien);
      });

      if (this.enemyBullet && this.livingEnemies.length > 0)
      {
        console.log(this.enemyBullet);
        console.log(this.livingEnemies);
        var random= this.rnd.integerInRange(0,livingEnemies.length-1);
        var shooter=livingEnemies[random];
        this.enemyBullet.reset(shooter.body.x, shooter.body.y);
        this.physics.arcade.moveToObject(enemyBullet,player,120);
        this.firingTimer = this.time.now + 2000;
      }


    }



  },



  quitGame: function (pointer) 
  {
    this.state.start('MainMenu');
  }

};
