// Task areas for displaying
const tasksAreaCategory = document.querySelector("#tasks-area__category");
const tasksAreaDiv = document.querySelector("#tasks-area__div");
const taskAreaCreate = document.querySelector("#task-area__create");

// GLOBAL VARIABLES
let COUNTERTASK = 0;
const STATUS = ["sin iniciar", "en curso", "terminado"];
const CATEGORIES = {
  all: [],
  categorieA: [],
  categorieB: [],
  categorieC: [],
};
let CURRENT_CATEGORY = "all";

// Function for input changes
function handleChange(e, id) {
  // Get input content
  const inputContent = e.value;

  // Set input content to label
  e.parentNode.getElementsByTagName("label")[0].textContent = inputContent;

  // Hide input
  e.parentNode.classList.remove("task-feature__editing");
  e.parentNode.classList.add("task-feature");
}

// Function for status
function handleChangeStatus(e, id) {
  console.log(e.value, id);
}

// Function to hide label and show input
function handleDbClick(e) {
  // Get label content
  const labelContent = e.textContent;

  // Hide label
  e.parentNode.classList.remove("task-feature");
  e.parentNode.classList.add("task-feature__editing");

  // Show input and set label content
  e.parentNode.getElementsByTagName("input")[0].value = labelContent;
}

// Function to change current category
function handleChangeCategory(e) {
  // Clear tasks
  tasksAreaDiv.innerHTML = "";

  // Get current category
  CURRENT_CATEGORY = e.textContent;

  if (CURRENT_CATEGORY == "all") {
    for (const cat in CATEGORIES) {
      for (const t of CATEGORIES[cat]) {
        tasksAreaDiv.innerHTML += t.Create();
      }
    }
    return;
  }

  // Render task for specific category
  for (const t of CATEGORIES[CURRENT_CATEGORY]) {
    tasksAreaDiv.innerHTML += t.Create();
  }
}

function getFullYearFormat(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}

// Task Class
class Task {
  id;
  title;
  description;
  date;
  status;
  constructor(parameters) {
    this.id = parameters.id;
    this.title = parameters.title;
    this.description = parameters.description;
    this.date = parameters.date;
    this.status = parameters.status;
  }

  Create() {
    return `
    <div id="task-${this.id}" class="task box">
      <div class="task-feature">
        <h3>Title:</h3>
        <label ondblclick='handleDbClick(this)'>${this.title} ${this.id}</label>
        <input type="text" value="${this.title}" onchange='handleChange(this, ${
      this.id
    })'/>
      </div>

      <div class="task-feature">
        <h3>Description:</h3>
        <label ondblclick='handleDbClick(this)'>${this.description}</label>
        <input type="text" value="${
          this.description
        }" onchange='handleChange(this, ${this.id})'/>
      </div>
      
      <div class="task-feature">
        <h3>Date:</h3>
        <label ondblclick='handleDbClick(this)'>${this.date}</label>
        <input type="date" value="${this.date}" onchange='handleChange(this, ${
      this.id
    })'/>
      </div>

      <div class="task-feature">
        <h3>Status:</h3>
        <!-- <label ondblclick='handleDbClick(this)'>${
          STATUS[this.status]
        }</label> -->
        <select name="" id="" onchange='handleChangeStatus(this, ${this.id})'>
          <option value="${STATUS[0]}" selected>${STATUS[0]}</option>
          <option value="${STATUS[1]}">${STATUS[1]}</option>
          <option value="${STATUS[2]}">${STATUS[2]}</option>
        </select>
      </div>

      <button class="task-close" onclick="{
        // Remove child
        this.parentNode.remove()
      }">X</button>
    </div>
  `;
  }
}

// Events
taskAreaCreate.addEventListener("click", (e) => {
  // Verify if current category is general
  if (CURRENT_CATEGORY == "all") {
    alert("Debe seleccionar una categoria");
    return;
  }

  // New task
  const newTask = new Task({
    id: COUNTERTASK,
    title: "Task",
    description: "Not description",
    date: getFullYearFormat(new Date()),
    status: 0,
  });

  // Add task to div
  tasksAreaDiv.innerHTML += newTask.Create();

  // Add task to category lista
  CATEGORIES[CURRENT_CATEGORY].push(newTask);

  // Up counter
  COUNTERTASK++;
});

window.addEventListener("DOMContentLoaded", (e) => {
  // Add categories
  for (const cat in CATEGORIES) {
    tasksAreaCategory.innerHTML += `<button onclick='handleChangeCategory(this)'>${cat}</button>`;
  }
});
