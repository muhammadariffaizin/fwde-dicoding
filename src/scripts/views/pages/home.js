import RestaurantDbSource from '../../data/restaurantdb-source';
import RippleLoading from '../../utils/ripple-loading-initiator';
import '../../utils/component/restaurant-list';

const Home = {
  async render() {
    return `
        <section>
            <div class="jumbotron">
                <div class="jumbotron-item">
                    <picture>
                        <source type="image/webp" 
                            srcset="./images/heros/hero-image-large.webp 800w,
                                    ./images/heros/hero-image-medium.webp 600w,
                                    ./images/heros/hero-image-small.webp 480w"
                            sizes="(max-width: 600px) 480px, (max-width: 800px) 600px, 800px">
                        <source type="image/jpeg" 
                            srcset="./images/heros/hero-image-large.jpg 800w,
                                    ./images/heros/hero-image-medium.jpg 600w,
                                    ./images/heros/hero-image-small.jpg 480w"
                            sizes="(max-width: 600px) 480px, (max-width: 800px) 600px, 800px">
                        <img class="lazyload" 
                            width="640" height="480"
                            data-src="./images/heros/hero-image-large.jpg" 
                            alt="Hero">
                    </picture>
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
                    <div class="card-body card-no-img">
                        <p class="card-title text-center">Choose resto</p>
                        <p class="text-description-2 text-center">Find the best place to eat in your city</p>
                    </div>
                    <div class="card-icon">
                        <p>1</p>
                    </div>
                </div>
                <div id="banner_save_resto" class="card">
                    <div class="card-body card-no-img">
                        <p class="card-title text-center">Save resto</p>
                        <p class="text-description-2 text-center">Save your favorite resto easily</p>
                    </div>
                    <div class="card-icon">
                        <p>2</p>
                    </div>
                </div>
                <div id="banner_review_resto" class="card">
                    <div class="card-body card-no-img">
                        <p class="card-title text-center">Enjoy and share</p>
                        <p class="text-description-2 text-center">Visit your favorite resto and share the experiences</p>
                    </div>
                    <div class="card-icon">
                        <p>3</p>
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
