import UrlParser from '../../routes/url-parser';
import RestaurantDbSource from '../../data/restaurantdb-source';
import { createRestaurantDetailTemplate } from '../templates/template-creator';
import ReviewInitiator from '../../utils/review-initiator';
import RippleLoading from '../../utils/ripple-loading-initiator';
import '../../utils/component/favorite-button';

const Detail = {
  async render() {
    return `
        <div id="restaurant" class="container min-vh-80 d-flex margin-top-4"></div>
        <div id="addReviewFormContainer"class="container"></div>
      `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurantContainer = document.querySelector('#restaurant');

    RippleLoading.init({
      container: restaurantContainer,
      contentBeforeLoading: restaurantContainer.innerHTML,
    });

    try {
      const restaurant = await RestaurantDbSource.detailRestaurant(url.id);
      RippleLoading.unsetLoader();
      restaurantContainer.innerHTML = createRestaurantDetailTemplate(restaurant);

      const favoriteButton = document.querySelector('favorite-button');
      const restaurantData = {
        id: restaurant.id,
        name: restaurant.name,
        pictureId: restaurant.pictureId,
        rating: restaurant.rating,
        address: restaurant.address,
        city: restaurant.city,
        categories: restaurant.categories,
        description: restaurant.description,
        menus: restaurant.menus,
        consumerReviews: restaurant.consumerReviews,
      };
      favoriteButton.init(restaurantData);

      ReviewInitiator.init({
        dataRestaurant: restaurant,
        reviewContainer: document.querySelector('#customerReview'),
      });
    } catch (error) {
      RippleLoading.setError(`Error: ${error}, please refresh the page`);
    }
  },
};

export default Detail;
