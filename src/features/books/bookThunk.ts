import { createAsyncThunk } from '@reduxjs/toolkit'
import { IBook } from '../interfaces'

const API_URL = import.meta.env.VITE_API_URL

export const fetchAllBooks = createAsyncThunk<IBook[]>(
	'books/fetchAllBooks',
	async () => {
		const response = await fetch(`${API_URL}/books`, {
			method: 'GET',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
			},
		})
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`)
		} else {
			const data = await response.json()
			return data
		}
	}
)

export const addNewBook = createAsyncThunk(
	'books/addNewBook',
	async (body: IBook) => {
		const response = await fetch(`${API_URL}/books`, {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		})
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`)
		} else {
			const data = await response.json()
			return data
		}
	}
)

export const deleteOneBook = createAsyncThunk(
	'books/deleteOneBook',
	async (id: string) => {
		const response = await fetch(`${API_URL}/books/${id}`, {
			method: 'DELETE',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
			},
		})
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`)
		} else {
			return id
		}
	}
)
