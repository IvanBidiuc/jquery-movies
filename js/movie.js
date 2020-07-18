$(document).ready(() => {
  getInitialMovie();
  $(".content-main__nav__menus--search").on("keypress", setSearchQuery);
});

const getInitialMovie = async () => {
  try {
    const storageId = sessionStorage.getItem("id");
    const BASE_URL = `https://api.themoviedb.org/3/movie/${storageId}?api_key=ad2fb2e9ab12851bd813fca1a20c373e&language=en-US`;
    const movieData = await axios.get(BASE_URL);
    const { data } = movieData;

    $(".content-info__col1__cover").replaceWith(`
    <img class="content-info__col1__cover"
    src="https://image.tmdb.org/t/p/w500/${data.poster_path}" />
    `);

    $(".content-info__col2__info__title").replaceWith(`
    <p class="content-info__col2__info__title">${data.original_title}</p>
    `);

    $(".content-info__col2__info__year").replaceWith(`
    <p class="content-info__col2__info__year">${data.release_date.substring(
      0,
      4
    )}</p>
    `);

    $(".content-info__col2__description-title").replaceWith(`
    <p class="content-info__col2__description-title">${data.tagline}</p>
    `);

    $(".content-info__col2__description").replaceWith(`
    <p class="content-info__col2__description">${data.overview}</p>
    `);

    $(".content-info__col3__rating__chart__stars > p:eq(0)").replaceWith(`
    <p>${data.vote_average}</p>
    `);

    $(".content-info__col3__rating__header > p:eq(1)").replaceWith(`
    <p>${data.vote_count} voters</p>
    `);

    $(".content-info__col1__feedback__heart-count").replaceWith(`
    <p class="content-info__col1__feedback__heart-count">${data.popularity}</p>

    `);
  } catch (error) {
    console.error(error);
  }
};

const setSearchQuery = (event) => {
  if (event.key === "Enter") {
    sessionStorage.setItem("search", event.target.value);
    window.location.replace("/search.html");
  }
};
