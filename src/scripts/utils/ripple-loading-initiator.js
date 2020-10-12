import { createRippleLoader, createRippleLoaderError } from '../views/templates/template-creator';

const RippleLoading = {
  init({ container, contentBeforeLoading = '' }) {
    this._container = container;
    this._contentBeforeLoading = contentBeforeLoading;

    this.setLoader();
  },

  setLoader() {
    this._container.innerHTML = createRippleLoader();
  },

  unsetLoader() {
    this._container.innerHTML = this._contentBeforeLoading;
  },

  setError(message) {
    this._container.innerHTML = createRippleLoaderError(message);
  },
};

export default RippleLoading;
