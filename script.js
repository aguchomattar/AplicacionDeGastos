let form = document.getElementById("transactionForm");
form.addEventListener("submit", (e) => {
    e.preventDefault();

    let transactionFormData = new FormData(form);
    let transactionObj = converFormData(transactionFormData);
    saveTransactionObj(transactionObj)
    inserRowData(transactionObj)
    form.reset()

})

document.addEventListener("DOMContentLoaded", (e) => {
    e.preventDefault();
    let transactionObjArr = JSON.parse(localStorage.getItem("transactionData"))
    transactionObjArr.forEach(arrayElement => {
        inserRowData(arrayElement)
    })
})

function inserRowData(transactionObj) {
    let transactionTableRef = document.getElementById("transactionTable");

    let newTransactionRow = transactionTableRef.insertRow(-1);
    newTransactionRow.setAttribute("data-transaction-id", transactionObj["transactionId"])

    let newTransactionCell = newTransactionRow.insertCell(0);
    newTransactionCell.textContent = transactionObj["transactionType"]

    newTransactionCell = newTransactionRow.insertCell(1);
    newTransactionCell.textContent = transactionObj["transactionDescription"]

    newTransactionCell = newTransactionRow.insertCell(2);
    newTransactionCell.textContent = transactionObj["transactionAmount"]

    newTransactionCell = newTransactionRow.insertCell(3);
    newTransactionCell.textContent = transactionObj["transactionCategory"]

    let newDeleteCell = newTransactionRow.insertCell(4);
    let deleteButton = document.createElement("button")
    deleteButton.textContent = "Eliminar"
    newDeleteCell.appendChild(deleteButton);

    deleteButton.addEventListener("click", (e) => {
        let transactionRow = e.target.parentNode.parentNode;
        let transactionId = transactionRow.getAttribute("data-transaction-id");

        transactionRow.remove();
        deleteTransactionObj(transactionId);
    })
}

function getNewTransactionId() {
    let lasTransactionId = localStorage.getItem("lastTransactionId") || "-1";
    let newTransactionId = JSON.parse(lasTransactionId) + 1;
    localStorage.setItem("lastTransactionId", JSON.stringify(newTransactionId))
    return newTransactionId;
}

function converFormData(transactionFormData) {
    let transactionType = transactionFormData.get("transactionType")
    let transactionDescription = transactionFormData.get("transactionDescription")
    let transactionAmount = transactionFormData.get("transactionAmount")
    let transactionCategory = transactionFormData.get("transactionCategory")
    let transactionId = getNewTransactionId();

    return {
        "transactionType": transactionType,
        "transactionDescription": transactionDescription,
        "transactionAmount": transactionAmount,
        "transactionCategory": transactionCategory,
        "transactionId": transactionId
    }
}

function saveTransactionObj(transactionObj) {
    let myTransactionArray = JSON.parse(localStorage.getItem("transactionData")) || [];
    myTransactionArray.push(transactionObj)
    let transactionArrayJSON = JSON.stringify(myTransactionArray);
    localStorage.setItem("transactionData", transactionArrayJSON)
}

function deleteTransactionObj(transactionId) {
    let transactionObjArr = JSON.parse(localStorage.getItem("transactionData"))
    let transactionIndexInArray = transactionObjArr.findIndex(element => element.transactionId === transactionId)
    transactionObjArr.splice(transactionIndexInArray, 1);
    let transactionArrayJSON = JSON.stringify(transactionObjArr);
    localStorage.setItem("transactionData", transactionArrayJSON)
}