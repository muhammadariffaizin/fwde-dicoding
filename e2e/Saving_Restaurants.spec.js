const assert = require('assert');

Feature('Saving Restaurants');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('showing empty saved restaurants', ({ I }) => {
  I.seeElement('#query');
  I.see('Ups! didn\'t match any favorite restaurant', '#error-message');
});

Scenario('saving one restaurant', async ({ I }) => {
  I.see('no favorite restaurant saved...', '#error-message');

  I.amOnPage('/');

  I.seeElement('.restaurant-item a');

  const firstRestaurant = locate('.restaurant-item a').first();
  const firstRestaurantName = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.seeElement('#favoriteButton');
  I.click('#favoriteButton');

  I.amOnPage('/#/favorite');
  I.seeElement('restaurant-item');
  const savedRestaurantName = await I.grabTextFrom('restaurant-item a');

  assert.strictEqual(firstRestaurantName, savedRestaurantName);
});

Scenario('searching saved restaurants', async ({ I }) => {
  I.see('no favorite restaurant saved...', '#error-message');

  I.amOnPage('/');

  I.seeElement('.restaurant-item a');

  const titles = [];

  for (let i = 1; i <= 3; i++) {
    I.click(locate('.restaurant-item a').at(i));
    I.seeElement('#favoriteButton');
    I.click('#favoriteButton');
    titles.push(await I.grabTextFrom('#restaurant-main-info .card-title'));
    I.amOnPage('/');
  }

  I.amOnPage('/#/favorite');
  I.seeElement('#query');

  const searchQuery = titles[1].substring(1, 3);
  const matchingRestaurants = titles.filter((title) => title.indexOf(searchQuery) !== -1);

  I.fillField('#query', searchQuery);
  I.pressKey('Enter');

  const visibleSavedRestaurants = await I.grabNumberOfVisibleElements('.restaurant-item');
  assert.strictEqual(matchingRestaurants.length, visibleSavedRestaurants);

  matchingRestaurants.forEach(async (title, index) => {
    const visibleTitle = await I.grabTextFrom(locate('.restaurant-item .card-title').at(index + 1));
    assert.strictEqual(title, visibleTitle);
  });
});
