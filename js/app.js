/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]



/*---------------------------- Variables (state) ----------------------------*/
let board;
let turn;
let winner;
let tie;


/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll('.sqr');
const messageEl = document.getElementById('message');
const boardEl = document.querySelector('.board');
const resetBtnEl = document.getElementById('reset');


/*-------------------------------- Functions --------------------------------*/

const updateBoard = () => {

    board.forEach((square, index) => {
        if (square === 'X') {
            squareEls[index].textContent = 'X';
            squareEls[index].style.color = '#F24444';
        } else if (square === 'O') {
            squareEls[index]. textContent = 'O';
            squareEls[index].style.color = '#026873'
        } else {
            squareEls[index].textContent = '';
        }
      });

};

function updateMessage() {
    if (winner === false && tie === false) {
        messageEl.textContent = ` It's ${turn}'s turn.`

        if (turn === 'X') {
            messageEl.style.color = '#F24444'
        } else {
            messageEl.style.color = '#026873'
        }
        
    } else if (winner === false && tie === true) {
        messageEl.textContent = "It's a tie!";
        messageEl.style.color = '#F28705';
        
    } else {
        messageEl.textContent = `Congratulations! ${turn} won!`
        messageEl.style.color = '#F28705';
    }
}

function placePiece(index) {
    board[index] = turn;
}

function checkForWinner() {
  
     winningCombos.forEach((combo) => {
        if (board[combo[0]] !== '' && board[combo[0]] === board[combo[1]] && board[combo[0]] === board[combo[2]]) {
            winner = true;
        } 
    })
}

function checkForTie() {
    if (winner === true) {
        return;
    }

    if (board.includes('')) {
        tie = false;
    } else {
        tie = true;
    }
}

function switchPlayerTurn() {
    if (winner === true) {
        return;
    }

    if (turn === 'X') {
        turn = 'O';
    } else if (turn === 'O') {
        turn = "X";
    }
}

function init() {
    board = ['', '', '', '', '', '', '', '', ''];
    turn = 'X';
    winner = false;
    tie = false;

    render();

}
init();

function render() {
    updateBoard();
    updateMessage();
}


function handleClick(event) {
    if (winner === true) {
        return;
    }
    const squareIndex = event.id;
    if (board[squareIndex] !== '') {
        return;
    } else {
        placePiece(squareIndex);
    }

    checkForWinner();
    checkForTie();
    switchPlayerTurn();
    render();

}

/*----------------------------- Event Listeners -----------------------------*/


boardEl.addEventListener('click', (event) => {
    if (event.target.classList.contains('sqr')) {
        handleClick(event.target);
    }
})

resetBtnEl.addEventListener('click', init);


