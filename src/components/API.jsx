import axios from 'axios';

axios.defaults.baseURL = `https://pixabay.com/api`;

export const fetchImages = async (searchQuery, page) => {
  const response = await axios.get(
    `/?q=${searchQuery}&page=${page}&key=32079865-e2e12c38828ecac1e7059915f&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response.data;
};