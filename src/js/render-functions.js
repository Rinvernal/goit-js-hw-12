export function renderImages(images) {
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";

  const markup = images.map(image => `
    <li class="gallery-item">
      <div class="info-container">
        <a href="${image.largeImageURL}" class="link">
        
          <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
        </a>
        <div class="info">
          <p class="info-item"><span class="name-info">Likes</span> ${image.likes}</p>
          <p class="info-item"><span class="name-info">Views</span> ${image.views}</p>
          <p class="info-item"><span class="name-info">Comments</span> ${image.comments}</p>
          <p class="info-item"><span class="name-info">Downloads</span> ${image.downloads}</p>
        </div>
      </div>
    </li>
  `).join('');  

  gallery.innerHTML = markup;
}

