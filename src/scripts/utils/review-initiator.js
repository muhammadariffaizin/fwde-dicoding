import RestaurantDbSource from '../data/restaurantdb-source';
import FavoriteRestaurantIdb from '../data/favorite-restaurant-idb';
import RippleLoading from './ripple-loading-initiator';
import { createReviewTemplate, createFormReviewTemplate, createShowReviewTemplate } from '../views/templates/template-creator';

const ReviewInitiator = {
  async init({ dataRestaurant, reviewContainer }) {
    this._restaurant = dataRestaurant;
    this._reviewContainer = reviewContainer;

    await this._renderReviews();
  },

  async _renderReviews() {
    this._reviewContainer.innerHTML = createReviewTemplate();

    await this._renderPostedReviews();
    await this._renderFormReview();
  },

  async _renderPostedReviews() {
    this._reviewPostedContainer = document.querySelector('#reviewPosted');

    RippleLoading.init({
      container: this._reviewPostedContainer,
      contentBeforeLoading: this._reviewPostedContainer.innerHTML,
    });
    this._reviewPostedContainer.innerHTML = createShowReviewTemplate(this._restaurant);
  },

  async _renderFormReview() {
    this._reviewFormContainer = document.querySelector('#reviewForm');

    this._reviewFormContainer.innerHTML = createFormReviewTemplate(this._restaurant.id);

    const formAddReview = document.querySelector('#formAddReview');
    formAddReview.addEventListener('submit', async (event) => {
      event.preventDefault();
      const dataFormElement = formAddReview.elements;
      const dataForm = {
        id: dataFormElement.namedItem('id').value,
        name: dataFormElement.namedItem('name').value,
        review: dataFormElement.namedItem('review').value,
      };

      const response = await RestaurantDbSource.postReviewRestaurant(dataForm);

      if (!response.error) {
        this._restaurant.customerReviews = response.customerReviews;
        await FavoriteRestaurantIdb.putRestaurant(this._restaurant);
        this._renderPostedReviews();
      }
    });
  },
};

export default ReviewInitiator;
