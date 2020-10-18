import './restaurant-item';

class RestaurantList extends HTMLElement {
  set restaurants(data) {
    this._restaurants = data;
    this.render();
  }

  render() {
    this.innerHTML = '';
    this._restaurants.forEach((restaurant) => {
      const restaurantItemElement = document.createElement('restaurant-item');
      restaurantItemElement.restaurant = restaurant;
      this.appendChild(restaurantItemElement);
    });
  }
}

customElements.get('restaurant-list') || customElements.define('restaurant-list', RestaurantList);
