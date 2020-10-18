import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';
import FavoriteRestaurantSearchView from './saved-restaurant/favorite-restaurant-search-view';
import FavoriteRestaurantSearchPresenter from './saved-restaurant/favorite-restaurant-search-presenter';
import FavoriteRestaurantShowPresenter from './saved-restaurant/favorite-restaurant-show-presenter';
import RippleLoading from '../../utils/ripple-loading-initiator';
import '../../utils/component/restaurant-list';

const view = new FavoriteRestaurantSearchView();

const Favorite = {
  async render() {
    return view.getTemplate();
  },

  async afterRender() {
    const restaurantListContainer = document.querySelector('#restaurantsListContainer');
    RippleLoading.init({
      container: restaurantListContainer,
      contentBeforeLoading: restaurantListContainer.innerHTML,
    });
    new FavoriteRestaurantShowPresenter({
      view,
      favoriteRestaurants: FavoriteRestaurantIdb,
      loader: RippleLoading,
    });
    new FavoriteRestaurantSearchPresenter({
      view,
      favoriteRestaurants: FavoriteRestaurantIdb,
      loader: RippleLoading,
    });
  },
};

export default Favorite;
