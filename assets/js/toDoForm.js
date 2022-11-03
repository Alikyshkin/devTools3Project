const todoList = document.querySelector('.todo-list');
const todoForm = document.querySelector('.add-todo');
const removeList = document.querySelector('.remove-List');

let items = JSON.parse(localStorage.getItem('todoList')) || [
    {
        title: 'Task1',
        done: false
    },
    {
        title: 'Task2',
        done: true
    }
];

function addTodo(e) {
    e.preventDefault();
    const title = (this.querySelector('[name=item]')).value;
    const todo = {
        title,
        done: false
    };
    items.push(todo);
    saveTodos();
    this.reset();
}

function createList(list = [], listTarget) {
    listTarget.innerHTML = list.map((item, i) => {
        return `<li>
      <input type="checkbox" id="todo${i}" data-index="${i}"
             ${item.done ? 'checked' : ''} />
      <label for="todo${i}">${item.title}
				<span data-index="${i}">X</span>
			</label>
    </li>`
    }).join('');
}

function toggleDone(e) {
    if(!e.target.matches('input')) return;
    const el = e.target;
    const index = el.dataset.index;
    items[index].done = !items[index].done;
    saveTodos();
}

function removeSingle(e) {
    if(!e.target.matches('span')) return;
    const el = e.target;
    const index = el.dataset.index;
    items.splice(index, 1);
    saveTodos();
    if(items.length === 0) {
        removeList.classList.add('hidden');
    }
}

function saveTodos() {
    localStorage.setItem('todoList', JSON.stringify(items));
    createList(items, todoList);
    showRemoveButton();
}

function removeData() {
    items = [];
    localStorage.removeItem('todoList');
    createList(items, todoList);
    removeList.classList.add('hidden');
}

function showRemoveButton() {
    if(items.length > 1) return;
    removeList.classList.remove('hidden');
}

if(todoList) {
    todoList.addEventListener('click', toggleDone);
    todoList.addEventListener('click', removeSingle);
}

if(todoForm) {
    todoForm.addEventListener('submit', addTodo);
}

if(removeList) {
    removeList.addEventListener('click', removeData);
}



createList(items, todoList);