
	BasicGame.MainMenu = function(game) 
	{
	};

	BasicGame.MainMenu.prototype = 
	{
		create: function() 
		{
			var logo =
			this.add.sprite(this.world.centerX, this.world.centerY - 150, 'logo');
			logo.pivot.x = logo.width * .5;
			logo.pivot.y = logo.height * .5;

			var button = this.add.button(this.game.width/2, 3.25*this.game.height/6,'start',function() {this.state.start("Game");},this,'over', 'up', 'down');
			button.pivot.x = button.width * .5;
			button.pivot.y = button.height * .5;

			if (this.game.device.desktop) 
			{
				var fullscreen =
				this.add.button(this.game.width-25, this.game.height-25,'fullscreen',BasicGame.toggleFullscreen,this,'over', 'up', 'down');
				fullscreen.pivot.x = fullscreen.width;
				fullscreen.pivot.y = fullscreen.height;
			} 
			else
			{
			}
		},
	};
