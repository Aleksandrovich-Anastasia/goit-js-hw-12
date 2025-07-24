import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryContainer = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more');

const lightbox = new SimpleLightbox('.gallery a');

export function createGallery(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
      <li class="gallery-item">
        <a href="${largeImageURL}">
          <img src="${webformatURL}" alt="${tags}" loading="lazy" />
          <div class="info">
            <div class="info-item"><span class="label">Likes</span><span class="value">${likes}</span></div>
            <div class="info-item"><span class="label">Views</span><span class="value">${views}</span></div>
            <div class="info-item"><span class="label">Comments</span><span class="value">${comments}</span></div>
            <div class="info-item"><span class="label">Downloads</span><span class="value">${downloads}</span></div>
          </div>
        </a>
      </li>`
    )
    .join('');

  galleryContainer.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery() {
  galleryContainer.innerHTML = '';
}

export function showLoader() {
  loader.classList.add('is-visible');
  loader.classList.remove('is-hidden');
}

export function hideLoader() {
  loader.classList.remove('is-visible');
  loader.classList.add('is-hidden');
}

export function showLoadMoreButton() {
  loadMoreBtn.classList.remove('is-hidden');
}

export function hideLoadMoreButton() {
  loadMoreBtn.classList.add('is-hidden');
}
