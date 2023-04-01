//Functions 

// Global
let contador = 0

const welcome = () => {
  alert(`¡Welcome to TaTeTi!
Enter players names and press START GAME to play.`)
} 

const enableBtnResetGame = () => {
  if (contador == 9) {
    let element = document.getElementById("reset-game");
    element.type = 'button'
  }
} 

const createPlayers = () => {
  const player1 = {
    name: document.getElementById("player1").value.toUpperCase() || 'PLAYER 1',
    played: []
  } 
  const player2 = {
    name: document.getElementById("player2").value.toUpperCase() || 'PLAYER 2',
    played: []
  } 
  return { 
    player1, 
    player2 
  }
}

// check if the number is even
const isEven = (contador) => { return (contador % 2) == 0 }

// toggle classes to show every movement
const toggleClass = (square) => {
  if (isEven(contador)) {
    square.classList.toggle("par");
  } else {
    square.classList.toggle("impar");
  }
}


//chequea si hay un ganador
const checkWinner = (players) => {

  // el player 1 tiene 5 turnos
  // el player 2 tiene 4 turnos
  let player = isEven(contador) ? players.player1 : players.player2

  //array tomado por parametro del jugador con sus casillas
  let arrayPlayed = player.played

  const combinations = [
    //horizontal
    ["1","2","3"],
    ["4","5","6"],
    ["7","8","9"],

    //vertical
    ["1","4","7"],
    ["2","5","8"],
    ["3","6","9"],

    //diagonal
    ["1","5","9"],
    ["3","5","7"],
  ]

  // revisa las posibles combinaciones para ver si hay una que sea la ganadora segun las casillas clickeadas
  if(arrayPlayed.length < 3){
    return false
  }

  for(let i=0; i<arrayPlayed.length; i++) {
    for(let j=0; j<arrayPlayed.length; j++) {
      for(let z=0; z<arrayPlayed.length; z++) {
        var combination = [
          arrayPlayed[i], 
          arrayPlayed[j], 
          arrayPlayed[z]
        ];
        for(let y=0; y<combinations.length; y++) {
          if(JSON.stringify(combinations[y]) === JSON.stringify(combination)){
            document.getElementById("p-c").classList.add("disable-square")
            setTimeout(() => {
              alert(`El ganador es ${player.name}`);
              contador=9
              enableBtnResetGame();
            }, 500);
          }
        }
      }
    }
  } 
  console.log(`movimientos ${arrayPlayed.length}`)
  console.log(`contador ${contador}`)

  if(arrayPlayed.length == 5 && contador == 8){
    setTimeout(() => {
      alert(`It's a Draw!`);
      enableBtnResetGame();
    }, 500);
  }
}

// get the element id which was clicked
const getId = (players) => {
  if (!contador) {
    document.querySelectorAll(".individual-container")
    .forEach(el => {
      el.addEventListener("click", e => {
        const id = e.target.getAttribute("id");
        // console.log(`click id -> ${id}`);
        const square = document.getElementById(id);
        square.classList.add("disable-square")
        toggleClass(square);
        
        
        if (isEven(contador)) {
          players.player1.played.push(id)
          // console.log(players.player1)
        } else {
          players.player2.played.push(id)
          // console.log(players.player2)
        }
        checkWinner(players);
        // aumenta contador
        contador++;
        // console.log(`contador -> ${contador}`);
        enableBtnResetGame();
        
        
      });
    });
  }
}

const enableTable = () =>{
  if (!contador) {
    document.querySelectorAll(".individual-container")
    .forEach(el => {
      el.classList.toggle("disabled");
    })
  }
}

const disableElements = () => {
  document.getElementById("player1").disabled = true;
  document.getElementById("player2").disabled = true;
  document.getElementById("start-button").disabled = true;
  document.getElementById("start-button").classList.add("disable-square");
}



const startGame = () =>{
  console.log("GAME STARTED");
  const players = createPlayers();
  disableElements();
  enableTable();
  getId(players);
}


