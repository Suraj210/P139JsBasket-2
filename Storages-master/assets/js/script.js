"use strict";

// localStorage.setItem("name","Ismayil");
// localStorage.setItem("surname","Efendizade");
//localStorage.setItem("surname","test");

// console.log(localStorage.getItem("surname"))

//localStorage.removeItem("surname")

// localStorage.clear()


// sessionStorage.setItem("address","ehmedli")

// console.log(sessionStorage.getItem("address"));



// let btnAdd = document.querySelector(".buttons button:nth-child(1)");
// let btnClear = document.querySelector(".buttons button:nth-child(2)");
// let inputKey = document.querySelector(".inputs input:nth-child(1)");
// let inputValue = document.querySelector(".inputs input:nth-child(2)");

// btnAdd.addEventListener("click", function () {

//     let key = inputKey.value;
//     let value = inputValue.value;

//     if (key.trim() == "" || value.trim() == "") {
//         alert("inputs dont be empty")
//         return;
//     }

//     if (localStorage.getItem(key) == null) {
//         localStorage.setItem(key, value);
//     } else {
//         alert("Exist")
//     }

//     inputKey.value = "";
//     inputValue.value = "";

// })


// btnClear.addEventListener("click", function () {
//     localStorage.clear();
// })


// let datas = [

//     {
//         name: "sdsd",
//         surname: "xdd",
//         phones: ["23423423", "3452354"],
//         educations: [
//             {
//                 name: "Programming",
//                 price:3000
//             },
//             {
//                 name:"Design",
//                 price:4000
//             }
//         ]
//     },
//     {
//         name: "sdasdasdsa",
//         surname: "sdaskdjahsjkdhas",
//         phones: ["23423423", "3452354"],
//         educations: [
//             {
//                 name: "Programming",
//                 price:3000
//             },
//             {
//                 name:"Design",
//                 price:4000
//             }
//         ]
//     }
// ]


// datas.forEach(data => {
//     console.log(data)
// });

// let names = ["Surac", "Ismayil", "Xeyyam", "Fidan"];

// localStorage.setItem("students", JSON.stringify(names));


//  console.log(JSON.parse(localStorage.getItem("students")))



let addBtns = document.querySelectorAll("#products .card-body a");

let basket = [];

if (localStorage.getItem("basket") != null) {
    basket = JSON.parse(localStorage.getItem("basket"))
} else {
    document.querySelector(".basket .count").classList.add("d-none")
}

if(basket.length == 0){
    document.querySelector(".basket .count").classList.add("d-none");
}

function basketCount() {
    let basketCount = 0;
    for (const item of basket) {
        basketCount += item.count;
    }
    return basketCount;
}

document.querySelector(".basket .count span").innerText = basketCount();

addBtns.forEach(btn => {
    btn.addEventListener("click", function (e) {

        e.preventDefault();

        let productName = this.parentNode.firstElementChild.innerText;
        let productDescription = this.parentNode.firstElementChild.nextElementSibling.innerText;
        let productImage = this.parentNode.previousElementSibling.getAttribute("src");
        let productId = parseInt(this.parentNode.getAttribute("data-id"));
        let productPrice = parseFloat(this.nextElementSibling.innerText.split(" ")[0]);
      

        let existProduct = basket.find(m => m.id == productId);

        if (existProduct != undefined) {
            existProduct.count++;
        } else {

            basket.push({
                id: productId,
                name: productName,
                description: productDescription,
                image: productImage,
                price:productPrice,
                count: 1
            })
        }

        localStorage.setItem("basket", JSON.stringify(basket));
    
        document.querySelector(".basket .count span").innerText = basketCount();
        document.querySelector(".basket .count").classList.remove("d-none");
   

    })
});







