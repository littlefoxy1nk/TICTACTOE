const board = document.querySelector('.board');
const message = document.querySelector('.message');
const restart = document.querySelector('.restart');

// créations des cellules 
function createCells(){
    for(let i=0; i<9 ; i++){
        const cell = document.createElement('div')
        cell.classList.add('cell');
        cell.setAttribute('data-cell-index', i);
        board.appendChild(cell);
        message.textContent = " X's turn !"
        cell.addEventListener("click", function(){
            clickCell(cell);
        })
    }
}

createCells();

// définir les combinaisons gagnates 
const winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
// tableau pour suivre les états des cellules 
let cellPlay = ["", "", "", "", "", "", "", "", ""];
// initialise le joueur 
let player= "X";



// ce qui se passe quand on click 
function clickCell(cell){ 
    const index = cell.getAttribute('data-cell-index');
        if (cell.textContent === '') { // la case doit être vide
            cell.textContent = player; 
            cellPlay[index] = player;// mettre a jour le cell play

            if (checkWinner()) {
                showWinner(player);//montre le text en fonction du gagnant 
                return; // Stoppe le jeu si un joueur gagne
            }

            player = player === "X" ? "O" : "X"; // condition ? valeur_si_vrai : valeur_si_faux;
            if(player === "X"){
                cell.style.color = "#CD6889"
            } else {
                cell.style.color = "#f57445"
            }
            message.textContent = `${player}'s turn !`;
            if(player === "O"){
                message.style.color = "#CD6889"
            } else {
                message.style.color = "#f57445"
            }
            if (cellPlay.every(cell => cell !== "")) {
                showWinner("null")
                message.style.color = "white"
                return;
            }
    
        }
    }
        
    


// Fonction pour réinitialiser le jeu
function initializeGame() {
    board.innerHTML = ''; // Vider la grille
    player = 'X';         // Remettre le joueur à "X"
    message.textContent = "X's turn"; // Afficher le message pour indiquer que c'est le tour de X
    cellPlay = ["", "", "", "", "", "", "", "", ""]; 
    message.classList.remove('winner-message'); // Enlever le style grand du message
    board.classList.remove('hide-board'); // Afficher 
    message.style.color = "#f57445";
    createCells();
}





// les conditions Vainqueur et null 
function checkWinner() {
    // Loop through each winning combination
    for (let i = 0; i < winCombinations.length; i++) {
        const combination = winCombinations[i]; // Get the current winning combination
        const [a, b, c] = combination; // Destructure the combination into a, b, c

        // Check if all three cells in the combination are filled with the same symbol
        if (cellPlay[a] && cellPlay[a] === cellPlay[b] && cellPlay[a] === cellPlay[c]) {
            return true; // If so, a player has won
        }
    }
    return false; // If no combination is satisfied, return false
}

function showWinner(result) {
    // Masquer la grille
    board.classList.add('hide-board');

    // Afficher un message en grand
    if (result === "null") {
        message.textContent = "NO WINNER !";
    } else {
        message.textContent = `${result} WIN !`;
    }

    message.classList.add('winner-message'); // Appliquer le style grand pour le message
}






restart.addEventListener("click", function () {
    initializeGame(); 
});

