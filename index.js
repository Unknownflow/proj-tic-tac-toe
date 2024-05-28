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

	const clearBoard = () => {
		board = [
			["", "", ""],
			["", "", ""],
			["", "", ""],
		];
		return;
	};

	return { displayBoard, clearBoard };
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

	// display player turn
	const playerTurn = document.querySelector(".player-turn");
	playerTurn.innerHTML = player1.getName() + "'s turn";

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
			return "Game board is full!";
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
		const playerTurn = document.querySelector(".player-turn");
		const board = gameboard.displayBoard();
		const numMarkers = countMarkers();
		var symbol;

		if (numMarkers % 2 == 0) {
			symbol = player1.getSymbol();
			playerTurn.innerHTML = player2.getName() + "'s turn";
		} else {
			symbol = player2.getSymbol();
			playerTurn.innerHTML = player1.getName() + "'s turn";
		}
		// not empty position
		if (board[positionX][positionY] != "") {
			return false;
		} else {
			console.log("a");
			board[positionX][positionY] = symbol;
		}

		const result = checkGameOver();
		const gameDescription = document.querySelector(".game-description");
		if (result == player1.getSymbol()) {
			gameDescription.innerHTML = player1.getName() + " wins!";
		} else if (result == player2.getSymbol()) {
			gameDescription.innerHTML = player2.getName() + " wins!";
		} else {
			gameDescription.innerHTML = result;
		}

		return symbol;
	}

	function restartGame() {
		// display player turn
		const playerTurn = document.querySelector(".player-turn");
		playerTurn.innerHTML = player1.getName() + "'s turn";
		gameboard.clearBoard();
	}
	return { checkGameOver, addMarker, restartGame };
};

const displayController = (function () {
	const game = new Game();
	var symbol = "X";

	// top tic tac toe elements
	const topLeft = document.getElementById("top-left");
	topLeft.addEventListener("click", function () {
		symbol = game.addMarker(0, 0);
		if (symbol != false) {
			topLeft.innerHTML = symbol;
		}
	});
	const topMiddle = document.getElementById("top-middle");
	topMiddle.addEventListener("click", function () {
		symbol = game.addMarker(0, 1);
		if (symbol != false) {
			topMiddle.innerHTML = symbol;
		}
	});
	const topRight = document.getElementById("top-right");
	topRight.addEventListener("click", function () {
		symbol = game.addMarker(0, 2);
		if (symbol != false) {
			topRight.innerHTML = symbol;
		}
	});

	// middle tic tac toe elements
	const middleLeft = document.getElementById("middle-left");
	middleLeft.addEventListener("click", function () {
		symbol = game.addMarker(1, 0);
		if (symbol != false) {
			middleLeft.innerHTML = symbol;
		}
	});
	const middleMiddle = document.getElementById("middle-middle");
	middleMiddle.addEventListener("click", function () {
		symbol = game.addMarker(1, 1);
		if (symbol != false) {
			middleMiddle.innerHTML = symbol;
		}
	});
	const middleRight = document.getElementById("middle-right");
	middleRight.addEventListener("click", function () {
		symbol = game.addMarker(1, 2);
		if (symbol != false) {
			middleRight.innerHTML = symbol;
		}
	});

	// bottom tic tac toe elements
	const bottomLeft = document.getElementById("bottom-left");
	bottomLeft.addEventListener("click", function () {
		symbol = game.addMarker(2, 0);
		if (symbol != false) {
			bottomLeft.innerHTML = symbol;
		}
	});
	const bottomMiddle = document.getElementById("bottom-middle");
	bottomMiddle.addEventListener("click", function () {
		symbol = game.addMarker(2, 1);
		if (symbol != false) {
			bottomMiddle.innerHTML = symbol;
		}
	});
	const bottomRight = document.getElementById("bottom-right");
	bottomRight.addEventListener("click", function () {
		symbol = game.addMarker(2, 2);
		if (symbol != false) {
			bottomRight.innerHTML = symbol;
		}
	});

	const gameDescription = document.querySelector(".game-description");
	const restartButton = document.querySelector(".restart-button");
	restartButton.addEventListener("click", function () {
		topLeft.innerHTML = "";
		topMiddle.innerHTML = "";
		topRight.innerHTML = "";

		middleLeft.innerHTML = "";
		middleMiddle.innerHTML = "";
		middleRight.innerHTML = "";

		bottomLeft.innerHTML = "";
		bottomMiddle.innerHTML = "";
		bottomRight.innerHTML = "";

		gameDescription.innerHTML = "";
		game.restartGame();
	});
})();

displayController();
