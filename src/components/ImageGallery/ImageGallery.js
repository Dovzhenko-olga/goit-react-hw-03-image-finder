import styles from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem';
import PropTypes from 'prop-types';

const ImageGallery = ({ hits, onClick }) => {
  return (
    <ul className={styles.ImageGallery}>
      {hits.map(({ id, tags, webformatURL, largeImageURL }) => (
        <ImageGalleryItem key={id} tags={tags} webformatURL={webformatURL} largeImageURL={largeImageURL} onClick={onClick} />
      ))}
    </ul >
  );
};

ImageGallery.propTypes = {
  hits: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGallery;