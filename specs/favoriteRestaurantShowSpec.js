import FavoriteRestaurantSearchView from '../src/scripts/views/pages/saved-restaurant/favorite-restaurant-search-view';
import FavoriteRestaurantShowPresenter from '../src/scripts/views/pages/saved-restaurant/favorite-restaurant-show-presenter';
import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb';
import RippleLoading from '../src/scripts/utils/ripple-loading-initiator';

describe('Showing all favorite restaurants', () => {
  let view;
  let loader;

  const renderTemplate = () => {
    view = new FavoriteRestaurantSearchView();
    document.body.innerHTML = view.getTemplate();

    loader = RippleLoading;
    const restaurantListContainer = document.querySelector('#restaurantsListContainer');
    loader.init({
      container: restaurantListContainer,
      contentBeforeLoading: restaurantListContainer.innerHTML,
    });
  };

  beforeEach(() => {
    renderTemplate();
  });

  describe('When no restaurants have been liked', () => {
    it('should show the information that no restaurants have been liked', (done) => {
      document.querySelector('#restaurantsListContainer').addEventListener('restaurants:updated', () => {
        expect(document.querySelectorAll('#error-message').length)
          .toEqual(1);

        done();
      });

      const favoriteRestaurants = spyOnAllFunctions(FavoriteRestaurantIdb);
      favoriteRestaurants.getAllRestaurants.and.returnValues([]);

      new FavoriteRestaurantShowPresenter({
        view,
        favoriteRestaurants,
        loader,
      });
    });
    it('should ask for the favorite restaurants', () => {
      const favoriteRestaurants = spyOnAllFunctions(FavoriteRestaurantIdb);

      new FavoriteRestaurantShowPresenter({
        view,
        favoriteRestaurants,
        loader,
      });

      expect(favoriteRestaurants.getAllRestaurants).toHaveBeenCalledTimes(1);
    });
  });
  describe('When favorite restaurants exist', () => {
    it('should show the restaurants', (done) => {
      document.querySelector('#restaurantsListContainer').addEventListener('restaurants:updated', () => {
        expect(document.querySelectorAll('.restaurant-item').length).toEqual(2);
        done();
      });

      const favoriteRestaurants = spyOnAllFunctions(FavoriteRestaurantIdb);
      favoriteRestaurants.getAllRestaurants.and.returnValues([
        {
          id: 11, name: 'A', rating: 3, description: 'Sebuah restoran A',
        },
        {
          id: 22, name: 'B', rating: 4, description: 'Sebuah restoran B',
        },
      ]);

      new FavoriteRestaurantShowPresenter({
        view,
        favoriteRestaurants,
        loader,
      });
    });
  });
});
