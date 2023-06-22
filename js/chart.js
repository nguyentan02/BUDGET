const labels = ['January', 'Februrary', 'March', 'April', 'May', 'June'];

const storedData = localStorage.getItem('localTasks');
const dataJson = JSON.parse(storedData);
const newArrayDate = [];
for (let i = 0; i < dataJson.length; ++i) {
    if (newArrayDate.indexOf(dataJson[i].time) == -1)
        newArrayDate.push(dataJson[i].time);
}


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

//filter date
const dateSort = document.getElementById('inputdate');
const elementArray = getStorage();
let filterDate = [];

dateSort.addEventListener('change', function () {
    const bal = document.querySelector('.balance');
    bal.classList.remove("hide");
    filterDate = [];
    let totalIn = 0;
    let totalEx = 0;
    let totalBalance = 0;
    const selectedDate = new Date(dateSort.value).toLocaleDateString('zh-Hans-CN');
    const dateParts = selectedDate.split("/");
    const year = dateParts[0];
    const month = String(dateParts[1]).padStart(2, "0");
    const day = String(dateParts[2]).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    for (let i = 0; i < elementArray.length; ++i) {
        if (elementArray[i].time === formattedDate)
            filterDate.push(elementArray[i]);
    }
    displayItems(filterDate);
    for (let i = 0; i < elementArrayIn.length; ++i) {
        if (elementArrayIn[i].time === formattedDate)
            totalIn += Number(elementArrayIn[i].ammount)
    }
    for (let i = 0; i < elementArrayEx.length; ++i) {
        if (elementArrayEx[i].time === formattedDate)
            totalEx += Number(elementArrayEx[i].ammount)
    }
    totalBalance = totalIn - totalEx;


    const totalIncomme = document.getElementById('TotalIncomeValue');
    const totalExpenseValue = document.getElementById('TotalExpenseValue');
    const totalBalVal = document.getElementById('totalBalVal');
    totalIncomme.textContent = format2(totalIn, ' vnđ');
    totalExpenseValue.textContent = format2(totalEx, ' vnđ');
    totalBalVal.textContent = format2(totalBalance, ' vnđ');

});



let taksObj = getStorage();
function displayItems(taksObj) {
    let translist = document.querySelector(".translist");
    translist.innerHTML = "";
    let html = "";
    let total = "";
    taksObj.forEach((item, index) => {
        html += `<div class="trans">
        <div class="item">
            <div class="iconDetails">
                <ion-icon style="${item.obj == "income" ?
                "background: var(--dola-color)" : "background:var(--card-color)"}" name=${item.obj == "income" ?
                    "cash" : "card"} class="transIcon"></ion-icon>
                <div class="itemDetails">
                    <span class="itemName ">${item.obj == "income" ?
                item.name : item.name} </span>
                    <span class="itemType ">${item.obj == "income" ?
                item.pType : item.pType}</span>
                </div>
            </div>
            <div class="iconDetails itemDate">
                <span style="${item.obj == "income" ?
                "color:green" : "color:red"}" class="itemPrice">${item.obj == "income" ?
                    item.ammount + " vnđ" : item.ammount + " vnđ"}  </span>
                <span class="itemTime">${item.time}</span>
            </div>
        </div>
    </div> `
    });
    if (taksObj.length != 0) {
        translist.innerHTML = html;
    } else {
        translist.innerHTML = `<span class="noTask">No deals to show!</span>`
    }
}
displayItems(taksObj);

function sumExpense() {
    let income = filterExpense();

    let totalExpense = income.map(cash => cash.ammount).reduce((total, cash) =>
        Number(cash) + Number(total), 0);
    return totalExpense;
}

// console.log(sumExpense());
function sumIncome() {
    let income = filterIncome();
    let totalIncome = income.map(cash => cash.ammount).reduce((total, cash) =>
        Number(cash) + Number(total), 0);
    return totalIncome;

}

function getBalance() {
    let totalIncome = sumIncome();
    let totalExpense = sumExpense();
    let totalBalance = totalIncome - totalExpense;
    return totalBalance;
}
function format2(n, currency) {
    return n.toFixed(1).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + currency;
}
//filter income
function filterIncome() {
    let taksObj = getStorage();
    let income = taksObj.filter((item) => {
        return item.obj === "income"
    });
    return income;
}
const elementArrayIn = filterIncome();

const newArrayIncome = [];
//array  income
for (let i = 0; i < elementArrayIn.length; ++i) {
    newArrayIncome.push(elementArrayIn[i].ammount);
}

// newArrayIncome.sort(function (a, b) { return a - b });

//filter expense
function filterExpense() {
    let taksObj = getStorage();
    let expense = taksObj.filter((item) => {
        return item.obj === "ammount"
    });
    return expense;
}
const elementArrayEx = filterExpense();
const newArrayEx = [];

for (let i = 0; i < elementArrayEx.length; ++i) {
    newArrayEx.push(elementArrayEx[i].ammount);
}


// newArrayEx.sort(function (a, b) { return a - b });
const data = {
    labels: newArrayDate,
    datasets: [{
        label: 'Income',
        data: newArrayIncome,
        backgroundColor: "blue",
        borderColor: 'blue',
        tension: 0.4,
    },
    {
        label: 'Expense',
        data: newArrayEx,
        backgroundColor: "red",
        borderColor: 'red',
        tension: 0.1,
    }
    ],
}
const config = {
    type: 'line',
    data: data,

};

const canvas = document.getElementById('canvas');

const chart = new Chart(canvas, config)