const accessKey = "AfwoMP1jrURfWWY48PfNbQNYX0d5VqKqWmrZ10ti8UdiHOELl9ojjIHD"; // Replace with your Pexels API Key

const formEl = document.querySelector("form");
const searchInputEl = document.getElementById("search-input");
const searchResultsEl = document.querySelector(".search-results");
const showMoreButtonEl = document.getElementById("show-more-button");
const categoryEls = document.querySelectorAll(".category");

let inputData = "";
let page = 1;

async function searchImages() {
  inputData = searchInputEl.value;
  const url = `https://api.pexels.com/v1/search?query=${inputData}&per_page=12&page=${page}`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: accessKey,
      },
    });
    const data = await response.json();

    if (page === 1) {
      searchResultsEl.innerHTML = "";
    }

    if (!data.photos || data.photos.length === 0) {
      console.error("No images found.");
      return;
    }

    data.photos.forEach((photo) => {
      const imageWrapper = document.createElement("div");
      imageWrapper.classList.add("search-result");

      const image = document.createElement("img");
      image.src = photo.src.medium;
      image.alt = photo.alt;

      const imageLink = document.createElement("a");
      imageLink.href = photo.url;
      imageLink.target = "_blank";
      imageLink.textContent = photo.alt;

      imageWrapper.appendChild(image);
      imageWrapper.appendChild(imageLink);
      searchResultsEl.appendChild(imageWrapper);
    });

    page++;
    if (page > 1) {
      showMoreButtonEl.style.display = "block";
    }
  } catch (error) {
    console.error("Error fetching images:", error);
  }
}

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchImages();
});

showMoreButtonEl.addEventListener("click", () => {
  searchImages();
});

categoryEls.forEach((categoryEl) => {
  categoryEl.addEventListener("click", () => {
    inputData = categoryEl.dataset.query;
    searchInputEl.value = inputData;
    page = 1;
    searchImages();
  });
});
