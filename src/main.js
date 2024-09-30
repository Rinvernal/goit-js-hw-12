import { fetchImages } from "./js/pixabay-api";
import { renderImages } from "./js/render-functions";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const form = document.querySelector("#form-input");
const gallery = document.querySelector(".gallery");
const loading = document.querySelector("#loadingId");

let lightbox;

function showLoader() {
  loading.classList.remove('hidden');
}

function hideLoader() {
  loading.classList.add('hidden');
}

form.addEventListener("submit", event => {
  event.preventDefault();
  const query = document.querySelector('input[name = "Search"]').value.trim();
  
  if (query === '') {
    iziToast.error({
      message: 'Please enter a search term.',
      position: 'topCenter',
    });
    gallery.innerHTML = '';
    form.reset();
    return;
  }

  showLoader();

  fetchImages(query)
  .then(images => {
    hideLoader();

    if (images.length === 0) {
      iziToast.error({
      message: 'Sorry, there are no images matching your search query. Please try again!',
      position: 'topCenter',
     });
     gallery.innerHTML = '';
     form.reset();
    } else {
      gallery.innerHTML = '';
      renderImages(images); 
      
      if (lightbox) {
        lightbox.destroy();
      }

      lightbox = new SimpleLightbox('.gallery a', {
        captionsData: "alt",
        captionPosition: "bottom",
        captionDelay: 250,
      });
      }
      form.reset();
  })
  .catch(error => {
    hideLoader();

    iziToast.error({
      message: 'Something went wrong, please try again later.',
      position: 'topCenter',
    });
    gallery.innerHTML = '';
    form.reset();
  })
});