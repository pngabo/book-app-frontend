import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import * as bookActions from '../../redux/actions/bookActions';
import * as authorActions from '../../redux/actions/authorActions';
import BookList from './BookList';



class CreateBook extends React.Component {
  state = {
    redirectToAddBookPage: false
  };
  componentDidMount() {
    const { books, authors, actions } = this.props;
    if (books.length === 0) {
      actions.loadBooks().catch(error => {
        alert('Loading books failed', error);
      });
    }
    if (authors.length === 0) {
      actions.loadAuthors().catch(error => {
        alert('Loading authors failed', error);
      });
    }
  }
  render() {
    return (
      <>
        {this.state.redirectToAddBookPage && <Redirect to="/book" />}
        <h2>Books</h2>
        <button
          style={{ marginBottom: 20 }}
          className="btn btn-primary add-book" onClick={() => this.setState({ redirectToAddBookPage: true })} >
          Add Book
        </button>
        <BookList books={this.props.books} />
      </>
    );
  }
}
CreateBook.propTypes = {
  authors: PropTypes.array.isRequired,
  books: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};
function mapStateToProps(state) {
  return {
    books: state.authors.length === 0 ? [] : state.books.map(book => {
      return {
        ...book,
        authorName: state.authors.find(a => a.id === book.authorId).name
      };
    }),
    authors: state.authors
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadBooks: bindActionCreators(bookActions.loadBooks, dispatch),
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch)
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateBook);