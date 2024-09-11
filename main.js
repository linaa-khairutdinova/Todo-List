let todoInputValue = '';
const todoInputElement = document.getElementById('todo-input');

todoInputElement.addEventListener('input', (event) => {
    todoInputValue = event.target.value;
});


const createTodoItemButtonElement = (id, text, onClick) => {
    const buttonElement = document.createElement('button');
    buttonElement.classList.add('btn', 'btn-primary');
    buttonElement.id = id;
    buttonElement.innerText = text;
    buttonElement.addEventListener('click', onClick);
    return buttonElement;
};

const todoInputBtnElement = document.getElementById('todo-input-btn');
const todoListElement = document.getElementById('todo-list');

const saveTodos = (todos) => {
    localStorage.setItem('todoList', JSON.stringify(todos));
};

const loadTodos = () => {
    const todos = JSON.parse(localStorage.getItem('todoList'));
    return todos ? todos : [];
};

const createTodoElement = (todo) => {
    const todoItemElement = document.createElement('div');
    todoItemElement.classList.add('todo-item');
    todoItemElement.innerText = todo.text;

    const deleteButton = createTodoItemButtonElement('todo-button-delete', 'delete', () => {
        state.todoList = state.todoList.filter(item => item.id !== todo.id);
        saveTodos(state.todoList);
        todoItemElement.remove();
    });

    const doneButton = createTodoItemButtonElement('todo-button-done', 'done', () => {
        if (todoItemElement.classList.contains('text-decoration-line-through')) {
            todoItemElement.classList.remove('text-decoration-line-through');
        } else {
            todoItemElement.classList.add('text-decoration-line-through');
        }
        todo.completed = !todo.completed;
        saveTodos(state.todoList);
    });

    const importantButton = createTodoItemButtonElement('todo-button-important', 'important', () => {
        if (todoItemElement.classList.contains('font-weight-bold')) {
            todoItemElement.classList.remove('font-weight-bold');
        } else {
            todoItemElement.classList.add('font-weight-bold');
        }
        todo.important = !todo.important;
        saveTodos(state.todoList);
    });

    todoItemElement.append(deleteButton, doneButton, importantButton);

    if (todo.completed) {
        todoItemElement.classList.add('text-decoration-line-through');
    }

    if (todo.important) {
        todoItemElement.classList.add('font-weight-bold');
    }

    return todoItemElement;
};

const state = {
    inputValue: '',
    todoList: loadTodos()
};

state.todoList.forEach(todo => {
    todoListElement.appendChild(createTodoElement(todo));
});

todoInputBtnElement.addEventListener('click', () => {
    if (!todoInputValue.trim()) {
        return alert('Value should not be empty');
    }

    const newTodo = {
        id: Date.now(),
        text: todoInputValue,
        completed: false,
        important: false
    };

    state.todoList.push(newTodo);
    saveTodos(state.todoList);

    todoListElement.appendChild(createTodoElement(newTodo));

    todoInputElement.value = '';
    todoInputElement.focus();
});
