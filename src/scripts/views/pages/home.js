import RestaurantDbSource from '../../data/restaurantdb-source';
import RippleLoading from '../../utils/ripple-loading-initiator';
import '../../utils/component/restaurant-list';

const Home = {
  async render() {
    return `
        <section>
            <div class="jumbotron">
                <div class="jumbotron-item">
                    <img src="./images/heros/hero-image.jpg" alt="Hero">
                    <div class="jumbotron-content">
                        <h1 class="brand-name text-light">presto</h1>
                        <p class="brand-description text-light">Find the best resto around you!</p>
                    </div>
                </div>
            </div>
        </section>
        <div class="container">
            <section class="margin-top-3 d-grid grid-column-3">
                <div id="banner_choose_resto" class="card">
                    <div class="card-image">
                        <img src="https://b.zmtcdn.com/webFrontend/95f005332f5b9e71b9406828b63335331585809309.png"
                            alt="banner choose resto" crossorigin="anonymous">
                    </div>
                    <div class="card-body">
                        <p class="card-title text-center">Choose resto</p>
                        <p class="text-description-2 text-center">Find the best place to eat in your city</p>
                    </div>
                </div>
                <div id="banner_save_resto" class="card">
                    <div class="card-image">
                        <img src="https://cdn-image.hipwee.com/wp-content/uploads/2015/08/27DA0B1400000578-3050116-Taking_a_good_food_picture_for_Instagram_requires_thought_planni-a-12_1430212889456-750x422.jpg"
                            alt="banner save resto" crossorigin="anonymous">
                    </div>
                    <div class="card-body">
                        <p class="card-title text-center">Save resto</p>
                        <p class="text-description-2 text-center">Save your favorite resto easily</p>
                    </div>
                </div>
                <div id="banner_review_resto" class="card">
                    <div class="card-image">
                        <img src="https://b.zmtcdn.com/data/collections/9c0b6e018ae12dfc7c370cf714b7fae2_1568086635.jpg"
                            alt="banner review resto" crossorigin="anonymous">
                    </div>
                    <div class="card-body">
                        <p class="card-title text-center">Enjoy and share</p>
                        <p class="text-description-2 text-center">Visit your favorite resto and share the experiences</p>
                    </div>
                </div>
            </section>
            <section>
                <h2 class="text-center margin-bottom-0">Explore Restaurant</h2>
                <p class="text-center margin-bottom-3">Find from the curated list of the best restaurants and cafes in your city!</p>
                <div id="restaurantsListContainer">
                    <restaurant-list class="d-grid grid-column-3"></restaurant-list>
                </div>
            </section>
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
      const listRestaurants = await RestaurantDbSource.listRestaurants();
      RippleLoading.unsetLoader();
      const restaurantListElement = document.querySelector('restaurant-list');
      restaurantListElement.restaurants = listRestaurants;
    } catch (error) {
      RippleLoading.setError(`Error: ${error}, please refresh the page`);
    }
  },
};

export default Home;
