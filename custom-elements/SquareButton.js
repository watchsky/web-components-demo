// Customized built-in elements
class SquareButton extends HTMLButtonElement {
  constructor () {
    super();

    const width = this.getAttribute('width') || '100px';

    this.style.width = width;
    this.style.height = width;
    this.style.padding = '0';
    this.style.fontSize = '16px';
  }
}

customElements.define('square-button', SquareButton, { extends: 'button' });