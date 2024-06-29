var swiper = new Swiper(".mySwiper", {
    slidesPerView: 4,
    spaceBetween: 20,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
        clickable: true,
    },
});


var swiper = new Swiper(".mySwiper", {
    slidesPerView: 4,
    spaceBetween: 20,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
        clickable: true,
    },
});
const KeyAPI = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzODhiY2JlZTA2MjU5ZTM5ZDk0MDYzZmFkNzA4MDcxOCIsInN1YiI6IjY2NzRiYWFmNDliYTg0NjRkOTI4ZDcwYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9iCwoQA6MtVdLB8KE7DSP9PJivT4SAO_qD_LcygYjdA';

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

      console.log(data.results);
    } catch (error) {
      console.error("There has been a problem with your fetch operation:", error);
    }
  }

  movieFetch();

  async function movieGenre() {
    // let currentDate = new Date().toISOString().slice(0, 10);
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `${KeyAPI}`,
      },
    };
  
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${}`,

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

