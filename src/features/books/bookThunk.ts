import { createAsyncThunk } from '@reduxjs/toolkit'
import { IBook } from '../interfaces'

const API_URL = import.meta.env.VITE_API_URL

export const fetchAllBooks = createAsyncThunk<IBook[]>(
	'books/fetchAllBooks',
	async () => {
		const response = await fetch(`${API_URL}/books`)
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`)
		} else {
			const data = await response.json()
			return data
		}
	}
)
