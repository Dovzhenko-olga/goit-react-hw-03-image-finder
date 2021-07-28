import { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import styles from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    query: '',
  }

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  handleChange = e => {
  this.setState({ query: e.currentTarget.value})
  }
  
  handleSubmit = e => {
    e.preventDefault();

    if (this.state.query.trim() === '') {
      return toast('Enter a value to search.', {
        className: styles.toaster
      });
    }
    this.props.onSubmit(this.state.query);
    this.setState({ query: ''})
  }

  render() {
    return (
    <header className={styles.Searchbar}>
      <form className={styles.SearchForm} onSubmit={this.handleSubmit}>
        <button type="submit" className={styles.button}>
          <span className={styles.label}>Search</span>
        </button>

        <input
          className={styles.input}
          value={this.state.query}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={this.handleChange}
        />
      </form>
    </header>
    );
  }
}

export default Searchbar;