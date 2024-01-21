import {
	Button,
	Card,
	CardActions,
	CardContent,
	Skeleton,
	Typography,
} from '@mui/material'
import './book.css'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { fetchAllBooks } from '../../features/books/bookThunk'
import { fetchBooks } from '../../features/books/bookSlice'
import { fetchStatus } from '../../features/books/bookSlice'
import { IBook } from '../../features/interfaces'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import EditIcon from '@mui/icons-material/Edit'

const Book = () => {
	const dispatch = useAppDispatch()
	const statusFetch = useAppSelector(fetchStatus)
	const booksFetch = useAppSelector(fetchBooks)
	const [books, setBooks] = useState<IBook[]>([])
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		dispatch(fetchAllBooks())
	}, [dispatch])

	useEffect(() => {
		if (statusFetch === 'pending') {
			setLoading(true)
		} else if (statusFetch === 'fulfilled') {
			setLoading(false)
			setBooks(booksFetch)
		} else if (statusFetch === 'rejected') {
			setLoading(false)
		}
	}, [statusFetch, booksFetch])

	return (
		<div className='card-container'>
			<Typography
				variant='h4'
				gutterBottom
				fontFamily={'monospace'}
				fontWeight={600}
				color={'#555555'}
				width={'100%'}
				align='center'
			>
				List of books
			</Typography>
			{loading && (
				<>
					{[...Array(6)].map((_, index) => (
						<Skeleton
							key={index}
							animation='wave'
							variant='rectangular'
							width={255}
							height={355}
						/>
					))}
				</>
			)}

			{books.map((book, index) => (
				<Card className='card' key={index}>
					<CardContent>
						<Typography
							color={'#555555'}
							sx={{
								fontSize: 17,
								fontWeight: 600,
								fontFamily: 'monospace',
								textAlign: 'center',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								height: 80,
							}}
							gutterBottom
						>
							{book.title}
						</Typography>
						<hr />
						<Typography
							fontFamily={'monospace'}
							color={'#555555'}
							variant='overline'
							sx={{ mt: 1, mb: 2 }}
						>
							- Writed by:
							<Typography
								fontFamily={'monospace'}
								fontWeight={700}
								textAlign={'justify'}
							>
								{book.author}
							</Typography>
						</Typography>
						<Typography
							fontFamily={'monospace'}
							color={'#555555'}
							textAlign={'justify'}
							variant='overline'
							sx={{ mb: 2 }}
						>
							- Description:
							<Typography
								className='book-description'
								fontWeight={700}
								fontFamily={'monospace'}
							>
								{book.description}
							</Typography>
						</Typography>
						<Typography
							color={'#555555'}
							sx={{ mb: 1.5 }}
							align='center'
							fontWeight={700}
							fontSize={17}
							fontFamily={'monospace'}
						>
							{book.price} €
						</Typography>
					</CardContent>
					<CardActions className='buttons-container'>
						<Button
							color='success'
							size='small'
							endIcon={<EditIcon />}
						>
							Edit
						</Button>
						<Button
							color='warning'
							size='small'
							endIcon={<DeleteForeverIcon />}
						>
							Delete
						</Button>
					</CardActions>
				</Card>
			))}
		</div>
	)
}

export default Book
