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
const translist = document.querySelector('.translist')


dateSort.addEventListener('change', function () {
    const bal = document.querySelector('.balance');
    bal.classList.remove("hide");
    translist.classList.remove("hide");
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
                    item.ammount + " VND" : item.ammount + " VND"}  </span>
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
// displayItems(taksObj);

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
// array  income
// const sumIncomeChart = [];
// for (let i = 0; i < elementArrayIn.length; ++i) {
//     sumIncomeChart.push(parseInt(elementArrayIn[i].ammount));
// }
// function sumArray(array) {
//     return array.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
// }
// // array income chart
// newArrayIncome.push(sumArray(sumIncomeChart))
//filter expense
function filterExpense() {
    let taksObj = getStorage();
    let expense = taksObj.filter((item) => {
        return item.obj === "ammount"
    });
    return expense;
}
const elementArrayEx = filterExpense();
// const newArrayEx = [];
// const sumExChart = [];
// for (let i = 0; i < elementArrayEx.length; ++i) {
//     sumExChart.push(parseInt(elementArrayEx[i].ammount));
// }
// newArrayEx.push(sumArray(sumExChart))

const convertData = new Map()
const income = filterIncome();
const expense = filterExpense()

function aggregateData1(income) {
    const result = {};

    income.forEach(entry => {
        const { name, ammount } = entry;
        if (!result[name]) {
            result[name] = 0;
        }
        result[name] += parseInt(ammount, 10);
    });

    return Object.entries(result).map(([name, ammount]) => ({ name, ammount }));
}
const dataChart = aggregateData1(income);
const dataEx = aggregateData1(expense)
// console.log(dataChart);
const filterData = document.getElementById('select');

function aggregateData3(income, expense) {
    const result = {};

    // Aggregate income data
    income.forEach(entry => {
        const { time, ammount } = entry;
        const month = time.slice(0, 7); // Extract the month from the time value

        if (!result[month]) {
            result[month] = { income: 0, expense: 0 };
        }
        result[month].income += parseInt(ammount, 10);
    });

    // Aggregate expense data
    expense.forEach(entry => {
        const { time, ammount } = entry;
        const month = time.slice(0, 7); // Extract the month from the time value

        if (!result[month]) {
            result[month] = { income: 0, expense: 0 };
        }
        result[month].expense += parseInt(ammount, 10);
    });

    const sortedData = Object.entries(result).map(([month, data]) => ({
        month,
        income: data.income,
        expense: data.expense
    })).sort((a, b) => new Date(a.month) - new Date(b.month));
    return sortedData;
}
function filterDataByMonth(aggregatedData, targetMonth) {
    return aggregatedData.filter(entry => entry.month === targetMonth);
}

const aggregatedData5 = aggregateData3(income, expense);
const targetMonth = '2023-06';
console.log(targetMonth);
const filteredData = filterDataByMonth(aggregatedData5, targetMonth);
console.log(filteredData);
// filterData.addEventListener('change', function () {
//     if (filterData.value === 'Tháng') {
//         const aggregatedData = aggregateData3(income, expense);
//         console.log(aggregatedData);
//     }
//     else {
//         return result = 0
//     }
// })



function aggregateData2(income, expense) {
    const result = {};
    // Aggregate income data
    income.forEach(entry => {
        const { time, ammount } = entry;
        if (!result[time]) {
            result[time] = { income: 0, expense: 0 };
        }
        result[time].income += parseInt(ammount, 10);
    });

    // Aggregate expense data
    expense.forEach(entry => {
        const { time, ammount } = entry;
        if (!result[time]) {
            result[time] = { income: 0, expense: 0 };
        }
        result[time].expense += parseInt(ammount, 10);
    });

    const sortedData = Object.entries(result).map(([time, data]) => ({
        time,
        income: data.income,
        expense: data.expense
    })).sort((a, b) => new Date(a.time) - new Date(b.time));

    return sortedData;
}

const aggregatedData = aggregateData2(income, expense);

const data = {
    labels: aggregatedData.map(e =>
        e.time
    )
    ,
    datasets: [{
        label: 'Income',
        data: aggregatedData.map(e =>
            e.income
        ),
        backgroundColor:
            'blue'
        ,
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
    },
    {
        label: 'Expense',
        data: aggregatedData.map(e =>
            e.expense
        ),
        backgroundColor:
            'red'
        ,
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
    }]
};
const config = {
    type: 'bar',
    data: data,
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    },
};

const data2 = {
    labels:
        // 'Tiền lương',
        // 'Tiền thưởng',
        // 'Bán Hàng',
        // 'Cho thuê',
        // 'Khác',
        dataChart.map(e =>
            e.name
        )
    ,
    datasets: [{
        label: 'Income',
        data: dataChart.map(e =>
            e.ammount
        ),
        backgroundColor: [
            'rgb(115, 230, 0)',
            'rgb(51, 153, 255))',
            'rgb(255, 205, 86)',
            'rgb(0, 0, 255)',
            'rgb(26, 178, 255)',
        ],
        hoverOffset: 3
    }]
};
const config2 = {
    type: 'pie',
    data: data2,
};
//expense
const data3 = {
    labels:
        // 'Ăn uống',
        // 'Quàn Áo',
        // 'Mua Sắm',
        // 'Giao thông',
        // 'Du lịch',
        // 'Khác'
        dataEx.map(e => e.name)
    ,
    datasets: [{
        label: 'Expense',
        data: dataEx.map(e => e.ammount),
        backgroundColor: [
            '#FF8C00',
            '#8B0000',
            'rgb(255, 255, 0)',
            '#FF0000',
            'rgb(179, 0, 89)',
            '#000033',
        ],
        hoverOffset: 3
    }],

};
const config3 = {
    type: 'pie',
    data: data3,
};

const canvas = document.getElementById('canvas');

const canvas2 = document.getElementById('canvas2');
const canvas3 = document.getElementById('canvas3');

const chart = new Chart(canvas, config);
const chart2 = new Chart(canvas2, config2);
const chart3 = new Chart(canvas3, config3);