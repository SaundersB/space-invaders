// Brandon Saunders April 19th, 2015
// Javascript program that outputs to the console an HTML file that additionally produces 100 random colors.

// Builds the HTML tags for the first half of the page.

var Firsthtml = buildFirstHtml();
console.log(Firsthtml);

function buildFirstHtml() {
  var header = '';
  var body = '';

  return '<!DOCTYPE html>\n'+ '<html>\n<head>\n' + '<meta charset="UTF-8">\n' + '<title>Ten Random Colors</title>\n' + '</head>\n' +'<body>\n' + '<ul>';
};

// Generates two arrays for the random colors. One with the "#" symbol, and the other without.
	for (var i = 0; i<99; i++)
	{
		var Color = Math.floor(Math.random() * 16777215).toString(16);
		var randomColor = '#' + Color + '"';
		var Colors = Array();
		var ColorArray = Array();
		Colors[i] = randomColor;
		ColorArray[i] = Color;
		console.log('<li style="color: ' + Colors[i] + '>'  + ColorArray[i] + '</li>');
	}


// Builds the HTML tags for the second half of the page.

var Secondhtml = buildSecondHtml();
console.log(Secondhtml);

function buildSecondHtml() {
  var header = '';
  var body = '';

  return '</ul>\n' + body + '</body>\n' + '</html>\n';
};








