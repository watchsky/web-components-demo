import { PolymerElement, html } from './node_modules/@polymer/polymer/polymer-element.js';
import './node_modules/@polymer/polymer/lib/elements/dom-repeat.js'

class TodoItem extends PolymerElement {
  static get properties () {
    return {
      completed: {
        type: Boolean,
        value: false,
        notify: true,
        reflectToAttribute: true
      }
    };
  }

  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
        :host([completed]) .checkbox {
          background-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E');
        }
        :host([completed]) label {
          color: #d9d9d9;
          text-decoration: line-through;
        }
        li {
          list-style: none;
          border-bottom: 1px solid #ededed;
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
      </style>
      
      <li>
        <div class="todo-item">
          <div class="checkbox" on-click="handleClickCheckbox"></div>
          <label><slot></slot></label>
          <button class="remove" on-click="handleRemove">X</button>
        </div>
      </li>
    `;
  }

  handleClickCheckbox () {
    this.completed = !this.completed;
  }

  handleRemove () {
    if (this.parentNode) {
      this.parentNode.removeChild(this);
    }
  }
}

customElements.define('todo-item', TodoItem);

class TodoList extends PolymerElement {
  static get properties () {
    return {
      todos: {
        type: Array,
        value: [],
        notify: true,
      }
    };
  }

  static get template() {
    return html`
      <style>
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
      </style>
      
      <div class="todo-list">
        <input
         class="todo-input"
         placeholder="add your todo"
         on-keyup="addTodo"
        />
        <ul class="todos">
          <template is="dom-repeat" items="{{todos}}">
            <todo-item>{{item}}</todo-item>
          </template>
        </ul>
      </div>
    `;
  }

  addTodo (event) {
    const value = (event.target.value || '').trim();

    if (event.keyCode === 13 && value) {
      this.push('todos', value);
    }
  }
}

customElements.define('todo-list', TodoList);
