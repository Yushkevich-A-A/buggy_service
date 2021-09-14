export default class ControllerWidget {
  constructor(widget, url) {
    this.widget = widget;
    this.url = url;
    this.requestPending = false;
    this.init();
  }

  init() {
    this.listeners();
    this.registerServiceWorker();
    this.createRequestToServer();
    this.requestPending = true;
  }

  listeners() {
    document.addEventListener('click', (event) => {
      event.preventDefault();
      if (this.requestPending) {
        return;
      }

      if (event.target.closest('.widget-title-reload')) {
        this.requestPending = true;
        this.widget.closeErrorConnect();
        this.createRequestToServer();
      }
    });
  }

  registerServiceWorker() {
    if (navigator.serviceWorker) {
      window.addEventListener('load', async () => {
        try {
          await navigator.serviceWorker.register(
            './service.worker.js', { scope: './' },
          );
        } catch (e) {
          console.log(e);
        }
      });
    }
  }

  async createRequestToServer() {
    try {
      this.requestPending = true;
      const response = await fetch(`${this.url}getnews`);
      if (response.status < 200 || response.status >= 300) {
        // this.widget.openErrorConnect();
      } else {
        const data = await response.json();
        this.widget.drawContent(data);
      }
    } catch (e) {
      // this.widget.openErrorConnect();
    }
    this.requestPending = false;
  }
}
