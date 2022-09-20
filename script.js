const container = document.querySelector(".container");
let nRows = 10;
let nColumns = 10;
// nRows++
// nColumns++
let random = () => {
  let number = Math.round(Math.random() * 10);
  if (number <= 8) return "red";
};
for (let i = 0; i < nRows * nColumns; i++) {
  container.innerHTML += `<div  class="item ${random()}"><p>${i}</p></div>`;
}

const items = document.querySelectorAll(".item");
let oldNumber;
const column = (number) => number % nColumns;
const row = (number) => String.fromCharCode(Math.floor(number / nColumns) + 65);
const getSeatNumber = (number) => {
  return `${row(number)}${column(number)}`;
};

items.forEach((item) =>
  item.addEventListener("mouseover", (event) => {
    if (!isNaN(event.target.firstChild.textContent[0])) {
      oldNumber = event.target.firstChild.textContent;
    }
    if (!isNaN(oldNumber[0])) {
      let number = getSeatNumber(oldNumber);
      event.target.firstChild.textContent = number;
    }
  })
);
items.forEach((item) =>
  item.addEventListener("mouseleave", (item) => {
    item.target.firstChild.textContent = oldNumber;
  })
);
items.forEach(
  (item) =>
    (item.onclick = function (event) {
      console.log(this);
      if (!this.classList.contains("selected")) {
        this.classList.add("selected");
      } else {
        this.classList.remove("selected");
      }
    })
);
