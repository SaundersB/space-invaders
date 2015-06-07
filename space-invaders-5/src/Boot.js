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

			this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
			this.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;

			this.scale.minWidth = this.game.width / 2;
			this.scale.minHeight = this.game.height / 2;
			this.scale.pageAlignHorizontally = true;
			this.scale.pageAlignVertically = true;


			if (this.game.device.desktop) 
			{
			} 
			else 
			{            
				this.scale.forceOrientation(true, false);
				this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
				this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
				this.scale.maxWidth = this.game.width / 2;
	            this.scale.maxHeight = this.game.height / 2;
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
