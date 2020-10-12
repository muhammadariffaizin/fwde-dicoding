import FavoriteRestaurantIdb from '../../data/favoriterestaurant-idb';
import RippleLoading from '../../utils/ripple-loading-initiator';
import '../../utils/component/restaurant-list';

const Favorite = {
  async render() {
    return `
      <div class="container min-vh-80">
        <h2 class="text-center margin-bottom-0 margin-top-4">Favorite Restaurant</h2>
        <p class="text-center margin-bottom-3">Save your favorite restaurant here!</p>
        <div id="restaurantsListContainer">
          <restaurant-list class="d-grid grid-column-3"></restaurant-list>
        </div>
      </div>
    `;
  },

  async afterRender() {
    const restaurantListContainer = document.querySelector('#restaurantsListContainer');
    RippleLoading.init({
      container: restaurantListContainer,
      contentBeforeLoading: restaurantListContainer.innerHTML,
    });

    try {
      const restaurantsData = await FavoriteRestaurantIdb.getAllRestaurants();
      RippleLoading.unsetLoader();

      const restaurantListElement = document.querySelector('restaurant-list');
      if (restaurantsData.length) {
        restaurantListElement.restaurants = restaurantsData;
      } else {
        RippleLoading.setError('Ups! You don\'t have any favorite restaurant.. <br>Please back to the home');
      }
    } catch (error) {
      RippleLoading.setError(`Error: ${error}, please refresh the page`);
    }
  },
};

export default Favorite;
