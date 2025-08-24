//Initial References
const newTaskInput = document.querySelector("#new-task input");
const tasksDiv = document.querySelector("#tasks");
let deleteTasks, editTasks, tasks;
let updateNote = "";
let count;

//Function on window load
window.onload = () => {
  updateNote = "";
  count = Object.keys(localStorage).length;
  displayTasks();
};

//Function to Display The Tasks
const displayTasks = () => {
  if (Object.keys(localStorage).length > 0) {
    tasksDiv.style.display = "inline-block";
  } else {
    tasksDiv.style.display = "none";
  }

  // Clear the tasks
  tasksDiv.innerHTML = "";

  // Fetch all the keys in local storage
  let tasks = Object.keys(localStorage);
  tasks = tasks.sort();

  for (let key of tasks) {
    let value = localStorage.getItem(key);
    let taskInnerDiv = document.createElement("div");
    taskInnerDiv.classList.add("task");
    taskInnerDiv.setAttribute("id", key);
    taskInnerDiv.innerHTML = `<span id="taskname">${key.split("_")[1]}</span>`;

    // DELETE BUTTON
    let deleteButton = document.createElement("button");
    deleteButton.classList.add("delete");
    deleteButton.innerHTML = `<i class="fa-solid fa-trash"></i>`;
    deleteButton.addEventListener("click", (e) => {
      e.stopPropagation();
      const parent = e.target.closest(".task");
      removeTask(parent.id);
      parent.remove();
      count -= 1;
    });

    taskInnerDiv.appendChild(deleteButton);
    tasksDiv.appendChild(taskInnerDiv);
  }

  // Mark tasks as completed on click
  tasks = document.querySelectorAll(".task");
  tasks.forEach((element, index) => {
    element.onclick = () => {
      if (element.classList.contains("completed")) {
        updateStorage(element.id.split("_")[0], element.innerText, false);
      } else {
        updateStorage(element.id.split("_")[0], element.innerText, true);
      }
    };
  });
};


//Disable Edit Button
const disableButtons = (bool) => {
  let editButtons = document.getElementsByClassName("edit");
  Array.from(editButtons).forEach((element) => {
    element.disabled = bool;
  });
};

//Remove Task from local storage
const removeTask = (taskValue) => {
  console.log(taskValue);
  localStorage.removeItem(taskValue);
  displayTasks();
};

//Add tasks to local storage
const updateStorage = (index, taskValue, completed) => {
  localStorage.setItem(`${index}_${taskValue}`, completed);
  displayTasks();
};

// delete
const deleteTask = (e) => {
  e.stopPropagation();
  const parent = e.target.closest(".task");
  removeTask(parent.id);
  parent.remove();
  count -= 1;
};

//Function To Add New Task
document.querySelector("#push").addEventListener("click", () => {
  //Enable the edit button
  disableButtons(false);
  if (newTaskInput.value.length == 0) {
    alert("Please Enter A Task");
  } else {
    //Store locally and display from local storage
    if (updateNote == "") {
      //new task
      updateStorage(count, newTaskInput.value, false);
    } else {
      //update task
      let existingCount = updateNote.split("_")[0];
      removeTask(updateNote);
      updateStorage(existingCount, newTaskInput.value, false);
      updateNote = "";
    }
    count += 1;
    newTaskInput.value = "";
  }

});