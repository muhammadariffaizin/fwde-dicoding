Feature('Reviewing Restaurants');

Before(({ I }) => {
  I.amOnPage('/');
});

Scenario('reviewing any restaurants', ({ I }) => {
  const message = 'Odading mang oleh';

  I.seeElement('restaurant-item');
  I.click(locate('a.card-title').first());
  I.waitForElement('#addReviewFormContainer', 3);

  I.fillField('name', 'Odading');
  I.fillField('review', message);
  I.click('#submitReview');

  I.see(message, 'p.overflow-wrap-anywhere');
});
