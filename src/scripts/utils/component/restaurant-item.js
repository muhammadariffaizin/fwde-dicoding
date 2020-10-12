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

customElements.define('restaurant-item', RestaurantItem);
