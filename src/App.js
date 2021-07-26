import { Component } from 'react';
import Loader from "react-loader-spinner";
import imagesApi from './services/images-api';
import Container from './components/Container';
import ImageGallery from './components/ImageGallery';
import Searchbar from './components/Searchbar';
import Button from './components/Button';
import Modal from './components/Modal';

import styles from './App.module.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";


class App extends Component {
  state = {
    hits: [],
    currentPage: 1,
    searchQuery: '',
    isLoading: false,
    error: null,
    showModal: false,
    largeImageURL: '',
    tags: '',
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchImages();
    }
  }

  onChangeQuery = query => {
    this.setState({ searchQuery: query, currentPage: 1, hits: [], error: null });
  }

  fetchImages = () => {
    const { currentPage, searchQuery } = this.state;
    const options = { searchQuery, currentPage };

    this.setState({ isLoading: true });

    imagesApi.fetchImages(options)
      .then(hits => {
        this.setState(prevState => ({
          hits: [...prevState.hits, ...hits],
          currentPage: prevState.currentPage + 1,
        }));
      })
      .then(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      })
      .catch(error => this.setState({error: error.message}))
      .finally(() => this.setState({ isLoading: false }));
  };

  onModal = ({ largeImageURL, tags }) => {
    this.setState({
      largeImageURL: largeImageURL,
      tags: tags,
    });
    this.toggleModal();
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { hits, isLoading, error, showModal, largeImageURL, tags } = this.state;
    const shouldRenderLoadMoreButton = hits.length > 0 && !isLoading;

    return (
      <Container>
        
        <Searchbar onSubmit={this.onChangeQuery} />
        <ImageGallery hits={hits} onClick={this.onModal}/>

        {error && <h1>Try again!</h1>}
          
        {shouldRenderLoadMoreButton && <Button onClick={this.fetchImages} />}

        {isLoading &&
          <Loader
            type="BallTriangle"
            color="#00BFFF"
            height={200}
            width={200}
            className={styles.Loader}
          />}
        
        {showModal && (<Modal onClose={this.toggleModal}>
           <img src={largeImageURL} alt={tags} />
        </Modal>
        )}

      </Container>
    );
  }
}

export default App;
