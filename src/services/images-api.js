import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';
const API_KEY = '21858854-4e72a628a4c4c72c060e1a9f9';

const fetchImages = ({ searchQuery = '', currentPage = 1, pageSize = 12 }) => {
  return axios
    .get(`/?key=${API_KEY}&q=${searchQuery}
    &page=${currentPage}&image_type=photo&orientation=horizontal&per_page=${pageSize}`
    )
    .then(({data}) => data.hits);
};

export default { fetchImages };