import '../../src/scripts/utils/component/favorite-button';
import FavoriteRestaurantIdb from '../../src/scripts/data/favorite-restaurant-idb';

const createSaveButtonPresenterWithRestaurant = async (restaurant) => {
  const favoriteButton = document.querySelector('favorite-button');
  const restaurantData = restaurant;
  await favoriteButton.init(restaurantData, FavoriteRestaurantIdb);
};

export { createSaveButtonPresenterWithRestaurant };
