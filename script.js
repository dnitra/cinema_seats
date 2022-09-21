const container = document.querySelector(".container");
const form = document.querySelector("form");
const nSeats = document.querySelector(".nSeats");
const totalPrice = document.querySelector(".totalPrice");
let countSelectedSeats = 0;
let nRows = 7;
let nColumns = 12;

//simulates seats occupation
let random = () => {
  let number = Math.round(Math.random() * 10);
  if (number <= 6) return "occupied";
  else return "";
};

// converts the number of the seat into its column position
const column = (number) =>
  number % nColumns > 0 ? number % nColumns : nColumns;

// converts the number of the seat into its row position
// rows are in alphabetical order
const row = (number) =>
  String.fromCharCode(Math.floor((number - 1) / nColumns) + 65);

// converts the seat's number into its column and row position
//combines row and column function
const getSeatNumber = (number) => {
  return `${row(number)}${column(number)}`;
};

//creates the seats according to number of rows and number of columns in the cinema
for (let i = 1; i <= nRows * nColumns; i++) {
  container.innerHTML += `<div  class="item ${random()}"><p>${getSeatNumber(
    i
  )}</p></div>`;
}

//Item is the seat in the cinema.
//Selects all of the seats in the cinema.
const items = document.querySelectorAll(".item");

/* 
When mouseover the container containing all of the seats(items),
event listener ADDS class ".scaled" to all seats which are occupied.
*/
container.addEventListener("mouseover", () => {
  items.forEach((item) => {
    if (item.classList.contains("occupied")) {
      item.classList.add("scaled");
    }
  });
});

/* 
When mouse leaves the container containing all of the seats(items),
event listener REMOVES class ".scaled" from all seats which were previosly selected.
*/
container.addEventListener("mouseleave", () => {
  items.forEach((item) => {
    if (item.classList.contains("scaled")) {
      item.classList.remove("scaled");
    }
  });
});

items.forEach((item) => {
  //sets the width of each seat according to the width of the container
  item.style.width = `${100 / nColumns}%`;

  //sets the height of each seat to the 1/1 ratio to the width of the seat
  item.style.height = `0px`;
  item.style.paddingBottom = `${100 / nColumns}%`;


  /*
  When click on seat it adds class ".selected" to the seats which
  are not occupied or they don't already contain ".selected" class
  and unselect the seats which already contain ".selected" class.
  */
  item.addEventListener("click", () => {
    
    if (
      !item.classList.contains("selected") &&
      !item.classList.contains("occupied")
    ) {
      item.classList.add("selected");
      countSelectedSeats++;
    } else if (item.classList.contains("selected")) {
      item.classList.remove("selected");
      countSelectedSeats--;
    }
    nSeats.textContent = countSelectedSeats;
    totalPrice.textContent = `$${(countSelectedSeats * 9.9).toFixed(2)}`;
  });
});
