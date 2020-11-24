/* eslint-disable no-unused-expressions */
import { createRestaurantItemTemplate } from '../../views/templates/template-creator';

class RestaurantItem extends HTMLElement {
  set restaurant(data) {
    this._restaurant = data;
    this.render();
  }

  render() {
    this.innerHTML = '';
    this.innerHTML = createRestaurantItemTemplate(this._restaurant);
  }
}

customElements.get('restaurant-item') || customElements.define('restaurant-item', RestaurantItem);
