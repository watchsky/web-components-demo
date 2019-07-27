// Autonomous custom elements
class ColorButton extends HTMLElement {
  constructor () {
    super();
    // Create a shadow root
    const shadow = this.attachShadow({mode: 'open'});

    // console.log(this.shadowRoot);
    // console.log(this.shadowRoot === shadow);
    // console.log(this.shadowRoot.host);

    const btn = document.createElement('button');
    btn.innerText = this.textContent ? this.textContent.trim() : 'button';

    const color = this.getAttribute('color') || 'blue';

    // Create some CSS to apply to the shadow dom
    const style = document.createElement('style');
    style.textContent = `
      button {
        color: white;
        font-size: 16px;
        padding: 5px 10px;
        background: ${color};
      }
    `;

    shadow.appendChild(style);
    shadow.appendChild(btn);
  }
}

customElements.define('color-button', ColorButton);