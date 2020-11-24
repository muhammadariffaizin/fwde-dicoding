/* eslint-disable no-unused-expressions */
import { createFavoriteButtonTemplate, createUnfavoriteButtonTemplate } from '../../views/templates/template-creator';

class FavoriteButton extends HTMLElement {
  async init(data, favoriteRestaurants) {
    this._restaurant = data;
    this._favoriteRestaurants = favoriteRestaurants;

    await this._render();
  }

  async _render() {
    if (await this._isRestaurantExist()) {
      this._renderAddFavorite();
    } else {
      this._renderRemoveFavorite();
    }
  }

  async _isRestaurantExist() {
    const { id } = this._restaurant;
    const restaurant = await this._favoriteRestaurants.getRestaurant(id);
    return !!restaurant;
  }

  _renderRemoveFavorite() {
    this.innerHTML = createFavoriteButtonTemplate();

    const favoriteButton = this.querySelector('#favoriteButton');
    favoriteButton.addEventListener('click', async () => {
      await this._favoriteRestaurants.putRestaurant(this._restaurant);
      this._render();
    });
  }

  _renderAddFavorite() {
    this.innerHTML = createUnfavoriteButtonTemplate();

    const favoriteButton = this.querySelector('#favoriteButton');
    favoriteButton.addEventListener('click', async () => {
      await this._favoriteRestaurants.deleteRestaurant(this._restaurant.id);
      this._render();
    });
  }
}

customElements.get('favorite-button') || customElements.define('favorite-button', FavoriteButton);
