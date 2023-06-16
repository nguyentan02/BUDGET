let container = document.querySelector('.container')
let balance = document.querySelector('.balance')
let progress = document.querySelector('.progress')
let addIncome = document.querySelector('.addIncome')
let addExpense = document.querySelector('.addExpense')
let productInter = document.querySelector('.productInter')
let ammountInter = document.querySelector('.ammountInter')
let addProduct = document.querySelector('.addProduct')
let updateProduct = document.querySelector('.updateProduct')
let addAmmount = document.querySelector('.addAmmount')
let updateAmmount = document.querySelector('.updateAmmount')
let translist = document.querySelector('.translist')


updataBalance();
displayItems();
function hideElement() {
    addExpense.classList.add("hide");
    addIncome.classList.add("hide");
    translist.classList.add("hide");
    balance.classList.add("hide");
    progress.classList.add("hide");
    updateProduct.classList.add("hide");
    updateAmmount.classList.add("hide");
}

function showElements() {
    addExpense.classList.remove("hide");
    addIncome.classList.remove("hide");
    translist.classList.remove("hide");
    balance.classList.remove("hide");
    progress.classList.remove("hide");
}

function showProduct() {
    hideElement();
    productInter.classList.remove("hide");
    addProduct.classList.remove("hide");
    container.style.flexDirection = "row";
}
function showAmmount() {
    hideElement();
    ammountInter.classList.remove("hide");
    addAmmount.classList.remove("hide");
    container.style.flexDirection = "row";
}

//Close interface
function closeInterface() {
    showElements();
    productInter.classList.add("hide");
    ammountInter.classList.add("hide");
    container.style.flexDirection = "column";
}


let productName = document.querySelector('.productName');
let productType = document.querySelector('.productType');
let productCost = document.querySelector('.productCost');
let incomeName = document.querySelector('.incomeName')
let incomeType = document.querySelector('.incomeType');
let incomeAmmount = document.querySelector('.incomeAmmount');
let snackBar = document.querySelector('.snackBar');
let date = new Date();

// Clear all input fields

function clearInputs() {
    productName.value = "";
    productType.value = "";
    productCost.value = "";
    incomeName.value = "";
    incomeType.value = "";
    incomeAmmount.value = "";
}
//show pop up error

function showError() {
    snackBar.classList.add("show");
    setTimeout(() => {
        snackBar.classList.remove("show")
    }, 3000);
}
showError();

// check input product

function checkInputProduct() {
    let productInput = false;
    if (productName.value.trim() != 0 && productType.value.trim() != 0 &&
        productCost.value.trim() != 0) {
        productInput = true;
    } else {
        productInput = false;
    }
    return productInput;
}
//check amount input

function checkInputAmmount() {
    let ammountInput = false;
    if (incomeName.value.trim() != 0 && incomeType.value.trim() != 0 &&
        incomeAmmount.value.trim() != 0) {
        ammountInput = true;
    } else {
        ammountInput = false;
    }
    return ammountInput;
}


//create product object

function createProduct() {
    product = {
        obj: "product",
        name: productName.value,
        pType: productType.value,
        cost: productCost.value,
        time: date.toLocaleDateString()
    }
    return product;
}
//create ammount object

function createAmmount() {
    ammount = {
        obj: "ammount",
        name: incomeName.value,
        iType: incomeType.value,
        ammount: incomeAmmount.value,
        time: date.toLocaleDateString()
    }
    return ammount;
}
//Update Web
function updateApp() {
    clearInputs();
    closeInterface();
    updataBalance();
    displayItems();
    // setTimeout(location.reload(), 2000);

}

// Get item local storage

function getStorage() {
    let taksObj;
    let webTasks = localStorage.getItem("localTasks");
    if (webTasks == null) {
        taksObj = [];
    } else {
        taksObj = JSON.parse(webTasks);
    }
    return taksObj;
}

//set items in local 
function setStorage(data) {
    localStorage.setItem("localTasks", JSON.stringify(data));

}

//Add product 
function addProducts() {
    let taksObj = getStorage();
    let checkProduct = checkInputProduct();
    if (checkProduct === true) {
        let product = createProduct();
        taksObj.unshift(product);
        setStorage(taksObj);
        updateApp();
    } else {
        showError();
    }
}

//Add ammount 
function addAmmounts() {
    let taksObj = getStorage();
    let checkAmmount = checkInputAmmount();
    if (checkAmmount === true) {
        let ammount = createAmmount();
        taksObj.unshift(ammount);
        setStorage(taksObj);
        updateApp();
    } else {
        showError();
    }

}

// display items

function displayItems() {
    let taksObj = getStorage();
    let translist = document.querySelector(".translist");
    let html = "";
    taksObj.forEach((item, index) => {
        html += `<div class="trans">
        <div class="item">
            <div class="iconDetails">
                <ion-icon style="${item.obj == "product" ?
                "background: var(--dola-color)" : "background:var(--secondary-color)"}" name=${item.obj == "product" ?
                    "cash" : "pricetag"} class="transIcon"></ion-icon>
                <div class="itemDetails">
                    <span class="itemName ">${item.obj == "product" ?
                item.name : item.name} </span>
                    <span class="itemType ">${item.obj == "product" ?
                item.pType : item.pType}</span>
                </div>
            </div>
            <div class="iconDetails itemDate">
                <span style="${item.obj == "product" ?
                "color:green" : "color:red"}" class="itemPrice">${item.obj == "product" ?
                    "$" + item.cost : "$" + item.ammount} </span>
                <span class="itemTime">${item.time}</span>
            </div>
        </div>
        <div class="actions">
            <button onclick="showEdit(${index})" class="edit">
                <ion-icon name="create-outline" class="actionIcon"></ion-icon>
                <span class="editTitle">Edit</span>
            </button>
            <button onclick="showDelete(${index})" class="delete">
                <ion-icon name="trash-outline"></ion-icon>
                <span class="deleteTitle">Delete</span>
            </button>
        </div>
    </div> `
    });
    if (taksObj.length != 0) {
        translist.innerHTML = html;
    } else {
        translist.innerHTML = `<span class="noTask">Không có giao dịch để hiển thị!</span>`
    }
}

//Filter income object
function filterIncome() {
    let taksObj = getStorage();
    let income = taksObj.filter((item) => {
        return item.obj === "product"
    });
    return income;
}
//Filter expense object
function filterExpense() {
    let taksObj = getStorage();
    let expense = taksObj.filter((item) => {
        return item.obj === "ammount"
    });
    return expense;
}

function sumExpense() {
    let income = filterExpense();
    let totalExpense = income.map(cash => cash.ammount).reduce((total, cash) =>
        Number(cash) + Number(total), 0);
    return totalExpense;
}

function sumIncome() {
    let income = filterIncome();
    let totalIncome = income.map(spent => spent.cost).reduce((total, spent) =>
        Number(spent) + Number(total), 0);
    return totalIncome;

}

//Get balance

function getBalance() {
    let totalIncome = sumIncome();
    let totalExpense = sumExpense();
    let totalBalance = totalIncome - totalExpense;
    return totalBalance;
}

//
function updataBalance() {
    let totalIncome = sumIncome();
    let totalExpense = sumExpense();
    let totalBalance = getBalance();
    let incomeValue = document.querySelector(".incomeValue");
    let expenseValue = document.querySelector(".expenseValue");
    let totalBalVal = document.querySelector(".totalBalVal");

    incomeValue.textContent = "$" + totalIncome + ".00";
    expenseValue.textContent = "$" + totalExpense + ".00";
    totalBalVal.textContent = "$" + totalBalance + ".00";
    //set progress

    let progress = document.querySelector(".progress")

    progress.max = totalIncome;
    progress.value = totalExpense;
}

// Delete interface

let deleteInterface = document.querySelector(".deleteInter");
let warningMessage = document.querySelector(".warningMessage");
let deleteIndex = 0;

function showDelete(index) {
    deleteIndex = index;
    let taksObj = getStorage();
    hideElement();
    container.style.flexDirection = "row";
    deleteInterface.style.display = "flex"

    if (taksObj[index].obj === "product") {
        itemName = taksObj[index].name;
    } else {
        itemName = taksObj[index].name;
    }
    warningMessage.innerHTML = `Are you sure you want to permanently delete this <span style="font-weight:bold">${itemName}
      </span>?`
}


//hide delete
function hideDelete() {
    showElements();
    container.style.flexDirection = "column";
    deleteInterface.style.display = "none"
}

//delete 

function deletetrans() {
    let taksObj = getStorage();
    taksObj.splice(deleteIndex, 1);
    setStorage(taksObj);
    hideDelete();
    updateApp();
}

//edit

let editIndex = 0;


function showEdit(index) {
    editIndex = index;
    let taksObj = getStorage();
    hideElement();
    container.style.flexDirection = "row";
    if (taksObj[index].obj === "product") {
        productInter.classList.remove("hide");
        productName.value = taksObj[index].name;
        productType.value = taksObj[index].ptype;
        productCost.value = taksObj[index].cost;
        addProduct.classList.add("hide");
        updateProduct.classList.remove("hide")
    } else {
        ammountInter.classList.remove("hide");
        incomeName.value = taksObj[index].name;
        incomeType.value = taksObj[index].itype;
        incomeAmmount.value = taksObj[index].cost;
        addAmmount.classList.add("hide");
        updateAmmount.classList.remove("hide")
    }
}