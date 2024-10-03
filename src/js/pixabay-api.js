import axios from 'axios';

export async function fetchImages(query, page = 1, perPage = 15) {
  const APIKEY = '46229228-83a12c4f45cb396a8637e93cb';
  const URL = `https://pixabay.com/api/?key=${APIKEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;

  try {
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    return { hits: [], totalHits: 0 };
  }
}