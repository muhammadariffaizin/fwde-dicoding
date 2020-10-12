import FavoriteRestaurantIdb from '../../data/favoriterestaurant-idb';
import { createFavoriteButtonTemplate, createFavoritedButtonTemplate } from '../../views/templates/template-creator';

class FavoriteButton extends HTMLElement {
  async init(data) {
    this._restaurant = data;

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
    const restaurant = await FavoriteRestaurantIdb.getRestaurant(id);
    return !!restaurant;
  }

  _renderRemoveFavorite() {
    this.innerHTML = createFavoriteButtonTemplate();

    const favoriteButton = this.querySelector('#favoriteButton');
    favoriteButton.addEventListener('click', async () => {
      await FavoriteRestaurantIdb.putRestaurant(this._restaurant);
      this._render();
    });
  }

  _renderAddFavorite() {
    this.innerHTML = createFavoritedButtonTemplate();

    const favoriteButton = this.querySelector('#favoriteButton');
    favoriteButton.addEventListener('click', async () => {
      await FavoriteRestaurantIdb.deleteRestaurant(this._restaurant.id);
      this._render();
    });
  }
}

customElements.define('favorite-button', FavoriteButton);
