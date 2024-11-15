customElements.define("chat-auto-scroll",
  class ChatAutoscrollWebComponent extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      const shadow = this.attachShadow({ mode: 'open' });

      // Create and style the div inside the shadow root
      const container = document.createElement('div');
      container.style.height = '100%';
      container.style.overflowY = 'auto';
      container.style.display = 'flex';
      container.style.flexDirection = 'column';
      container.style.position = 'relative';

      // Create a slot for projecting light DOM content
      const slot = document.createElement('slot');
      container.appendChild(slot);
      shadow.appendChild(container);

      // Initialize scroll state
      let scrolledToBottom = true;

      // Scroll event listener
      container.addEventListener('scroll', () => {
        scrolledToBottom = container.scrollTop + container.offsetHeight >= container.scrollHeight - 1;
      });

      // Mutation observer for child list changes
      const observer = new MutationObserver(() => {
        if (scrolledToBottom) {
          container.scrollTop = container.scrollHeight;
        }
      });

      observer.observe(container, { childList: true, subtree: true });
    }
  }
);
