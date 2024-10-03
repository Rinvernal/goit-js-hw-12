import { fetchImages } from "./js/pixabay-api";
import { renderImages } from "./js/render-functions";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const form = document.querySelector("#form-input");
const gallery = document.querySelector(".gallery");
const loading = document.querySelector("#loadingId");
const loadMore = document.querySelector('#load-more');
let lightbox;
let currentPage = 1;
let query = '';
const perPage = 15;

loadMore.classList.add('hidden');

loadMore.addEventListener("click", async () => {
  currentPage++;
  showLoader();

  try {
    const { hits: images, totalHits } = await fetchImages(query, currentPage, perPage);
    hideLoader();

    if (images.length === 0) {
      iziToast.error({
        message: 'Sorry, there are no more images to load.',
        position: 'topCenter',
      });
      loadMore.classList.add('hidden');
    } else {
      renderImages(images);

      manageLightbox();

      const { height: cardHeight } = document.querySelector(".gallery").firstElementChild.getBoundingClientRect();
      window.scrollBy({
        top: cardHeight * 2,
        behavior: "smooth",
      });

      const totalLoadedImages = document.querySelectorAll('.gallery-item').length;
      if (totalLoadedImages >= totalHits) {
        loadMore.classList.add('hidden');
        iziToast.info({
          message: "We're sorry, but you've reached the end of search results.",
          position: 'topCenter',
        });
      }
    }
  } catch (error) {
    hideLoader();
    iziToast.error({
      message: 'Something went wrong, please try again later.',
      position: 'topCenter',
    });
  }
});

form.addEventListener("submit", async event => {
  event.preventDefault();
  query = document.querySelector('input[name="Search"]').value.trim();

  if (query === '') {
    iziToast.error({
      message: 'Please enter a search term.',
      position: 'topCenter',
    });
    gallery.innerHTML = '';
    form.reset();
    return;
  }

  currentPage = 1;
  gallery.innerHTML = ''; 
  showLoader();

  try {
    const { hits: images, totalHits } = await fetchImages(query, currentPage, perPage);
    hideLoader();

    if (images.length === 0) {
      iziToast.error({
        message: 'Sorry, there are no images matching your search query. Please try again!',
        position: 'topCenter',
      });
      gallery.innerHTML = '';
      form.reset();
      loadMore.classList.add('hidden');
    } else {
      renderImages(images);
      manageLightbox();
      if (totalHits > perPage) {
        loadMore.classList.remove('hidden');
      } else {
        loadMore.classList.add('hidden');
      }
    }
  } catch (error) {
    hideLoader();
    iziToast.error({
      message: 'Something went wrong, please try again later.',
      position: 'topCenter',
    });
    gallery.innerHTML = '';
    form.reset();
  }
});

function showLoader() {
  loading.classList.remove('hidden');
}

function hideLoader() {
  loading.classList.add('hidden');
}

function manageLightbox() {
  if (lightbox) {
    lightbox.destroy();
  }
  lightbox = new SimpleLightbox('.gallery a', {
    captionsData: "alt",
    captionPosition: "bottom",
    captionDelay: 250,
  });
}
