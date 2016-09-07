var player = true;
var board = [];

$('#curPlayer').append('Player ' + (player ? 1 : 2) + '\'s turn.');

for (var i = 0; i < 6; i++) {
	$('#board').append('<tr id="row' + i + '">');
	board[i] = [0, 0, 0, 0, 0, 0, 0];
	
	for (var j = 0; j < 7; j++) {
		$('#row' + i).append('<td class="btn-lg" id="cell' + i + '-' + j + '" value="'+ j +'" onclick="dropIn(' + j + ')"></td>');
	}
}
// console.log(board);
$("td").hover(
	function() {
		// console.log("in");

		for (var k = 0; k < 6; k++) {
			var c = $('#cell' + k + '-' + $(this).attr('value'));
			c.css('background-color', 'rgba(255, 255, 255, 0.2)');
		}
	}, 
	function() {
		// console.log("out");
		
		for (var k = 0; k < 6; k++) {
			var c = $('#cell' + k + '-' + $(this).attr('value'));
			c.css('background-color', 'rgba(14, 11, 22, 0.7)');
		}
	}
);

function detectHoriz(row, col, pnum) {
		var sequence = 0;
	for (var x = col - 3; x <= col + 3; x++) {
		// console.log(row + " - " + x);
		if(x >= 0 && x < 7 && board[row][x] == pnum) {
			
			sequence++;
		} else {
			sequence == 0;
		}
	}
	// console.log(sequence);
	if (sequence >= 4) {
		return true;
	} else {
		return false;
	}
}

function detectVert(row, col, pnum) {
	var sequence = 0;
	for (var x = row - 3; x <= row + 3; x++) {
		// console.log(x + " - " + col);
		if(x >= 0 && x < 6 && board[x][col] == pnum) {
			
			sequence++;
			
		} else {
			sequence == 0;
		}
	}
	// console.log(sequence);
	if (sequence >= 4) {
		return true;
	} else {
		return false;
	}
}

function detectNWSE(row, col, pnum) {
	var sequence = 0;
	for (var x = -3; x <= 3; x++) {
		if(row + x >= 0 && row + x < 6 && col + x >= 0 && col + x < 7 && board[row + x][col + x] == pnum) {
			// console.log((row + x) + " - " + (col + x));
			sequence++;
			
		} else {
			sequence == 0;
		}
	}
	// console.log(sequence);
	if (sequence >= 4) {
		return true;
	} else {
		return false;
	}
}

function detectSWNE(row, col, pnum) {
	var sequence = 0;
	for (var x = -3; x <= 3; x++) {
		if(row - x >= 0 && row - x < 6 && col + x >= 0 && col + x < 7 && board[row - x][col + x] == pnum) {
			// console.log((row - x) + " - " + (col + x));
			sequence++;
			
		} else {
			sequence == 0;
		}
	}
	// console.log(sequence);
	if (sequence >= 4) {
		return true;
	} else {
		return false;
	}
}



// when elem is added, chenge value of td element to pnum
// if pnum >= 0, don't chnage backgrounds into hover and out of hover


function detectWin(row, col, pnum) {
	if (detectHoriz(row, col, pnum)) {
		return true;
	} else if (detectVert(row, col, pnum)) {
		return true;
	} else if (detectNWSE(row, col, pnum)) {
		return true;
	} else if (detectSWNE(row, col, pnum)) {
		return true;
	} else {
		return false;
	}
}

function dropIn(col) {
	var dropped = false;
	var r;
	var c;
	var p;
	for (var m = 5; m >= 0; m--) {
		if (board[m][col] == 0) {
			board[m][col] = player ? 1 : 2;
			r = m;
			c = col;
			p = player ? 1 : 2;
			if (player)
				$('#cell'+m+'-'+col).append('<span class="glyphicon glyphicon-remove white" aria-hidden="true"></span>');
			else {
				$('#cell'+m+'-'+col).append('<span class="glyphicon glyphicon-record white" aria-hidden="true"></span>');
			}
			dropped = true;
			break;
		}
	}

	if(detectWin(r, c, p)) {
		for (var m = 5; m >= 0; m--) {
			for(var n = 0; n < 7; n++)
			if (board[m][n] == 0) {
				board[m][n] = 3;
			}
		}
		// console.log("WINNER!!!!");
		// $('#winner').append('Player ' + ((player) ? 1 : 2) + ' wins the game!');
		$('#output').fadeOut(function() {
  			$(this).append('<hr><h3 id="winner" class="product">Player ' + ((player) ? 1 : 2) + ' wins the game!</h3>').fadeIn();
  			$(this).append('<button id="resetButton" onclick="replay()" class="btn">Play Again?</button>');

		});

	}

	// switch players if tile was dropped
	if(dropped == true) {
		$('#curPlayer').fadeOut(function() {
  			$(this).text('Player ' + (player ? 1 : 2) + '\'s turn.').fadeIn();
		});

		// $('#curPlayer').empty();
		player = !player;
		// $('#curPlayer').append('Player ' + (player ? 1 : 2) + '\'s turn.');
		
	}
}

// $('#resetButton').click(function() {
function replay() {
	// console.log("reset?");
	$('#resetButton').remove();
	$('#winner').remove();

	for (var a = 0; a < 6; a++) {
		for (var b = 0; b < 7; b++) {
			$('#cell' + a + '-' + b).empty();
			board[a][b] = 0;
		}
	}
}