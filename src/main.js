import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import './css/izi-toast-custom.css'; // Кастомні стилі
import spriteUrl from './img/sprite.svg';

const form = document.querySelector('.form');
const input = document.querySelector('input[name="search-text"]');

form.addEventListener('submit', async e => {
  e.preventDefault();

  const query = input.value.trim();

  if (!query) {
    iziToast.error({
      message: `
        <svg class="toast-icon" width="24" height="24">
          <use xlink:href="${spriteUrl}#icon-error"></use>
        </svg>
        <span class="error-text">Please enter a search query!</span>
      `,
      dangerouslyHTML: true,
      position: 'topRight',
      timeout: 3000,
    });
    return;
  }

  clearGallery();
  showLoader();

  try {
    const data = await getImagesByQuery(query);

    if (data.hits.length === 0) {
      iziToast.warning({
  class: 'custom-toast',
  icon: '',
  message: `
    <svg class="toast-icon" width="24" height="24">
      <use xlink:href="${spriteUrl}#icon-error"></use>
    </svg>
    <span class="error-text">Sorry, there are no images matching your search query. Please try again!</span>
  `,
  dangerouslyHTML: true,
  position: 'topRight',
  timeout: 3000, 
  close: true,
});

    } else {
      createGallery(data.hits);
    }
  } catch (err) {
      iziToast.error({
      class: 'custom-toast',
      icon: '',
      message: `
        <svg class="toast-icon" width="24" height="24">
          <use xlink:href="${spriteUrl}#icon-error"></use>
        </svg>
        <span class="error-text">An error occurred. Please try again later.</span>
      `,
      dangerouslyHTML: true,
      position: 'topRight',
      timeout: 3000,
    });
  } finally {
    hideLoader();
  }
});
