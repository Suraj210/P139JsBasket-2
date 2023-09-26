"use strict";

let basket = [];

if (localStorage.getItem("basket") != null) {
  basket = JSON.parse(localStorage.getItem("basket"));
  document.querySelector("#cart .alert-warning").classList.add("d-none");
  document.querySelector("#cart h3").classList.remove("d-none");
} else {
  document.querySelector(".basket .count").classList.add("d-none");
  document.querySelector("#cart .table").classList.add("d-none");
  document.querySelector("#cart .alert-warning").classList.remove("d-none");
  document.querySelector("#cart h3").classList.add("d-none");
}

if (basket.length == 0) {
  document.querySelector("#cart .table").classList.add("d-none");
  document.querySelector("#cart .alert-warning").classList.remove("d-none");
  document.querySelector(".basket .count").classList.add("d-none");
  document.querySelector("#cart h3").classList.add("d-none");
}

function basketCount() {
  let basketCount = 0;
  for (const item of basket) {
    basketCount += item.count;
  }
  return basketCount;
}
document.querySelector(".basket .count span").innerText = basketCount();

showBasketDatas(basket);

function showBasketDatas(products) {
  let tableBody = document.querySelector(".table tbody");
  for (const item of products) {
    tableBody.innerHTML += `<tr>
        <td><img src="${item.image}" alt=""></td>
        <td>${item.name}</td>
        <td>${item.description}</td>
      <td>  
        <i data-id="${item.id}" class="fa-solid fa-minus"></i>
        <span> ${item.count}  </span>
         <i data-id="${item.id}" class="fa-solid fa-plus"></i>
     </td>
        <td>${item.price} ₼</td>
        <td >${item.price * item.count} ₼</td>
        <td>
            <button data-id="${
              item.id
            }" class="btn btn-danger delete-btn">Delete</button>
        </td>
        </tr>`;
  }
}

function calcTotalPrice() {
  let sum = 0;
  for (const element of basket) {
    let allPrice = element.price * element.count;
    sum += allPrice;
  }
  totalPrice.innerText = sum + " ₼";
}

deleteBasketItem();

function deleteBasketItem() {
  let deleteBtns = document.querySelectorAll(".table button");
  deleteBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      let productId = parseInt(this.getAttribute("data-id"));
      let existProduct = basket.find((m) => m.id == productId);
      basket = basket.filter((m) => m.id != existProduct.id);
      localStorage.setItem("basket", JSON.stringify(basket));
      document.querySelector(".basket .count span").innerText = basketCount();
      this.parentNode.parentNode.remove();
      if (basket.length == 0) {
        document.querySelector("#cart .table").classList.add("d-none");
        document
          .querySelector("#cart .alert-warning")
          .classList.remove("d-none");
        document.querySelector("#cart h3").classList.add("d-none");
        document.querySelector(".basket .count").classList.add("d-none");
      }

      calcTotalPrice();
    });
  });
}

let totalPrice = document.querySelector(".totalPrice");

calcTotalPrice();

let addCount = document.querySelectorAll(".fa-plus");
let decreaseCount = document.querySelectorAll(".fa-minus");

addCount.forEach((element) => {
  element.addEventListener("click", function () {
    let addId = parseInt(element.getAttribute("data-id"));
    for (const product of basket) {
      if (addId === product.id) {
        product.count++;
        localStorage.setItem("basket", JSON.stringify(basket));
        this.previousElementSibling.innerText = product.count;
        this.parentNode.nextElementSibling.nextElementSibling.innerText =
          product.price * product.count + " ₼";
        calcTotalPrice();
        document.querySelector(".basket .count span").innerText = basketCount();
        return;
      }
    }
  });
});

decreaseCount.forEach((element) => {
  element.addEventListener("click", function () {
    let addId = parseInt(element.getAttribute("data-id"));
    for (const product of basket) {
      if (addId === product.id) {
        if (product.count > 1) {
          product.count--;
          localStorage.setItem("basket", JSON.stringify(basket));
          this.nextElementSibling.innerText = product.count;
          this.parentNode.nextElementSibling.nextElementSibling.innerText =
            product.price * product.count + " ₼";
          calcTotalPrice();
          document.querySelector(".basket .count span").innerText =
            basketCount();
          return;
        }
      }
    }
  });
});
