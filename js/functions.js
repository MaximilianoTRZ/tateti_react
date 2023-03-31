//Functions 

// Global
let contador = 0

// check if the number is even
const isEven = (contador) => { return (contador % 2) == 0 }

// toggle classes to show every movement
const toggleClass = (square) => {
  if (isEven(contador)) {
    square.classList.toggle("par");
  } else {
    square.classList.toggle("impar");
  }
  contador++;
  console.log(contador);
}

// get the element id which was clicked
const getId = () => {
  if (!contador) {
    document.querySelectorAll(".individual-container")
    .forEach(el => {
      el.addEventListener("click", e => {
        const id = e.target.getAttribute("id");
        console.log("Se ha clickeado el id "+id);
        const square = document.getElementById(id);
        toggleClass(square);
      });
    });
  }
}
