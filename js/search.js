$(document).ready(() => {
  getInitialMovie();
  $(".content-main__nav__menus--search").on("keypress", setSearchQuery);
});

const getInitialMovie = async () => {
  try {
    const storageSearch = sessionStorage.getItem("search");
    const BASE_URL = `https://api.themoviedb.org/3/search/movie?query=${storageSearch}&api_key=ad2fb2e9ab12851bd813fca1a20c373e&language=en-US&page=1&include_adult=false`;
    const movieData = await axios.get(BASE_URL);
    const { data } = movieData;
    console.log(data, "Data");

    const movies = data.results.reduce((result, movie, key) => {
      if (key === 1)
        return `
          <div class="search__item">
          <a href="./movie.html">
          <img class="search__item__img"
              src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" onClick="setMovieToStorage(${movie.id})" alt="No Photo" />
          </a>
              <div class="search__item__info">
              <p class="search__item__info__title">${movie.title}</p>
              <p class="search__item__info__alternatives">${movie.release_date}</p>
              <p class="search__item__info__directed-by">${movie.vote_average} rating</p>
          </div>
      </div>
          `;
      // result pentru prima iteratie este [object, object]
      return `${result}
        <div class="search__item">
        <a href="./movie.html">
        <img class="search__item__img"
            src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" onClick="setMovieToStorage(${movie.id})" alt="No Photo" />
        </a>
            <div class="search__item__info">
            <p class="search__item__info__title">${movie.title}</p>
            <p class="search__item__info__alternatives">${movie.release_date}</p>
            <p class="search__item__info__directed-by">${movie.vote_average} rating</p>
        </div>
    </div>
        `;
    });

    $(".search").html(movies);
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
