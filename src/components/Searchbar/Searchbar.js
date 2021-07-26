import { Component } from 'react';
import PropTypes from 'prop-types';
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