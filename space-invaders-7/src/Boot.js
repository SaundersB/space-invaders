	BasicGame = 
	{
		orientated: false,
		fullscreen: false,
	};

	BasicGame.toggleFullscreen = function() 
	{
		if (this.scale.isFullScreen) 
		{
			this.scale.stopFullScreen(false);
		} 
		else 
		{
			this.scale.startFullScreen(false);
		}
	}


	BasicGame.Boot = function(game) 
	{
	};

	BasicGame.Boot.prototype = 
	{
		init: function() 
		{
			this.input.maxPointers = 3;
			this.stage.disableVisibilityChange = true;
			this.stage.backgroundColor = '#000000';

			this.scale.pageAlignHorizontally = true;
			this.scale.pageAlignVertically = true;
	


			if (this.game.device.desktop) 
			{
				this.scale.scaleMode = Phaser.ScaleManager.BEST_FIT; 
			} 
			else 
			{
				this.scale.forceOrientation(true, false);
				this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
				this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
				this.scale.maxWidth = this.game.width / 1.55;
	            this.scale.maxHeight = this.game.height / 1.55;
				this.scale.setScreenSize(true);

			}

			this.scale.refresh();

		},

		preload: function() 
		{
			this.load.image('preloader-bar', 'assets/ui/preloader-bar.png');
		},

		create: function() 
		{
			this.state.start('Preloader');
		},

		enterIncorrectOrientation: function() 
		{
			BasicGame.orientated = false;
			document.getElementById('orientation').style.display = 'block';			
		},

		leaveIncorrectOrientation: function() 
		{
			BasicGame.orientated = true;
			document.getElementById('orientation').style.display = 'none';
		}

	};
