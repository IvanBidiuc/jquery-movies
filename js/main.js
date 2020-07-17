$(document).ready(() => {
  getInitialMovies();
  $(".content-main__nav__menus--search").on("keydown", setSearchQuery);
});

const getInitialMovies = async () => {
  const BASE_URL =
    "https://api.themoviedb.org/3/discover/movie?api_key=ad2fb2e9ab12851bd813fca1a20c373e&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1";
  try {
    const data = await axios.get(BASE_URL);
    const movies = data.data.results
      .splice(0, 13)
      .reduce((result, item, key) => {
        if (key === 1)
          return `
        <div class="content-movies__movies__movie" onClick="setMovieToStorage(${item.id})">
          <a href="./movie.html"> 
            <img class="content-movies__movies__movie--img" src="https://image.tmdb.org/t/p/w500${item.poster_path}"
            alt="" />
          </a>
        </div>`;
        // result pentru prima iteratie este [object, object]
        return `${result}
          <div class="content-movies__movies__movie" onClick="setMovieToStorage(${item.id})">
            <a href="./movie.html"> 
              <img class="content-movies__movies__movie--img" src="https://image.tmdb.org/t/p/w500${item.poster_path}"
              alt="" />
              </a>
          </div>`;
      });

    $(".content-movies__movies").html(movies);
  } catch (error) {
    console.error(error);
  }
};

const setMovieToStorage = (id) => {
  sessionStorage.setItem("id", id);
};

const setSearchQuery = (event) => {
  if (event.key === "Enter") {
    sessionStorage.setItem("search", event.target.value);
    window.location.replace("/search.html");
  }
};
