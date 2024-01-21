import { createSlice } from '@reduxjs/toolkit'
import { IBook } from '../interfaces'
import { fetchAllBooks } from './bookThunk'
import { RootState } from '../../app/store'

interface BookState {
	books: IBook[]
	status: 'idle' | 'pending' | 'rejected' | 'fulfilled'
	error: string | null
}

const initialState: BookState = {
	books: [],
	status: 'idle',
	error: 'null',
}

const bookSlice = createSlice({
	name: 'books',
	initialState,
	reducers: {},
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
	},
})

export default bookSlice.reducer

export const fetchBooks = (state: RootState) => state.books.books
export const fetchStatus = (state: RootState) => state.books.status
