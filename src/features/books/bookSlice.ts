import { createSlice } from '@reduxjs/toolkit'
import { IBook } from '../interfaces'
import {
	addNewBook,
	deleteOneBook,
	fetchAllBooks,
	fetchOneBook,
	modifyBookInfo,
} from './bookThunk'
import { RootState } from '../../app/store'

interface BookState {
	books: IBook[]
	book: IBook
	status: 'idle' | 'pending' | 'rejected' | 'fulfilled'
	creationStatus: 'idle' | 'pending' | 'rejected' | 'fulfilled'
	deletitionStatus: 'idle' | 'pending' | 'rejected' | 'fulfilled'
	getOneBookStatus: 'idle' | 'pending' | 'rejected' | 'fulfilled'
	modifyBookStatus: 'idle' | 'pending' | 'rejected' | 'fulfilled'
	error: string | null
}

const initialState: BookState = {
	books: [],
	book: {} as IBook,
	status: 'idle',
	creationStatus: 'idle',
	deletitionStatus: 'idle',
	getOneBookStatus: 'idle',
	modifyBookStatus: 'idle',
	error: 'null',
}

const bookSlice = createSlice({
	name: 'books',
	initialState,
	reducers: {
		resetSingleBookState: (state) => {
			state.getOneBookStatus = 'idle'
		},
		resetSingleModificationBookState: (state) => {
			state.modifyBookStatus = 'idle'
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchAllBooks.pending, (state) => {
				state.status = 'pending'
			})
			.addCase(fetchAllBooks.rejected, (state) => {
				state.status = 'rejected'
			})
			.addCase(fetchAllBooks.fulfilled, (state, action) => {
				state.books = action.payload
				state.status = 'fulfilled'
			})

			.addCase(addNewBook.pending, (state) => {
				state.creationStatus = 'pending'
			})
			.addCase(addNewBook.rejected, (state) => {
				state.creationStatus = 'rejected'
			})
			.addCase(addNewBook.fulfilled, (state) => {
				state.creationStatus = 'fulfilled'
			})

			.addCase(deleteOneBook.pending, (state) => {
				state.deletitionStatus = 'pending'
			})
			.addCase(deleteOneBook.rejected, (state) => {
				state.deletitionStatus = 'rejected'
			})
			.addCase(deleteOneBook.fulfilled, (state, action) => {
				state.books = state.books.filter(
					(book) => book._id !== action.payload
				)
				state.deletitionStatus = 'fulfilled'
			})

			.addCase(modifyBookInfo.pending, (state) => {
				state.modifyBookStatus = 'pending'
			})
			.addCase(modifyBookInfo.rejected, (state) => {
				state.modifyBookStatus = 'rejected'
			})
			.addCase(modifyBookInfo.fulfilled, (state) => {
				state.modifyBookStatus = 'fulfilled'
			})

			.addCase(fetchOneBook.pending, (state) => {
				state.getOneBookStatus = 'pending'
			})
			.addCase(fetchOneBook.rejected, (state) => {
				state.getOneBookStatus = 'rejected'
			})
			.addCase(fetchOneBook.fulfilled, (state, action) => {
				state.book = action.payload
				state.getOneBookStatus = 'fulfilled'
			})
	},
})

export default bookSlice.reducer

export const { resetSingleBookState } = bookSlice.actions
export const { resetSingleModificationBookState } = bookSlice.actions

export const fetchBooks = (state: RootState) => state.books.books
export const fetchSingleBook = (state: RootState) => state.books.book
export const fetchStatus = (state: RootState) => state.books.status
export const singleFetchStatus = (state: RootState) =>
	state.books.getOneBookStatus
export const fetchCreationStatus = (state: RootState) =>
	state.books.creationStatus
export const fetchDeletitionStatus = (state: RootState) =>
	state.books.deletitionStatus
export const fetchModifyStatus = (state: RootState) =>
	state.books.modifyBookStatus
