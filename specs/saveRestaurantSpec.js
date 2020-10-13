import * as TestFactories from './helpers/testFactories';
import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb';

describe('Saving a restaurant', () => {
  const addFavoriteButtonContainer = () => {
    document.body.innerHTML = '<favorite-button class="position-fixed bottom-1 right-1"></favorite-button>';
  };

  beforeEach(() => {
    addFavoriteButtonContainer();
  });

  it('should show the like button when the restaurant has not been saved before', async () => {
    await TestFactories.createSaveButtonPresenterWithRestaurant({ id: 1 });

    expect(document.querySelector('[aria-label="add to favorite"]'))
      .toBeTruthy();
  });
  it('should not show the unlike button when the restaurant has not been saved before', async () => {
    await TestFactories.createSaveButtonPresenterWithRestaurant({ id: 1 });

    expect(document.querySelector('[aria-label="remove from favorite"]'))
      .toBeFalsy();
  });
  it('should be able to save the restaurant', async () => {
    await TestFactories.createSaveButtonPresenterWithRestaurant({ id: 1 });

    document.querySelector('#favoriteButton').dispatchEvent(new Event('click'));
    const restaurant = await FavoriteRestaurantIdb.getRestaurant(1);

    expect(restaurant).toEqual({ id: 1 });

    FavoriteRestaurantIdb.deleteRestaurant(1);
  });
  it('should not add a restaurant again when its already saved', async () => {
    await TestFactories.createSaveButtonPresenterWithRestaurant({ id: 1 });

    await FavoriteRestaurantIdb.putRestaurant({ id: 1 });
    document.querySelector('#favoriteButton').dispatchEvent(new Event('click'));

    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([{ id: 1 }]);

    FavoriteRestaurantIdb.deleteRestaurant(1);
  });
  it('should not add a restaurant when it has no id', async () => {
    await TestFactories.createSaveButtonPresenterWithRestaurant({});

    document.querySelector('#favoriteButton').dispatchEvent(new Event('click'));

    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([]);
  });
});
