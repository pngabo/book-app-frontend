import * as types from '../constants/actionTypes';
import * as bookApi from '../../api/bookApi';

export function loadBooksSuccess(books) {
  return { type: types.LOAD_BOOKS_SUCCESS, books };
}
export function createBookSuccess(book) {
  return { type: types.CREATE_BOOK_SUCCESS, book };
}

export function updateBookSuccess(book) {
  return { type: types.UPDATE_BOOK_SUCCESS, book };
}

export function loadBooks() {
  return function (dispatch) {
    return bookApi.getBooks().then(books => {
      dispatch(loadBooksSuccess(books))
    }).catch(error => {
      throw error;
    })
  }
}
export function saveBook(book) {
  //eslint-disable-next-line no-unused-vars
  return function (dispatch) {
    return bookApi
      .saveBook(book)
      .then(savedBook => {
        book.id
          ? dispatch(updateBookSuccess(savedBook))
          : dispatch(createBookSuccess(savedBook));
      })
      .catch(error => {
        throw error;
      });
  };
}