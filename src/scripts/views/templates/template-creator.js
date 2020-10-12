import API_ENDPOINT from '../../globals/api-endpoint';

const createRestaurantItemTemplate = (restaurant) => `
    <div id="${restaurant.id}" class="card h-100">
        <div class="card-label bg-primary text-light">City: ${restaurant.city}</div>
        <div class="card-image">
            <img src="${restaurant.pictureId ? API_ENDPOINT.IMAGE(restaurant.pictureId, 'medium') : 'https://picsum.photos/id/666/800/450?grayscale'}" alt="${restaurant.name}" loading="lazy" crossorigin="anonymous">
        </div>
        <div class="card-body">
            <div class="card-rating"><i class="fa fa-star"></i> ${restaurant.rating}</div>
            <a href="#/detail/${restaurant.id}" class="card-title">${restaurant.name}</a>
            <p class="text-description-4">${restaurant.description}</p>
        </div>
    </div>
  `;

const createRestaurantDetailTemplate = (restaurant) => `
    <div id="content" class="margin-top-1">
        <div class="card card-full margin-bottom-1">
            <div class="card-image">
                <img src="${API_ENDPOINT.IMAGE(restaurant.pictureId, 'large')}" alt="${restaurant.name}" />
            </div>
            <div class="card-body">
                <h2 class="card-title margin-bottom-0">${restaurant.name}</h2>
                <div class="card-rating"><i class="fa fa-star"></i> ${restaurant.rating}</div>
                <p class="margin-top-0">${restaurant.address}, ${restaurant.city}</p>
            </div>
        </div>
        <div class="card card-full margin-bottom-1">
            <div class="card-body">
                <h3 class="card-title">Categories</h3>
                <ul class="list-group list-pill">
                    ${restaurant.categories.map((category) => `<li class="list-item">${category.name}</li>`).join('')}
                </ul>
            </div>
        </div>
        <div class="card card-full margin-bottom-1">
            <div class="card-body">
                <h3 class="card-title">Description</h3>
                <p>${restaurant.description}</p>
            </div>
        </div>
        <div class="card card-full margin-bottom-1">
            <div class="card-body">
                <h3 class="card-title">Menus</h3>
                <div class="d-grid grid-column-2">
                    <div>
                        <h4 class="margin-top-0 text-center"><i class="fa fa-utensils"></i> Foods</h4>
                        <ul class="list-group">
                        ${restaurant.menus.foods.map((food) => `<li class="list-item">${food.name}</li>`).join('')}
                        </ul>
                    </div>
                    <div>
                        <h4 class="margin-top-0 text-center"><i class="fa fa-coffee"></i> Drinks</h4>
                        <ul class="list-group">
                        ${restaurant.menus.drinks.map((drink) => `<li class="list-item">${drink.name}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div id="customerReview"></div>
        <favorite-button class="position-fixed bottom-1 right-1"></favorite-button>
    </div>
    `;

const createFavoriteButtonTemplate = () => `
    <button aria-label="add to favorite" id="favoriteButton" class="button-primary btn-round bg-red">
       <i class="far fa-heart" aria-hidden="true"></i>
    </button>
  `;

const createFavoritedButtonTemplate = () => `
    <button aria-label="remove from favorite" id="favoriteButton" class="button-primary btn-round bg-red">
      <i class="fa fa-heart" aria-hidden="true"></i>
    </button>
  `;

const createReviewTemplate = () => `
    <div id="reviewPosted"></div>
    <div id="reviewForm"></div>
  `;

const createShowReviewTemplate = (restaurant) => `
    <div class="card card-full margin-bottom-1">
        <div class="card-body">
            <h3 class="card-title">Customer Reviews</h3>
            <div class="list-group">
                ${restaurant.consumerReviews.map((review) => `
                    <div class="list-item">
                        <b class="overflow-wrap-anywhere">${review.name}</b>
                        <small>${review.date}</small>
                        <p class="overflow-wrap-anywhere">${review.review}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    </div>
  `;

const createFormReviewTemplate = (id) => `
  <div class="card">
      <div class="card-body">
        <h3 class="card-title">Add Review</h3>
          <form id="formAddReview" method="POST">
              <input type="hidden" name="id" value="${id}">
              <label for="name">Name</label>
              <input class="input-control" type="text" name="name">
              <label for="name">Review</label>
              <textarea class="input-control" type="text" name="review"></textarea>
              <input class="button-primary" type="submit" value="Add Review">
          </form>
      </div>
  </div>
`;

const createRippleLoader = () => `
  <div class="d-flex flex-column justify-content-center align-items-center w-100">
    <div class="loader-ripple">
      <div></div>
      <div></div>
    </div>
    <p class="text-center">Loading...</p>
  </div>
  `;

const createRippleLoaderError = (message) => `
  <div class="d-flex flex-column justify-content-center align-items-center w-100">
    <div>
      <i class="far fa-4x fa-frown text-red"></i>
    </div>
    <p class="text-center">${message}</p>
  </div>
`;

export {
  createRestaurantItemTemplate,
  createRestaurantDetailTemplate,
  createFavoriteButtonTemplate,
  createFavoritedButtonTemplate,
  createReviewTemplate,
  createShowReviewTemplate,
  createFormReviewTemplate,
  createRippleLoader,
  createRippleLoaderError,
};
