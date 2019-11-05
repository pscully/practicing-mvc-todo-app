class Model {
  constructor() {
    this.todos = JSON.parse(localStorage.getItem('todos')) || [];
  }

  __commit(todos) {
    localStorage.setItem('todos', JSON.stringify(todos))
  }

  bindUpdatedTodos(callback) {
    this.todoListChanged = callback;
  }

  addTodo(task) {
    this.todos.push(task);
    console.log(this.todos);
    this.todoListChanged(this.todos);
  }
}

class View {
  constructor() {
    this.app = document.getElementById('app');
    this.h1 = document.createElement('h1');
    this.h2 = document.createElement('h2');
    this.input = document.createElement('input');
    this.button = document.createElement('button');
    this.ul = document.createElement('ul');
    this.h1.textContent = 'My Tasks For Today';
    this.h2.textContent = 'My Work List';
    this.button.textContent = 'Add Todo';
    this.input.placeholder = 'What to you need to do?';
    this.input.name = 'todo';
    this.input.id = 'todo';
    this.app.appendChild(this.h1);
    this.app.appendChild(this.h2);
    this.app.appendChild(this.input);
    this.app.appendChild(this.button);
  }

  bindAddTodo(handler) {
    this.button.addEventListener('click', e => {
      const task = this.input.value;
      handler(task);
      this.input.value = '';
    });
  }

  displayTodos = todos => {
    while (this.ul.firstChild) {
      this.ul.removeChild(this.ul.firstChild);
    }
    this.app.appendChild(this.ul);
    todos.map(todo => {
      const li = document.createElement('li');
      li.textContent = todo;
      this.ul.appendChild(li);
      return li;
    });
  };
}

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.model.bindUpdatedTodos(this.handleDisplayTodos);
    this.view.bindAddTodo(this.handleAddTodo);

    this.handleDisplayTodos(this.model.todos);
  }

  handleDisplayTodos = todos => {
    this.view.displayTodos(todos);
  };

  handleAddTodo = task => {
    console.log('Handler', task);
    this.model.addTodo(task);
  };
}

const app = new Controller(new Model(), new View());
console.log(app);
