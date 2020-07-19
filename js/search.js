$(document).ready(() => {
  getData();
  $(".content-main__nav__menus--search").on("keypress", setSearchQuery);
});

let firstPage = 1;
let foundMovies = {};

const getData = async (page) => {
  const storageSearch = sessionStorage.getItem("search");

  let BASE_URL = "";
  if (page === undefined)
    BASE_URL = `https://api.themoviedb.org/3/search/movie?query=${storageSearch}&api_key=ad2fb2e9ab12851bd813fca1a20c373e&language=en-US&page=1&include_adult=false`;
  else {
    BASE_URL = `https://api.themoviedb.org/3/search/movie?query=${storageSearch}&api_key=ad2fb2e9ab12851bd813fca1a20c373e&language=en-US&page=1&include_adult=false&page=${page}`;
  }

  axios.get(BASE_URL).then((data) => {
    foundMovies = data.data;
    listMovies(foundMovies);
  });
};

const listMovies = async (newMovies) => {
  try {
    const movies = newMovies.results.reduce((result, movie, key) => {
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
    generatePagination();
  } catch (error) {
    console.error(error);
  }
};

const generatePagination = () => {
  let pages = "";
  if (foundMovies.total_pages < 5) {
    for (let i = firstPage; i <= total_pages; i++) {
      pages += `
      <button class="pagination__page-btn" name="${i}" type="button" onclick="goToPage()">
        ${i}
      </button>`;
    }
  } else {
    for (let i = firstPage; i <= firstPage + 4; i++) {
      pages += `
      <button class="pagination__page-btn" name="${i}" type="button" onClick="goToPage()">
        ${i}
      </button>`;
    }
  }

  $(".pagination__page").html(pages);
  $(".pagination__page-btn").on("click", goToPage);
};

const determineFirstPage = (action) => {
  if (
    (firstPage === 1 && action === "-") ||
    (firstPage + 4 === foundMovies.total_pages && action === "+")
  )
    return;
  if (action === "+") {
    firstPage += 1;
  } else firstPage -= 1;
  generatePagination();
};

const goToPage = (event) => {
  console.log(event, "hh");
  getData(event.target.name);
};

const setSearchQuery = (event) => {
  if (event.key === "Enter") {
    sessionStorage.setItem("search", event.target.value);
    window.location.replace("/search.html");
  }
};

const setMovieToStorage = (id) => {
  sessionStorage.setItem("id", id);
};
