class Square extends HTMLElement {
  // 指定要监听的属性
  static get observedAttributes () {
    return ['color', 'length'];
  }

  constructor () {
    super();

    const shadow = this.attachShadow({ mode: 'open' });

    const div = document.createElement('div');
    const style = document.createElement('style');
    shadow.appendChild(style);
    shadow.appendChild(div);
  }

  connectedCallback () {
    console.log('connected');
    updateStyle(this);
  }

  disconnectedCallback () {
    console.log('disconnected');
  }

  adoptedCallback () {
    console.log('adopted');
  }

  attributeChangedCallback (name, oldValue, newValue) {
    console.log('attributeChanged', name, oldValue, newValue);
    updateStyle(this);
  }
}

customElements.define('custom-square', Square);

function updateStyle (elem) {
  const shadow = elem.shadowRoot;
  shadow.querySelector('style').textContent = `
    div {
      width: ${elem.getAttribute('length')}px;
      height: ${elem.getAttribute('length')}px;
      background-color: ${elem.getAttribute('color')};
    }
  `;
}

const add = document.querySelector('.add');
const update = document.querySelector('.update');
const move = document.querySelector('.move');
const remove = document.querySelector('.remove');
const firstBlock = document.getElementById('first-block');
const secondBlock = document.getElementById('second-block');
let square;

update.disabled = true;
move.disabled = true;
remove.disabled = true;

function random (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

add.onclick = function () {
  // Create a custom square element
  square = document.createElement('custom-square');
  square.setAttribute('length', '100');
  square.setAttribute('color', 'red');
  firstBlock.appendChild(square);

  update.disabled = false;
  move.disabled = false;
  remove.disabled = false;
  add.disabled = true;
};

update.onclick = function () {
  // Randomly update square's attributes
  square.setAttribute('length', random(50, 200));
  square.setAttribute('color', `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`);
};

move.onclick = function () {
  square.parentNode.removeChild(square);
  secondBlock.contentDocument.body.appendChild(square);

  move.disabled = true;
};

remove.onclick = function () {
  // Remove the square
  square.parentNode.removeChild(square);

  update.disabled = true;
  move.disabled = true;
  remove.disabled = true;
  add.disabled = false;
};