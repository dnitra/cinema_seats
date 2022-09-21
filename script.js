const container = document.querySelector(".container");
const form = document.querySelector("form");
const nSeats = document.querySelector(".nSeats");
const totalPrice = document.querySelector(".totalPrice");
let countSelectedSeats = 0;
let nRows = 7;
let nColumns = 12;
// nRows++
// nColumns++
let random = () => {
  let number = Math.round(Math.random() * 10);
  if (number <= 6) return "occupied";
  else return "";
};

let oldNumber;
const column = (number) =>
  number % nColumns > 0 ? number % nColumns : nColumns;
const row = (number) =>
  String.fromCharCode(Math.floor((number - 1) / nColumns) + 65);
const getSeatNumber = (number) => {
  return `${row(number)}${column(number)}`;
};

for (let i = 1; i <= nRows * nColumns; i++) {
 
  container.innerHTML += `<div  class="item ${random()}"><p>${getSeatNumber(i)}</p></div>`;
}

const items = document.querySelectorAll(".item");

container.addEventListener("mouseover", () => {
  items.forEach((item) => {
    if (item.classList.contains("occupied")) {
      item.classList.add("scaled");
    }
  });
});
container.addEventListener("mouseleave", () => {
  items.forEach((item) => {
    if (item.classList.contains("scaled")) {
      item.classList.remove("scaled");
    }
  });
});
console.log("width " + container.offsetWidth);
items.forEach((item) => {
  item.style.width = `${100 / nColumns}%`;
  item.style.height = `0px`;
  item.style.paddingBottom = `${100 / nColumns}%`;

  item.addEventListener("click", function() {
    if (
      !this.classList.contains("selected") &&
      !this.classList.contains("occupied")
    ) {
      this.classList.add("selected");
      countSelectedSeats++;
    } else if (this.classList.contains("selected")) {
      this.classList.remove("selected");
      countSelectedSeats--;
    }
    nSeats.textContent = countSelectedSeats;
    totalPrice.textContent = `$${(countSelectedSeats * 9.9).toFixed(2)}`;
  });
});
