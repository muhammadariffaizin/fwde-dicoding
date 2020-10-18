import '../../../utils/component/restaurant-list';

class FavoriteRestaurantSearchView {
  getTemplate() {
    return `
      <div class="container min-vh-80">
        <h2 class="text-center margin-bottom-0 margin-top-4">Favorite Restaurant</h2>
        <p class="text-center">Save your favorite restaurant here!</p>
        <div class="d-flex margin-bottom-3 justify-content-center">
          <input id="query" class="w-50 input-control" type="text">
        </div>
        <div id="restaurantsListContainer">
          <restaurant-list class="d-grid grid-column-3"></restaurant-list>
        </div>
      </div>
          `;
  }

  runWhenUserIsSearching(callback) {
    document.getElementById('query').addEventListener('change', (event) => {
      callback(event.target.value);
    });
  }

  showFavoriteRestaurants(restaurants = [], loader) {
    loader.unsetLoader();
    const restaurantListElement = document.querySelector('restaurant-list');

    if (restaurants.length) {
      restaurantListElement.restaurants = restaurants;
    } else {
      loader.setError('Ups! didn\'t match any favorite restaurant <br>or no favorite restaurant saved... <br>Please try another word or try to save another restaurant');
    }
    document.querySelector('#restaurantsListContainer').dispatchEvent(new Event('restaurants:updated'));
  }
}

export default FavoriteRestaurantSearchView;
