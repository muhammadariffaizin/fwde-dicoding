import * as TestFactories from './helpers/testFactories';
import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb';

describe('Unsaving a restaurant', () => {
  const addFavoriteButtonContainer = () => {
    document.body.innerHTML = '<favorite-button class="position-fixed bottom-1 right-1"></favorite-button>';
  };

  beforeEach(async () => {
    addFavoriteButtonContainer();
    await FavoriteRestaurantIdb.putRestaurant({ id: 1 });
  });

  afterEach(async () => {
    await FavoriteRestaurantIdb.deleteRestaurant(1);
  });

  it('should display unsave widget when the restaurant has been saved', async () => {
    await TestFactories.createSaveButtonPresenterWithRestaurant({ id: 1 });

    expect(document.querySelector('[aria-label="remove from favorite"]'))
      .toBeTruthy();
  });
  it('should not display save widget when the restaurant has been saved', async () => {
    await TestFactories.createSaveButtonPresenterWithRestaurant({ id: 1 });

    expect(document.querySelector('[aria-label="add to favorite"]'))
      .toBeFalsy();
  });
  it('should be able to remove saved restaurant from the list', async () => {
    await TestFactories.createSaveButtonPresenterWithRestaurant({ id: 1 });

    document.querySelector('[aria-label="remove from favorite"]').dispatchEvent(new Event('click'));

    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([]);
  });
  it('should not throw error if the unsaved restaurant is not in the list', async () => {
    await TestFactories.createSaveButtonPresenterWithRestaurant({ id: 1 });

    await FavoriteRestaurantIdb.deleteRestaurant(1);

    document.querySelector('[aria-label="remove from favorite"]').dispatchEvent(new Event('click'));

    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([]);
  });
});
