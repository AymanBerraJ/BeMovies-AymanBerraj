const KeyAPI = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzODhiY2JlZTA2MjU5ZTM5ZDk0MDYzZmFkNzA4MDcxOCIsInN1YiI6IjY2NzRiYWFmNDliYTg0NjRkOTI4ZDcwYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9iCwoQA6MtVdLB8KE7DSP9PJivT4SAO_qD_LcygYjdA";

// fetch movie actual
const btnSearch = document.querySelector('.button_search');
if (btnSearch) {
    btnSearch.addEventListener('click', () => {
        const input = document.getElementById("search_input");
        const valueInput = input.value;
        btnSearch.style.display = 'block';

        if (valueInput) {
            const newUrl = new URL(window.location.href);
            newUrl.searchParams.set('query', valueInput);
            window.history.pushState({ path: newUrl.href }, '', newUrl.href);

            movieFetch(valueInput);
        }
    });
}

// Fonction pour afficher les résultats
function displayResults(results) {
    const resultsContainer = document.querySelector('.results_search .swiper-wrapper');
    resultsContainer.innerHTML = '';

    results.forEach(movie => {
        const slide = document.createElement('div');
        slide.classList.add('swiper-slide');

        const img = document.createElement('img');
        img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        img.alt = movie.title;

        const hoverContent = document.createElement('div');
        hoverContent.classList.add('hover-content');

        const title = document.createElement('h1');
        title.classList.add('movie-title');
        title.textContent = movie.title;

        const year = document.createElement('p');
        year.classList.add('movie-year');
        year.textContent = new Date(movie.release_date).getFullYear();

        const genres = document.createElement('p');
        genres.classList.add('movie-genres');
        genres.textContent = movie.genre_ids.join('/');

        const rating = document.createElement('div');
        rating.classList.add('star-rating');
        const starImg = document.createElement('img');
        starImg.classList.add('star');
        starImg.src = "image_BeMovie/hover_image.png";
        starImg.alt = "Star Icon";
        const ratingSpan = document.createElement('span');
        ratingSpan.textContent = movie.vote_average;

        rating.appendChild(starImg);
        rating.appendChild(ratingSpan);

        hoverContent.appendChild(title);
        hoverContent.appendChild(year);
        hoverContent.appendChild(genres);
        hoverContent.appendChild(rating);

        slide.appendChild(img);
        slide.appendChild(hoverContent);

        resultsContainer.appendChild(slide);
    });

    // Reinitialise le swiper pour inclure les nouvelles slides
    new Swiper('.mySwiper', {
        slidesPerView: 4,
        spaceBetween: 20,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
            clickable: true,
        },
    });
}

async function movieFetch(research = '') {
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: `${KeyAPI}`,
        },
    };

    const url = research
        ? `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(research)}&include_adult=false&language=en-US&page=1`
        : `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`;

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await response.json();
        displayResults(data.results);
    } catch (error) {
        console.error("There has been a problem with your fetch operation:", error);
    }
}

movieFetch();

async function movieGenre(genre = '') {
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: `${KeyAPI}`,
        },
    };

    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genre}`,
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
    const currentDate = new Date().toISOString().slice(0, 10);
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

movieLatest();

const btnModalLogin = document.querySelector(".modal-logSign");
const btnModalRegister = document.querySelector(".modal-register");
const overlay = document.querySelector(".overlay_modal");
const modalLog = document.querySelector(".modal_Login");
const redBlack = document.getElementById("btn_red");
const blackRed = document.getElementById("btn_black");

// Modal Bouton Login / Register
    btnModalLogin.addEventListener("click", () => {
        overlay.style.display = "block";
        modalLog.style.display = "block";
        redBlack.classList.add("login");
        redBlack.classList.remove("click_black");
        blackRed.classList.add("signup");
        blackRed.classList.remove("click_red");

        const closeModal = document.getElementById("close_button");
        if (closeModal) {
            closeModal.addEventListener("click", () => {
                overlay.style.display = "none";
                modalLog.style.display = "none";
            });
        }

        overlay.addEventListener("click", () => {
            overlay.style.display = "none";
            modalLog.style.display = "none";
        });

        blackRed.addEventListener("click", () => {
            redBlack.classList.add("click_black");
            redBlack.classList.remove("login");
            blackRed.classList.remove("signup");
            blackRed.classList.add("click_red");
        });
        redBlack.addEventListener("click", () => {
            redBlack.classList.add("login");
            redBlack.classList.remove("click_black");
            blackRed.classList.add("signup");
            blackRed.classList.remove("click_red");
        });
    });

    btnModalRegister.addEventListener("click", () => {
        overlay.style.display = "block";
        modalLog.style.display = "block";
        redBlack.classList.add("click_black");
        redBlack.classList.remove("login");
        blackRed.classList.remove("signup");
        blackRed.classList.add("click_red");

        const closeModal = document.getElementById("close_button");
        if (closeModal) {
            closeModal.addEventListener("click", () => {
                overlay.style.display = "none";
                modalLog.style.display = "none";
            });
        }

        overlay.addEventListener("click", () => {
            overlay.style.display = "none";
            modalLog.style.display = "none";
        });

        redBlack.addEventListener("click", () => {
            redBlack.classList.add("login");
            redBlack.classList.remove("click_black");
            blackRed.classList.add("signup");
            blackRed.classList.remove("click_red");
        });
        blackRed.addEventListener("click", () => {
            redBlack.classList.add("click_black");
            redBlack.classList.remove("login");
            blackRed.classList.remove("signup");
            blackRed.classList.add("click_red");
        });
    });

// Swiper
new Swiper(".mySwiper", {
    slidesPerView: 4,
    spaceBetween: 20,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
        clickable: true,
    },
});
