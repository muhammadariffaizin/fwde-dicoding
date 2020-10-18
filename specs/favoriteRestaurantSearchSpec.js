import FavoriteRestaurantSearchPresenter from '../src/scripts/views/pages/saved-restaurant/favorite-restaurant-search-presenter';
import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb';
import FavoriteRestaurantSearchView from '../src/scripts/views/pages/saved-restaurant/favorite-restaurant-search-view';
import RippleLoading from '../src/scripts/utils/ripple-loading-initiator';

describe('Searching restaurants', () => {
  let presenter;
  let favoriteRestaurants;
  let view;
  let loader;

  const searchRestaurants = (query) => {
    const queryElement = document.getElementById('query');
    queryElement.value = query;
    queryElement.dispatchEvent(new Event('change'));
  };

  const setRestaurantSearchContainer = () => {
    view = new FavoriteRestaurantSearchView();
    document.body.innerHTML = view.getTemplate();
  };

  const constructPresenter = () => {
    favoriteRestaurants = spyOnAllFunctions(FavoriteRestaurantIdb, 'searchRestaurants');
    const restaurantListContainer = document.querySelector('#restaurantsListContainer');
    loader = RippleLoading;
    loader.init({
      container: restaurantListContainer,
      contentBeforeLoading: restaurantListContainer.innerHTML,
    });
    presenter = new FavoriteRestaurantSearchPresenter({
      view,
      favoriteRestaurants,
      loader,
    });
  };

  beforeEach(() => {
    setRestaurantSearchContainer();
    constructPresenter();
  });

  describe('When query is not empty', () => {
    it('should be able to capture the query typed by the user', () => {
      searchRestaurants('film a');

      expect(presenter.latestQuery)
        .toEqual('film a');
    });
    it('should ask the model to search for saved restaurants', () => {
      searchRestaurants('film a');

      expect(favoriteRestaurants.searchRestaurants)
        .toHaveBeenCalledWith('film a');
    });
    it('should show the restaurants found by Favorite Restaurants', (done) => {
      document.querySelector('#restaurantsListContainer')
        .addEventListener('restaurants:updated', () => {
          expect(document.querySelectorAll('.restaurant-item').length).toEqual(3);
          done();
        });

      favoriteRestaurants.searchRestaurants.withArgs('film a').and.returnValues([
        { id: 111, name: 'film abc' },
        { id: 222, name: 'ada juga film abcde' },
        { id: 333, name: 'ini juga boleh film a' },
      ]);

      searchRestaurants('film a');
    });
    it('should show the name of the restaurants found by Favorite Restaurants', (done) => {
      document.querySelector('#restaurantsListContainer').addEventListener('restaurants:updated', () => {
        const restaurantTitles = document.querySelectorAll('.card-title');
        expect(restaurantTitles.item(0).textContent).toEqual('film abc');
        expect(restaurantTitles.item(1).textContent).toEqual('ada juga film abcde');
        expect(restaurantTitles.item(2).textContent).toEqual('ini juga boleh film a');

        done();
      });

      favoriteRestaurants.searchRestaurants.withArgs('film a').and.returnValues([
        { id: 111, name: 'film abc' },
        { id: 222, name: 'ada juga film abcde' },
        { id: 333, name: 'ini juga boleh film a' },
      ]);

      searchRestaurants('film a');
    });
    it('should show - when the restaurant returned does not contain a title', (done) => {
      document.querySelector('#restaurantsListContainer').addEventListener('restaurants:updated', () => {
        const restaurantTitles = document.querySelectorAll('.card-title');
        expect(restaurantTitles.item(0).textContent).toEqual('-');

        done();
      });

      favoriteRestaurants.searchRestaurants.withArgs('film a').and.returnValues([
        { id: 444 },
      ]);

      searchRestaurants('film a');
    });
  });
  describe('When query is empty', () => {
    it('should capture the query as empty', () => {
      searchRestaurants(' ');
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurants('    ');
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurants('');
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurants('\t');
      expect(presenter.latestQuery.length).toEqual(0);
    });
    it('should show all favorite restaurants', () => {
      searchRestaurants('    ');

      expect(favoriteRestaurants.getAllRestaurants)
        .toHaveBeenCalled();
    });
  });
  describe('When no favorite restaurants could be found', () => {
    it('should show the empty message', (done) => {
      document.querySelector('#restaurantsListContainer')
        .addEventListener('restaurants:updated', () => {
          expect(document.querySelectorAll('#error-message').length)
            .toEqual(1);
          done();
        });

      favoriteRestaurants.searchRestaurants.withArgs('film a').and.returnValues([]);

      searchRestaurants('film a');
    });
    it('should not show any restaurant', (done) => {
      document.querySelector('#restaurantsListContainer').addEventListener('restaurants:updated', () => {
        expect(document.querySelectorAll('.restaurant-item').length).toEqual(0);
        done();
      });

      favoriteRestaurants.searchRestaurants.withArgs('film a').and.returnValues([]);

      searchRestaurants('film a');
    });
  });
});
