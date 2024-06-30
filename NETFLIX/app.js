document.addEventListener('DOMContentLoaded', () => {
  let swiper;

  function initializeSwiper() {
    swiper = new Swiper(".mySwiper", {
      slidesPerView: 4,
      spaceBetween: 20,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
        clickable: true,
      },
    });
  }

  initializeSwiper();

  const KeyAPI = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzODhiY2JlZTA2MjU5ZTM5ZDk0MDYzZmFkNzA4MDcxOCIsInN1YiI6IjY2NzRiYWFmNDliYTg0NjRkOTI4ZDcwYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9iCwoQA6MtVdLB8KE7DSP9PJivT4SAO_qD_LcygYjdA';

  const btnSearch = document.getElementById('button_search');

  btnSearch.addEventListener('click', () => {
    const input = document.getElementById('search_input');
    const valueInput = input.value;

    movieFetch(valueInput);
  });

  // fetch movie actual
  async function movieFetch(research) {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `${KeyAPI}`,
      },
    };

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${research}&include_adult=false&language=en-US&page=1`,
        options
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);
      const swiperWrapper = document.querySelector('.swiper-wrapper');
      swiperWrapper.innerHTML = ""; // Clear previous slides

      data.results.forEach(element => {
        const title = element.title;
        const image = element.poster_path;
        const rating = element.vote_average;
        const year = element.release_date.split('-')[0];
        console.log(image);

        // Vérification de l'image
        if (!image) {
          console.error(`Image not found for ${title}`);
          return;
        }

        // Création des éléments
        const swiperSlide = document.createElement('div');
        swiperSlide.classList.add('swiper-slide');

        const img = document.createElement('img');
        img.src = `https://image.tmdb.org/t/p/w500${image}`;
        img.alt = title;

        const hoverContent = document.createElement('div');
        hoverContent.classList.add('hover-content');

        const movieTitle = document.createElement('h1');
        movieTitle.classList.add('movie-title');
        movieTitle.textContent = title;

        const movieYear = document.createElement('p');
        movieYear.classList.add('movie-year');
        movieYear.textContent = year;

        const movieGenres = document.createElement('p');
        movieGenres.classList.add('movie-genres');
        movieGenres.textContent = "Genre info"; // Remplacez par les genres réels si disponibles

        const starRating = document.createElement('div');
        starRating.classList.add('star-rating');

        const starImg = document.createElement('img');
        starImg.classList.add('star');
        starImg.src = "image_BeMovie/hover_image.png";
        starImg.alt = "Star Icon";

        const ratingSpan = document.createElement('span');
        ratingSpan.textContent = rating;

        starRating.appendChild(starImg);
        starRating.appendChild(ratingSpan);

        hoverContent.appendChild(movieTitle);
        hoverContent.appendChild(movieYear);
        hoverContent.appendChild(movieGenres);
        hoverContent.appendChild(starRating);

        swiperSlide.appendChild(img);
        swiperSlide.appendChild(hoverContent);

        if (swiperWrapper) {
          swiperWrapper.appendChild(swiperSlide);
        } else {
          console.error('Swiper wrapper not found');
        }
      });

      initializeSwiper();

    } catch (error) {
      console.error("There has been a problem with your fetch operation:", error);
    }
  }



  async function movieGenre() {
    let currentDate = new Date().toISOString().slice(0, 10);
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `${KeyAPI}`,
      },
    };
  
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${currentDate}`,

        options
        
      );
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const data = await response.json();

      console.log(data.results);
    } catch (error) {
      console.error("There has been a problem with your fetch operation:", error);
    }
  }
  movieGenre();


  async function movieLatest() {
    let currentDate = new Date().toISOString().slice(0, 10);
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `${KeyAPI}`,
      },
    };
  
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&primary_release_date.lte=${currentDate}&sort_by=popularity.desc`,

        options
        
      );
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const data = await response.json();

      console.log(data.results);
    } catch (error) {
      console.error("There has been a problem with your fetch operation:", error);
    }
  }

  movieLatest()
});
