const planForm = document.querySelector(".js-planForm"),
  planInput = planForm.querySelector("input"),
  planList = document.querySelector(".js-planList");

const PLANS_LS = "plans";

let plans = [];

function deletePlan(event) {
  const btn = event.target;
  const li = btn.parentNode;
  planList.removeChild(li);
  const cleanPlans = plans.filter(function (plan) {
    return plan.id !== parseInt(li.id);
  });
  plans = cleanPlans;
  savePlans();
}

function savePlans() {
  localStorage.setItem(PLANS_LS, JSON.stringify(plans));
}

function addPlan(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = plans.length + 1;
  const space = document.createTextNode(" ");

  $(document).ready(function () {
    if (window.location.href.indexOf("main.html") > -1) {
      delBtn.innerText = "Delete";
    } else {
      delBtn.innerText = "지우기";
    }
  });
  delBtn.addEventListener("click", deletePlan);
  span.innerText = text;

  li.appendChild(span);
  li.appendChild(space);
  li.appendChild(delBtn);
  li.style.paddingTop = "10px";
  li.id = newId;
  planList.appendChild(li);
  const planObj = {
    text: text,
    id: newId,
  };
  plans.push(planObj);
  savePlans();
}

function handleSubmit(event) {
  event.preventDefault();
  const planValue = planInput.value;
  addPlan(planValue);
  planInput.value = "";
}

function loadPlans() {
  const loadedPlans = localStorage.getItem(PLANS_LS);
  if (loadedPlans !== null) {
    const parsedPlans = JSON.parse(loadedPlans);
    parsedPlans.forEach(function (plan) {
      addPlan(plan.text);
    });
  }
}

function init() {
  loadPlans();
  planForm.addEventListener("submit", handleSubmit);
}

init();

$(".carousel").carousel({
  pause: "hover",
});

function toggleDarkMode() {
  var element = document.body;
  element.classList.toggle("darkMode");
}

function setDarkMode() {
  if (localStorage.getItem("darkScreen") === null) {
    localStorage.setItem("darkScreen", toggleDarkMode());
  } else {
    localStorage.clear();
    toggleDarkMode();
  }
}

function checkDarkMode() {
  if ("darkScreen" in localStorage) {
    toggleDarkMode();
  }
}
