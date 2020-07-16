$(document).ready(() => getInitialMovies());

const getInitialMovies = async () => {
  try {
    const data = await axios.get(
      "https://api.themoviedb.org/3/discover/movie?api_key=ad2fb2e9ab12851bd813fca1a20c373e&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1"
    );
    console.log(data);
    let movies = "";
    for (let i = 0; i < 12; i++) {
      movies += `
      <div class="content-movies__movies__movie" onClick="setMovieToStorage(${data.results[i].id})">
        <img class="content-movies__movies__movie--img" src="https://image.tmdb.org/t/p/w500${data.results[i].poster_path}"
          alt="" />
      </div>`;
    }

    $(".content-movies__movies").html(movies);
  } catch (error) {
    console.error(error);
  }
};

const setMovieToStorage = (id) => {
  sessionStorage.setItem("id", id);
};
