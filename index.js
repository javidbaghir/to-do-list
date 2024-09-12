const taskTitleInput = document.getElementById("task-title-input");
const addTaskBtn = document.getElementById("add-task-btn");
const showtasks = document.getElementById("show-tasks");
const filterBtn = document.querySelector(".filter-btn");


const tasks = [
    { name: "task", status: "complated" }
];

let editIndex = ''

returnTasks();


function deleteTask (index) {
    tasks.splice(index, 1)
};

function createUI(index) {

    const task = tasks[index]
  
  return `<div class="py-[15px] px-[10px] flex justify-between border mt-[13px]">
  <label class="flex gap-[10px] items-center justify-center ${task.status == "complated" ? 'line-through' : ''}">
    <input onchange = "changeStatus(${index}, event)" type="checkbox"  ${task.status == "complated" ? 'checked' : ''} />
    <span>${task.name}</span>
  </label>
  
  <div class="flex items-center justify-center gap-[8px]">
    <button onclick="editTask(${index})"
      class="p-[5px] bg-blue-500 text-white size-[20px] text-[10px] flex items-center justify-center rounded-[5px]"
    >
      <i class="fa-solid fa-pen"></i>
    </button>
    <button onclick = deleteTask(${index})
      class="p-[5px] bg-red-500 text-white size-[20px] text-[10px] flex items-center justify-center rounded-[5px]"
    >
      <i class="fa-solid fa-trash-can"></i>
    </button>
  </div>
  </div>`

}

function changeStatus(index, e) {
   tasks[index].status = e.target.checked ? "complated" : "pending"

   returnTasks()   
}

function editTask (index) {

    const value = tasks[index]

    taskTitleInput.value = value.name

    editIndex = index
    
}

function deleteTask (index) {

    tasks.splice(index, 1)

    returnTasks();
}


function returnTasks (status = 'all') {
    showtasks.innerHTML = ''

    for (let index in tasks) {

        if (status !== 'all') {
            const filter = status === 'completed' ? "completed" : ""
            const task = tasks[index]

            if (task.status === filter) {
                showtasks.innerHTML += createUI(index)
            }
        } else {
            showtasks.innerHTML += createUI(index)
        }

    }
}

addTaskBtn.addEventListener("click", function () {
    const value = taskTitleInput.value.trim();
  
    taskTitleInput.value = ''
    taskTitleInput.focus()
  
    if (value != "") {
        
        if(editIndex.toString()) {
            tasks[editIndex].name = value
            editIndex = ''

        } else {
            const item = { name: value, status: "pending" };
  
            tasks.unshift(item);
        }
  
    } else {
      alert("Input bosdur");
    }

    returnTasks();
  });


  filterBtn.addEventListener("click", function(e) {
    if (e.target.tagName === 'BUTTON') { 
        
        returnTasks(e.target.dataset.status)
        
    }

    // console.log(e.target.dataset.status);
    
})



