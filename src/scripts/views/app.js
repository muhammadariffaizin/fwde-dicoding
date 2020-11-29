import DrawerInitiator from '../utils/drawer-initiator';
import UrlParser from '../routes/url-parser';
import routes from '../routes/routes';
import { renderFooter } from './templates/template-creator';

class App {
  constructor({
    button, drawer, content, footer,
  }) {
    this._button = button;
    this._drawer = drawer;
    this._content = content;
    this._footer = footer;

    this._initialAppShell();
  }

  _initialAppShell() {
    DrawerInitiator.init({
      button: this._button,
      drawer: this._drawer,
      content: this._content,
    });
  }

  async fetchFontAwesome() {
    let linkElement = document.querySelector('link[href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css"]');
    if (!linkElement) {
      linkElement = document.createElement('link');
      linkElement.rel = 'stylesheet';
      linkElement.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css';
      document.head.appendChild(linkElement);
    }
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];

    const skipContent = document.querySelector('.skip-link');
    skipContent.addEventListener('click', (event) => {
      event.stopPropagation();
      event.preventDefault();
      const mainContent = document.querySelector('#mainContent');
      mainContent.focus();
    });

    this._content.innerHTML = await page.render();
    await this.fetchFontAwesome();
    await page.afterRender();
    this._footer.innerHTML = renderFooter();
  }
}

export default App;
