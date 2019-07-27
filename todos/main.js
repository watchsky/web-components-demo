customElements.define('todo-item',
  class extends HTMLElement {
    constructor () {
      super();

      const shadow = this.attachShadow({ mode: 'open' });

      this.liDom = document.createElement('li');
      this.liDom.innerHTML = `
        <div class="todo-item">
          <div class="checkbox"></div>
          <label></label>
          <button class="remove">X</button>
        </div>
      `;

      const style = document.createElement('style');
      style.textContent = `
        li {
          list-style: none;
          border-bottom: 1px solid #ededed;
        }
        li.completed .checkbox {
          background-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E');
        }
        li.completed label {
          color: #d9d9d9;
          text-decoration: line-through;
        }
        li:hover .remove {
          display: block;
        }
        .todo-item {
          display: flex;
          align-items: center;
          padding: 8px 5px;
        }
        .checkbox {
          width: 40px;
          height: 40px;
          background: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E') no-repeat center center;
          background-size: 100% 100%;
        }
        label {
          flex: 1 1;
          padding: 0 10px;
          font-size: 20px;
          color: #4d4d4d;
        }
        .remove {
          display: none;
          border: none;
          outline: none;
          font-size: 18px;
          padding: 2px 10px;
        }
      `;

      shadow.appendChild(style);
      shadow.appendChild(this.liDom);

      this.handleClickCheckbox = this.handleClickCheckbox.bind(this);
      this.handleRemove = this.handleRemove.bind(this);
    }

    connectedCallback () {
      this.liDom.querySelector('label').innerText = (this.textContent || '').trim();
      this.liDom.querySelector('.checkbox').addEventListener('click', this.handleClickCheckbox, false);
      this.liDom.querySelector('.remove').addEventListener('click', this.handleRemove, false);
    }

    handleClickCheckbox () {
      if (this.liDom.classList.contains('completed')) {
        this.liDom.classList.remove('completed');
      } else {
        this.liDom.classList.add('completed');
      }
    }

    handleRemove () {
      if (this.parentNode) {
        this.parentNode.removeChild(this);
      }
    }
  }
);

customElements.define('todo-list',
  class extends HTMLElement {
    constructor () {
      super();

      const shadow = this.attachShadow({ mode: 'open' });

      const container = document.createElement('div');
      container.classList.add('todo-list');
      container.innerHTML = `
        <input class="todo-input" placeholder="add your todo" />
        <ul class="todos"></ul>
      `;

      const style = document.createElement('style');
      style.textContent = `
        .todo-list {
          box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
        }
        .todo-input {
          width: 100%;
          border: none;
          outline: none;
          padding: 15px;
          font-size: 24px;
          line-height: 1.4em;
          box-sizing: border-box;
          background: rgba(0, 0, 0, 0.003);
          box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
        }
        .todos {
          margin: 0;
          padding: 0;
        }
      `;

      shadow.appendChild(style);
      shadow.appendChild(container);

      this.todoInput = container.querySelector('.todo-input');
      this.todos = container.querySelector('.todos');
      this.addTodo = this.addTodo.bind(this);
    }

    connectedCallback () {
      this.todoInput.addEventListener('keyup', this.addTodo, false);
    }

    addTodo (event) {
      const value = (event.target.value || '').trim();

      if (event.keyCode === 13 && value) {
        const item = document.createElement('todo-item');
        item.textContent = value;
        this.todos.appendChild(item);
      }
    }
  }
);