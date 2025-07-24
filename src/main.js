import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import './css/izi-toast-custom.css';
import spriteUrl from './img/sprite.svg';

const form = document.querySelector('.form');
const input = document.querySelector('input[name="search-text"]');
const loadMoreBtn = document.querySelector('.load-more');

let currentPage = 1;
let currentQuery = '';
const IMAGES_PER_PAGE = 15;

form.addEventListener('submit', async e => {
  e.preventDefault();

  currentQuery = input.value.trim();
  currentPage = 1;

  if (!currentQuery) {
    showErrorToast('Please enter a search query!');
    return;
  }

  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);

    if (data.hits.length === 0) {
      showErrorToast('Sorry, there are no images matching your search query.');
      return;
    }

    createGallery(data.hits);

    const totalPages = Math.ceil(data.totalHits / IMAGES_PER_PAGE);
    if (currentPage < totalPages) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
      showEndToast("We're sorry, but you've reached the end of search results.");
    }
  } catch (error) {
    showErrorToast('An error occurred. Please try again later.');
  } finally {
    hideLoader();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage++;
  showLoader();
  hideLoadMoreButton();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    createGallery(data.hits);

    const totalPages = Math.ceil(data.totalHits / IMAGES_PER_PAGE);
    if (currentPage >= totalPages) {
      hideLoadMoreButton();
      showEndToast("We're sorry, but you've reached the end of search results.");
    } else {
      showLoadMoreButton();
    }

    scrollByGallery();
  } catch (error) {
    showErrorToast('Failed to load more images.');
  } finally {
    hideLoader();
  }
});

function showToast(message, iconId, spanClass, toastMethod = 'info', extraClass = '') {
  iziToast[toastMethod]({
    class: `custom-toast ${extraClass}`.trim(),
    icon: '',
    message: `
      <svg class="toast-icon" width="24" height="24">
        <use xlink:href="${spriteUrl}#${iconId}"></use>
      </svg>
      <span class="${spanClass}">${message}</span>
    `,
    dangerouslyHTML: true,
    position: 'topRight',
    timeout: 3000,
  });
}

function showErrorToast(message) {
  showToast(message, 'icon-error', 'error-text', 'error');
}

function showEndToast(message) {
  showToast(message, 'icon-info', 'info-text', 'info', 'end-toast');
}

function scrollByGallery() {
  const firstCard = document.querySelector('.gallery-item');
  if (!firstCard) return;

  const { height: cardHeight } = firstCard.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
