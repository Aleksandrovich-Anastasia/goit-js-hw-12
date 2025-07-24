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
    showToast('Please enter a search query!');
    return;
  }

  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);

    if (data.hits.length === 0) {
      showToast('Sorry, there are no images matching your search query.');
      return;
    }

    createGallery(data.hits);

    const totalPages = Math.ceil(data.totalHits / IMAGES_PER_PAGE);
    if (currentPage < totalPages) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
      showToast("We're sorry, but you've reached the end of search results.", 'end-toast');
    }

  } catch (error) {
    showToast('An error occurred. Please try again later.');
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
      showToast("We're sorry, but you've reached the end of search results.", 'end-toast');
    } else {
      showLoadMoreButton();
    }

    scrollByGallery();
  } catch (error) {
    showToast('Failed to load more images.');
  } finally {
    hideLoader();
  }
});

function showToast(message, customClass = 'custom-toast') {
  iziToast.info({
    class: customClass,
    icon: '',
    message: `
      <svg class="toast-icon" width="24" height="24">
        <use xlink:href="${spriteUrl}#icon-info"></use>
      </svg>
      <span class="info-text">${message}</span>
    `,
    dangerouslyHTML: true,
    position: 'topRight',
    timeout: 3000,
  });
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
