AOS.init();
const APIURL = "http://www.omdbapi.com/?";
const searchForm = document.getElementById("search-form");
let modalTitle = document.getElementById("modal-title");
let details = document.getElementById("details");
let results = document.getElementById("results");

let searchMovie = (search) => {
  let getUrl = APIURL + "apikey=" + APIKEY + "&s=" + search;
  fetch(getUrl)
    .then((response) => response.json())
    .then((response) => {
      showResults(response.Search);
    })
    .catch((error) => console.error("error:", error));
};

let showResults = (movies) => {
  results.innerHTML = "";
  for (let i in movies) {
    results.innerHTML += `
    <div class="card mb-3" style="max-width: 540px;" data-aos="fade-up">
      <div class="row no-gutters">
        <div class="col-md-4">
          <img src="${movies[i].Poster}" class="card-img img-fluid" alt="${movies[i].Title}">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title mt-5">${movies[i].Title}</h5>
            <p class="card-text">${movies[i].Year}</p>
            <a href="#" class="btn btn-primary" onclick="getDetails('${movies[i].imdbID}')
            " data-toggle="modal" data-target="#exampleModalCenter">Plus d'info</a>
          </div>
        </div>
      </div>
    </div>
  `;
  }
};

let getDetails = (imdbID) => {
  let getUrl = APIURL + "apikey=" + APIKEY + "&i=" + imdbID;
  fetch(getUrl)
    .then((response) => response.json())
    .then((response) => {
      showDetails(response);
    })
    .catch((error) => console.error("error:", error));
};

let showDetails = (movie) => {
  modalTitle.innerHTML = `${movie.Title}`
  details.innerHTML = `
  <div class="card">
  <img src="${movie.Poster}" class="card-img-top" alt="${movie.Title}">
  <div class="card-body mb-3">
    <h5 class="card-title">Director: ${movie.Director}</h5>
    <p class="card-text">${movie.Year}</p>
      <p class="card-text"><em>${movie.Plot}</em></p>
    </div>
  <ul class="list-group">
    <li class="list-group-item"><strong>Actors</strong> : ${movie.Actors}</li>
    <li class="list-group-item"><strong>Awards</strong> : ${movie.Awards}</li>
    <li class="list-group-item"><strong>BoxOffice</strong> : ${movie.BoxOffice}</li>
    <li class="list-group-item"><strong>Country</strong> : ${movie.Country}</li>
    <li class="list-group-item"><strong>Genre</strong> : ${movie.Genre}</li>
    <li class="list-group-item"><strong>Metascore</strong> : ${movie.Metascore}</li>
    <li class="list-group-item"><strong>Production</strong> : ${movie.Production}</li>
    <li class="list-group-item"><strong>Rated</strong> : ${movie.Rated}</li>
    <li class="list-group-item"><strong>Released</strong> : ${movie.Released}</li>
    <li class="list-group-item"><strong>Runtime</strong> : ${movie.Runtime}</li>
    <li class="list-group-item"><strong>Type</strong> : ${movie.Type}</li>
    <li class="list-group-item"><strong>Writer</strong> : ${movie.Writer}</li>
    <li class="list-group-item"><strong>imdbID</strong> : ${movie.imdbID}</li>
    <li class="list-group-item"><strong>imdbRating</strong> : ${movie.imdbRating}</li>
    <li class="list-group-item"><strong>imdbVotes</strong> : ${movie.imdbVotes}</li>

  </ul>
</div>
  `;
};

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let search = document.getElementById("search").value;
  searchMovie(search);
});
