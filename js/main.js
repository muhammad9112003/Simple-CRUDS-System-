//   all variables
let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let create = document.getElementById("create");
let search = document.getElementById("search");
let data = document.getElementById('data');
let mood = "create";
let index;
////////// function to get total price

function getPrice() {
    if (price.value !="") {
        let result;
        result = +price.value + +taxes.value + +ads.value - +discount.value;
        total.innerHTML = result;
        total.style.backgroundColor = "rgb(6, 169, 6)";
    }
    else {
        total.innerHTML = "0";
        taxes.value = "";
        ads.value = "";
        discount.value = "";
        total.style.backgroundColor = "#ff0000";
    }
}

////////////////////////// function to create new product (C)
let products;
if (localStorage.products != null) {
    products = JSON.parse(localStorage.products)
} else {
    products = [];
}
create.onclick = function () {
    let newProduct = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    }
    if (title.value != "" &&
        title.value.length > 2 &&
        price.value != "" &&
        category.value != "" &&
        count.value <= 100
        )
    
    {
        if (mood === "create") {
            if (newProduct.count > 1) {
                for (let i = 0; i < newProduct.count; i++) {
                    products.push(newProduct);
                }
            }
            else {
                products.push(newProduct);
            }
        }
        else {
            products[index] = newProduct;
            mood = "create";
            create.value = "Create";
            count.style.display = "block";
        }
        localStorage.setItem("products", JSON.stringify(products));
        clear();
    }
    read();
    getPrice();
    
}
///////////////////// function to clear all details 
function clear() {
        title.value= "";
        price.value= "";
        taxes.value= "";
        ads.value= "";
        discount.value= "";
        total.innerHTML= "";
        count.value= "";
        category.value= "";
}

///////////// to read product (R)
function read() {
    let DataTable = '';
    for (let i = 0 ; i < products.length; i++) {
        DataTable += `
        <tr>
        <td>${i+1}</td>
        <td>${products[i].title}</td>
        <td>${products[i].price}</td>
        <td>${products[i].taxes}</td>
        <td>${products[i].ads}</td>
        <td>${products[i].discount}</td>
        <td>${products[i].total}</td>
        <td>${products[i].category}</td>
        <td><button class="update" onclick="update(${i})">update</button></td>
        <td><button class="delete" onclick="Delete(${i})">delete</button></td>
        </tr>
        `;
    };
    data.innerHTML = DataTable;
    let DeleteAll = document.getElementById("deleteAll");
    if (products.length > 0) {
        DeleteAll.innerHTML = `
        <button onclick= "DeleteAll()">Delete All (${products.length}) </button>
        `
    }
    else {
        DeleteAll.innerHTML = ``;
    }
    
}
read();
/////////////// to update product (U)

function update(i) {
    title.value = products[i].title;
    price.value = products[i].price;
    taxes.value = products[i].taxes;
    ads.value = products[i].ads;
    discount.value = products[i].discount;
    getPrice();
    count.style.display = "none";
    category.value = products[i].category;
    create.value = "Update";
    mood = "update";
    index = i;
    getPrice();
    scroll ({
        top: 0,
        behavior:"smooth"
    })
}


//////////////////////////////////// to delete (D)
// to delete one product
function Delete (i) {
    products.splice(i, 1);
    localStorage.products = JSON.stringify(products)
    read();
}
// to delete all products
 function DeleteAll() {
     localStorage.clear();
     products.splice(0);
     read();
}

////////////////////////////////// function to search  (S)

let searchMood = "title";
function SearchType(id) {
    if (id === "searchByTitle") {
        searchMood = "title"
        search.placeholder = "Search By Title"
    }
    else {
        searchMood = "category"
        search.placeholder = "Search By Category"
    }
    search.focus();
    search.value = "";
    read();
}

function Search(value) {
    let DataTable = "";
    if (searchMood == "title") {
        for (let i = 0; i < products.length; i++) {
            if (products[i].title.includes(value.toLowerCase())) {
        DataTable += `
        <tr>
        <td>${i+1}</td>
        <td>${products[i].title}</td>
        <td>${products[i].price}</td>
        <td>${products[i].taxes}</td>
        <td>${products[i].ads}</td>
        <td>${products[i].discount}</td>
        <td>${products[i].total}</td>
        <td>${products[i].category}</td>
        <td><button class="update" onclick="update(${i})">update</button></td>
        <td><button class="delete" onclick="Delete(${i})">delete</button></td>
        </tr>
        `;
        }
    }
    }
    else {
        for (let i = 0; i < products.length; i++) {
            if (products[i].category.includes(value.toLowerCase())) {
        DataTable += `
        <tr>
        <td>${i+1}</td>
        <td>${products[i].title}</td>
        <td>${products[i].price}</td>
        <td>${products[i].taxes}</td>
        <td>${products[i].ads}</td>
        <td>${products[i].discount}</td>
        <td>${products[i].total}</td>
        <td>${products[i].category}</td>
        <td><button class="update" onclick="update(${i})">update</button></td>
        <td><button class="delete" onclick="Delete(${i})">delete</button></td>
        </tr>
        `;
        }
    }

    }
   data.innerHTML = DataTable;
}