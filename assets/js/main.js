// Html elements 
var nameInput = document.getElementById("name");
var CategoryInput = document.getElementById("Category");
var priceInput = document.getElementById("price");
var descriptionInput = document.getElementById("description");
var imageInput = document.getElementById("imageInput");
var productContainer = document.getElementById("productContainer");
var searchInput = document.getElementById("searchInput");
var addBtn = document.getElementById('addBtn');
var updateBtn = document.getElementById('updateBtn');
// App variables
var num;
var nameRegex = /^[A-Z][a-z]{3,}/;
var priceRegex = /^([1-9]|[1-9][0-9]|100)$/;
var descriptionRegex = /^[a-z\s]{25,100}$/;
var categoryRegex = /^[A-Z][a-z]{3,}$/;
var productList = []
if (localStorage.getItem("products") !== null) {
    productList = JSON.parse(localStorage.getItem("products"));
    displayAllProducts();
}
// functions 
function addProduct() {
    if (validate(nameRegex, nameInput) &&
        validate(priceRegex, priceInput) &&
        validate(descriptionRegex, descriptionInput) &&
        validate(categoryRegex, CategoryInput)) {
        var products = {
            name: nameInput.value,
            category: CategoryInput.value,
            price: priceInput.value,
            description: descriptionInput.value,
            imagepath: "./assets/imgs/" + imageInput.files[0].name,
        }
        productList.push(products);
        localStorage.setItem("products", JSON.stringify(productList));
        displayProduct(productList.length - 1);
        clearInput();
    }
}

function displayProduct(index) {
    var productHtml = `
    
    <div class="col-sm-6 col-md-4 col-lg-3">
    <div class="inner shadow mt-3">
        <img src="${productList[index].imagepath}" class="w-100 " alt="">
        <div class="d-flex justify-content-between mt-3">
            <h1 class="h5"> ${productList[index].name} </h1>
            <span>${productList[index].price}$</span>
        </div>
        <div class="d-flex gap-2">
            <i class="fa-solid fa-tag"></i>
            <h3 class="h6">${productList[index].category}</h3>
        </div>
        <p class="text-secondary">${productList[index].description}.</p>
        <button class="btn btn-outline-danger" onclick="getData(${index})">Update</button>
        <button class="btn btn-outline-secondary" onclick="deleteProduct(${index})" >Delete</button>
    </div>
</div>
    `
    productContainer.innerHTML += productHtml;

}

function displayAllProducts() {
    for (var i = 0; i < productList.length; i++) {
        displayProduct(i);
    }
}

function clearInput() {
    nameInput.value = "";
    CategoryInput.value = "";
    priceInput.value = "";
    descriptionInput.value = "";
    imageInput.value = null;
    nameInput.classList.remove("is-valid");
    CategoryInput.classList.remove("is-valid");
    priceInput.classList.remove("is-valid");
    descriptionInput.classList.remove("is-valid");
}

function deleteProduct(index) {
    productList.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(productList));
    productContainer.innerHTML = ""
    displayAllProducts();
}

function searchProduct() {
    productContainer.innerHTML = ""
    var term = searchInput.value
    for (var i = 0; i < productList.length; i++) {
        if (productList[i].name.toLowerCase().includes(term.toLowerCase())) {
            displayProduct(i);
        }
    }
}


function validate(regex, element) {
    if (regex.test(element.value)) {
        element.classList.add("is-valid")
        element.classList.remove("is-invalid");
        element.nextElementSibling.nextElementSibling.classList.add("d-none");
        return true
    }
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    element.nextElementSibling.nextElementSibling.classList.remove("d-none");
    return false;

}


function getData(i) {
    num = i;
    nameInput.value = productList[i].name;
    CategoryInput.value = productList[i].category;
    priceInput.value = productList[i].price;
    descriptionInput.value = productList[i].description;
    addBtn.classList.add("d-none");
    updateBtn.classList.remove("d-none");

}

function updateData(num) {
    if (validate(nameRegex, nameInput) &&
        validate(priceRegex, priceInput) &&
        validate(descriptionRegex, descriptionInput) &&
        validate(categoryRegex, CategoryInput))
     {
        if ( imageInput.files.length > 0 )
            {
                productList[num].imagepath = "./assets/imgs/" + imageInput.files[0].name;
            }
        productList[num].name = nameInput.value;
        productList[num].category = CategoryInput.value;
        productList[num].price = priceInput.value;
        productList[num].description = descriptionInput.value;
        localStorage.setItem("products", JSON.stringify(productList));
        productContainer.innerHTML = "";
        displayAllProducts();
        clearInput();
        addBtn.classList.remove("d-none");
        updateBtn.classList.add("d-none");
    }

}



