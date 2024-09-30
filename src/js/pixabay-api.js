export function fetchImages(query) {
  const APIKEY = '46229228-83a12c4f45cb396a8637e93cb';
  const URL = `https://pixabay.com/api/?key=${APIKEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true`;

  return fetch(URL)
    .then(response => response.json())
    .then(data => data.hits)
    .catch(error => {
      console.error('Error:', error);
      return [];
    });
}