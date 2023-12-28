let globalId = 0
const savedTodos = JSON.parse(localStorage.getItem('todos'))
let todos = savedTodos || []

const todoListElement = document.getElementById('todo-list')
const inputElement = document.getElementById('todo-input')

const renderTodoList = () => {
    saveTodoList()
    let todosComponents = ''
    todos.forEach(todo =>{
        todosComponents += createTodoComponent(todo)
    })
    todoListElement.innerHTML = todosComponents
}

const createTodoComponent = (todo) => {
    const date = new Date(todo.created).toLocaleDateString('he-IL')
    const time = new Date(todo.created).toLocaleTimeString('he-IL')
    return `
    <figure>
    <h3 ${todo.isCompleted ? 'class="completed"' : ''}}>${todo.text}</h3>
    <p ${todo.isCompleted ? 'class="completed"' : ''}}>${date} ${time}</p>
    <button onclick= "toggleTodoItem(${todo.id})" class="toggle-todo">${todo.isCompleted ? 'Completed' : 'Check'}</button>
    <div onclick="removeTodoById(${todo.id})"class="remove-todo">X</div>
  </figure>
  `
}

const toggleTodoItem = (id) => {
    const idx = todos.findIndex(todo => todo.id === parseInt(id))
    if (idx !== -1) {
        todos[idx].isCompleted = !todos[idx].isCompleted
        renderTodoList()
        saveTodoList()
    }
}


const createTodoItem = () => {
    let text = inputElement.value
    if(!text) return
    const todoItem = {
        id: genId(),
        text: text,
        created: Date.now(),
        isCompleted:false
    }
    todos.push(todoItem)
    saveTodoList()
    renderTodoList()
    inputElement.value= ''
}

const removeTodoById = (id) => {
    todos = [...todos.filter(todo => todo.id !== id)]
    renderTodoList()
    saveTodoList()
}

const saveTodoList = () => {
    localStorage.setItem('todos',JSON.stringify(todos))
}

const genId = () => {
    globalId++
    return globalId
}

renderTodoList()