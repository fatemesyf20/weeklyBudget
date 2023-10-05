//class
class Budget {
  constructor(budget) {
    this.budget = budget;
    this.budgetLeft = this.budget;
  }
  subtractFromBudget(amount) {
    return (this.budgetLeft -= amount);
  }
}

//every thing realated to the hrml

class HTMLUI {
  //insert user budget to the html
  insertBudget(amount) {
    //insert userbudget to budget total
    budgetTotal.innerHTML = amount;
    //insert userbudget to budget left
    budgetLeft.innerHTML = amount;
  }
  //print alert to add expense
  printMassage(massage, className) {
    //create new element for display alert
    const div = document.createElement("div");
    //add classes for display
    div.classList.add("alert", className);
    //access to parent element of add expense
    const primary = document.querySelector(".primary");
    //add massage to alert
    div.innerText = massage;
    //insert alert to form
    primary.insertBefore(div, addExpense);
    //set time out for alert
    setTimeout(() => {
      //remove alert after 3sec
      div.remove();
    }, 2500);
  }
  //display expenses and amounts to the list
  insertExpense(expense, amount) {
    //create list for display expenses
    let li = document.createElement("li");
    li.classList.add(
      "list-group-item",
      "d-flex",
      "justify-content-between",
      "align-item-center"
    );
    //add tag li to html
    li.innerHTML = `
      ${expense}
      <span class="badge badge-primary badge-pill d-flex justify-content-between align-items-center">${amount}</span>
      `;
    expenses.appendChild(li);
  }
  //track budget from total budget
  trackBudget(amount) {
    //subtract from budget
    const budgetLeftTomans = budget.subtractFromBudget(amount);
    //check number under zero
    if (budgetLeftTomans < 0) {
      html.printMassage("بودجه شما تمام شده است", "alert-danger");
      addExpense.reset();
    } else if (budgetLeftTomans >= 0) {
      //display sutracked budget
      budgetLeft.innerHTML = `${budgetLeftTomans}`;
      //color of box budget left
      if (budget.budget / 4 > budgetLeftTomans) {
        console.log("right");
        budgetLeft.parentElement.parentElement.classList.remove(
          "alert-success",
          "alert-warning"
        );
        budgetLeft.parentElement.parentElement.classList.add("alert-danger");
      } else if (budget.budget / 2 > budgetLeftTomans) {
        budgetLeft.parentElement.parentElement.classList.remove(
          "alert-success"
        );
        budgetLeft.parentElement.parentElement.classList.add("alert-warning");
      }
    }
  }
}

// variable

let userBudget;
let budget;
let expenses = document.querySelector("#expenses ul");
let budgetTotal = document.querySelector("span#total");
let budgetLeft = document.querySelector("span#left");
const addExpense = document.querySelector("#add-expense");

const html = new HTMLUI();

//event listeners
eventListeners();
function eventListeners() {
  //take a alert for getting user budget
  document.addEventListener("DOMContentLoaded", function () {
    userBudget = prompt("لطفا بودجه اولیه را وارد کنید");
    //validate user budget
    if (userBudget === null || userBudget === "" || userBudget === "0") {
      //page loaded
      window.location.reload();
    } else {
      //instanciate budget
      budget = new Budget(userBudget);
      html.insertBudget(budget.budget);
    }
  });
  //get vaalue from the form when submited
  addExpense.addEventListener("submit", function (e) {
    e.preventDefault();
    //access to the value of expense & amount
    const expense = document.querySelector("#expense").value;
    const amount = document.querySelector("#amount").value;
    if (expense === "" || amount === "") {
      //if any field is empty do this
      html.printMassage("لطفا همه ی موارد را وارد کنید", "alert-danger");
    } else {
      //insert expenses to the list
      html.insertExpense(expense, amount);
      //track expense from total budget
      html.trackBudget(amount);
      //fields be clear
      addExpense.reset();
    }
  });
}
