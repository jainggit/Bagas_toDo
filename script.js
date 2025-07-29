const inputTask = document.getElementById ("inputTask") ;
const inputPriority = document.getElementById ("inputPriority");
const inputDate = document.getElementById ("inputDate");
const submitTask = document.getElementById ("submitTask");
const deleteTask = document.getElementById ("deleteTask");
const goingList = document.getElementById ("goingList");
const completeList= document.getElementById ("completeList");

submitTask.addEventListener("click", addTask);
deleteTask.addEventListener("click", deleteAll);

function addTask () {
    const task = inputTask.value;
    const priority = inputPriority.value;
    const date = inputDate.value;

    const yourTask = {
        text: task,
        priority: priority,
        date: date,
        done: false
    } 

    if  (!task) {
        alert("Please fill your Task")
        return
    }

    if  (!date) {
        alert("Please fill your Date")
        return
    }

    renderTask (yourTask)
    inputTask.value = ""
    inputTask.focus()
}


function renderTask(newTask) {
    const li = document.createElement("li")
    li.className = "list-group-item p-2 m-2"

    const taskRow = document.createElement("div")
    taskRow.className = "d-flex flex-row mb-2 gap-2"    

    const taskSpan = document.createElement("p")
    taskSpan.textContent = newTask.text
    taskSpan.className = "taskInput"

    const checkbox= document.createElement("input")
    checkbox.type = "checkbox"
    checkbox.className = "form-check-input"
    
    checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
        moveToComplete(li, newTask)
        }
        else {
        moveToGoing(li, newTask)
        }
    })

    const prioritySpan = document.createElement("span")
    prioritySpan.textContent = newTask.priority
    prioritySpan.className = "priority px-1 py-1 rounded"
    
    priorityStyle (newTask, prioritySpan)
    
    taskRow.appendChild(checkbox)
    taskRow.appendChild(taskSpan)

    const dateSpan = document.createElement("div")
    dateSpan.textContent = newTask.date
    dateSpan.className = "date text-body-secondary"

    const bottomRow = document.createElement("div")
    bottomRow.className = "d-grid mt-2 gap-2 d-md-flex justify-content-md-end"

    const deleteButton = document.createElement("button")
    deleteButton.textContent = "DELETE TASK"
    deleteButton.className = "delete btn btn-dark btn-sm"
    deleteButton.addEventListener("click", () => {
        li.remove()
    })

    const editButton = document.createElement("button")
    editButton.textContent = "EDIT TASK"
    editButton.className = "edit btn btn-secondary btn-sm"
    editButton.addEventListener("click", () => {
        editTask(li, newTask)
    })

    bottomRow.appendChild(deleteButton)
    bottomRow.appendChild(editButton)

    li.appendChild(taskRow)
    li.appendChild(prioritySpan)
    li.appendChild(dateSpan)
    li.appendChild(bottomRow)

    goingList.appendChild(li)
}

function priorityStyle (newTask, prioritySpan){
prioritySpan.classList.remove("bg-danger-subtle", "bg-warning-subtle", "bg-success-subtle")
if (newTask.priority === "LOW") {
    prioritySpan.classList.add("bg-success-subtle")
} else if (newTask.priority === "MEDIUM") {
    prioritySpan.classList.add("bg-warning-subtle")
} else if (newTask.priority === "HIGH") {
    prioritySpan.classList.add("bg-danger-subtle")
}}

function moveToComplete (li, newTask) {
    newTask.done = true

    const taskSpan = li.querySelector(".taskInput")
    taskSpan.classList.add("text-decoration-line-through")
    
    const editButton = li.querySelector(".edit")
    if (editButton)
        editButton.classList.add("d-none")

    completeList.appendChild(li)  
    const checkbox = li.querySelector('input[type="checkbox"]')
    checkbox.checked = true  
    }

function moveToGoing (li, newTask) {
    newTask.done = false
    const taskSpan = li.querySelector(".taskInput")
    taskSpan.classList.remove("text-decoration-line-through")
    
    const editButton = li.querySelector(".edit")
    if (editButton)
        editButton.classList.remove("d-none")

    goingList.appendChild(li)   
    const checkbox = li.querySelector('input[type="checkbox"]')
    checkbox.checked = false   
    
}

function deleteAll () {
    goingList.replaceChildren()
    completeList.replaceChildren()
}



function editTask (li, newTask) {
    li.querySelectorAll("div, button, span").forEach((div) => {
        div.classList.add("d-none")
    });

    const editForm = document.createElement("div")
    editForm.className = "d-flex flex-column row-gap-3 container shadow p-3 mb-5 bg-secondary-subtle rounded"

    const textEdit = document.createElement("p")
    textEdit.textContent = "EDIT TASK"
    textEdit.className = "fs-5 text-center"

    const taskInput = document.createElement ("input")
    taskInput.className = "form-control"
    taskInput.type = "text"
    taskInput.value = newTask.text
    

    const editPriority = document.createElement ("select")
    editPriority.className = "form-select";
    ["LOW", "MEDIUM", "HIGH"].forEach((p) => {
    const opt = document.createElement("option")
    opt.value = p
    opt.textContent = p + " PRIORITY"
    if (p === newTask.priority) opt.selected = true
    editPriority.appendChild(opt);
    })

    const editDate = document.createElement ("input")
    editDate.type = "date"
    editDate.value = newTask.date
    editDate.className = "form-control"

    const buttonChange = document.createElement ("button")
    buttonChange.textContent = "CHANGE"
    buttonChange.className = "btn btn-secondary m-3"


    buttonChange.addEventListener("click", () => {
        const changeText = taskInput.value.trim()
        const changePriority = editPriority.value
        const changeDate = editDate.value

        if (!changeText) {
            alert("Please Fill your Change!")
            return
        }

        newTask.text = changeText
        newTask.priority = changePriority
        newTask.date = changeDate
    
        editForm.remove()
        li.querySelectorAll("div, button, span").forEach((div) => {
            div.classList.remove("d-none")
        })

        const dateSpan = li.querySelector(".date")
        if (dateSpan) dateSpan.textContent = newTask.date

        const taskSpan = li.querySelector(".taskInput")
        if (taskSpan) taskSpan.textContent = newTask.text
    
        const prioritySpan = li.querySelector(".priority")
        if (prioritySpan) prioritySpan.textContent = newTask.priority

        priorityStyle(newTask,prioritySpan)
    })

    const buttonCancel = document.createElement ("button")
    buttonCancel.textContent = "CANCEL"
    buttonCancel.className = "btn btn-dark m-3"
    buttonCancel.addEventListener ("click", ()=>{
        editForm.remove()
        li.querySelectorAll("div, button,span").forEach((div) => {
            div.classList.remove("d-none")
        })
    })

    const buttonEdit= document.createElement ("div")
    buttonEdit.className = "d-flex justify-content-center"
    
    buttonEdit.appendChild (buttonChange)
    buttonEdit.appendChild (buttonCancel)

    editForm.appendChild (textEdit)
    editForm.appendChild (taskInput)
    editForm.appendChild (editPriority)
    editForm.appendChild (editDate)
    editForm.appendChild (buttonEdit)

    li.appendChild(editForm)
}

