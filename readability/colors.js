// Brandon Saunders April 19th, 2015
// Javascript program that outputs to the console an HTML file that additionally produces 100 random colors.


// Builds the HTML tags for the first half of the page.

	function buildFirstHtml() 
	{
		var two = '  ';
		var four = '    ';
  		return '<html>\n' + two + '<head>\n' + four + '<meta charset="UTF-8">\n' 
		+ four + '<title>One Hundred Random Colors</title>\n' + two + '</head>\n' + two + '<body>\n' + four + '<ul>';
	};


// Generates two arrays for the random colors. One with the "#" symbol, and the other without.

	function generateColors()
	{
		for (var i = 0; i < 99; i++)
		{
			var eight = "        "; // For formatting in HTML document.
			var Color = Math.floor(Math.random() * 16777215).toString(16); // 16777215 = Total HTML Color Numbers.
			var randomColor = '#' + Color + '"';
			var Colors = Array();
			var ColorArray = Array(); // Two arrays for formatting.
			Colors[i] = randomColor;
			ColorArray[i] = Color;
			console.log(eight + '<li style="color: ' + Colors[i] + '>'  + ColorArray[i] + '</li>');
		}
	};


// Builds the HTML tags for the second half of the page.

	function buildSecondHtml() {
		var two = '  ';
		var four = '    ';
		return  four + '</ul>\n' + two + '</body>\n' + '</html>\n';
	};


// Main Activity

	var Firsthtml = buildFirstHtml();
	var Secondhtml = buildSecondHtml();
	console.log(Firsthtml);
	generateColors();
	console.log(Secondhtml);




