const gameboard = (function () {
	var board = [
		["", "", ""],
		["", "", ""],
		["", "", ""],
	];

	const displayBoard = () => {
		console.log("board", board);
		return board;
	};
	return { displayBoard };
})();

const Player = function (name, symbol) {
	this.name = name;
	this.symbol = symbol;

	const getName = () => {
		return this.name;
	};
	const getSymbol = () => {
		return this.symbol;
	};
	return { getName, getSymbol };
};

const Game = function () {
	const player1 = new Player("Bob", "X");
	const player2 = new Player("Charlie", "O");

	function checkGameOver() {
		const board = gameboard.displayBoard();

		// horizontal
		for (let i = 0; i < 3; i++) {
			if (
				board[i][0] != "" &&
				board[i][0] == board[i][1] &&
				board[i][1] == board[i][2]
			) {
				return board[i][0];
			}
		}

		// vertical
		for (let i = 0; i < 3; i++) {
			if (
				board[0][i] != "" &&
				board[0][i] == board[1][i] &&
				board[1][i] == board[2][i]
			) {
				return board[0][i];
			}
		}

		// diagonal
		if (
			board[0][0] != "" &&
			board[0][0] == board[1][1] &&
			board[1][1] == board[2][2]
		) {
			return board[0][0];
		}
		if (
			board[2][0] != "" &&
			board[2][0] == board[1][1] &&
			board[0][2] == board[1][1]
		) {
			return board[2][0];
		}

		// no more possible places
		if (
			board[0][0] != "" &&
			board[0][1] != "" &&
			board[0][2] != "" &&
			board[1][0] != "" &&
			board[1][1] != "" &&
			board[1][2] != "" &&
			board[2][0] != "" &&
			board[2][1] != "" &&
			board[2][2] != ""
		) {
			return "full";
		}

		// nobody wins yet
		return "Nobody wins yet!";
	}

	function countMarkers() {
		const board = gameboard.displayBoard();
		var count = 0;
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				if (board[i][j] != "") {
					count++;
				}
			}
		}
		return count;
	}

	function addMarker(positionX, positionY) {
		const board = gameboard.displayBoard();
		const numMarkers = countMarkers();
		var symbol;
		if (numMarkers % 2 == 0) {
			symbol = player1.getSymbol();
		} else {
			symbol = player2.getSymbol();
		}
		// not empty position
		if (board[positionX][positionY] != "") {
			return false;
		} else {
			console.log("a");
			board[positionX][positionY] = symbol;
		}

		const result = checkGameOver();
		const para = document.querySelector(".game-description");
		if (result == player1.getSymbol()) {
			para.innerHTML = player1.getName() + " wins!";
		} else if (result == player2.getSymbol()) {
			para.innerHTML = player2.getName() + " wins!";
		} else {
			para.innerHTML = result;
		}

		return symbol;
	}
	return { checkGameOver, addMarker };
};

const displayController = (function () {
	gameboard.displayBoard();
	var counter = 0;

	const game = new Game();

	var positionX = null;
	var positionY = null;
	var symbol = "X";

	const topLeft = document.getElementById("top-left");
	topLeft.addEventListener("click", function () {
		positionX = 0;
		positionY = 0;
		symbol = game.addMarker(positionX, positionY);
		if (symbol != false) {
			topLeft.innerHTML = symbol;
		}
	});
	const topMiddle = document.getElementById("top-middle");
	topMiddle.addEventListener("click", function () {
		positionX = 0;
		positionY = 1;
		symbol = game.addMarker(positionX, positionY);
		if (symbol != false) {
			topMiddle.innerHTML = symbol;
		}
	});
	const topRight = document.getElementById("top-right");
	topRight.addEventListener("click", function () {
		positionX = 0;
		positionY = 2;
		symbol = game.addMarker(positionX, positionY);
		if (symbol != false) {
			topRight.innerHTML = symbol;
		}
	});

	const middleLeft = document.getElementById("middle-left");
	middleLeft.addEventListener("click", function () {
		positionX = 1;
		positionY = 0;
		symbol = game.addMarker(positionX, positionY);
		if (symbol != false) {
			middleLeft.innerHTML = symbol;
		}
	});
	const middleMiddle = document.getElementById("middle-middle");
	middleMiddle.addEventListener("click", function () {
		positionX = 1;
		positionY = 1;
		symbol = game.addMarker(positionX, positionY);
		if (symbol != false) {
			middleMiddle.innerHTML = symbol;
		}
	});
	const middleRight = document.getElementById("middle-right");
	middleRight.addEventListener("click", function () {
		positionX = 1;
		positionY = 2;
		symbol = game.addMarker(positionX, positionY);
		if (symbol != false) {
			middleRight.innerHTML = symbol;
		}
	});

	const bottomLeft = document.getElementById("bottom-left");
	bottomLeft.addEventListener("click", function () {
		positionX = 2;
		positionY = 0;
		symbol = game.addMarker(positionX, positionY);
		if (symbol != false) {
			bottomLeft.innerHTML = symbol;
		}
	});
	const bottomMiddle = document.getElementById("bottom-middle");
	bottomMiddle.addEventListener("click", function () {
		positionX = 2;
		positionY = 1;
		symbol = game.addMarker(positionX, positionY);
		if (symbol != false) {
			bottomMiddle.innerHTML = symbol;
		}
	});
	const bottomRight = document.getElementById("bottom-right");
	bottomRight.addEventListener("click", function () {
		positionX = 2;
		positionY = 2;
		symbol = game.addMarker(positionX, positionY);
		if (symbol != false) {
			bottomRight.innerHTML = symbol;
		}
	});
})();

displayController();
