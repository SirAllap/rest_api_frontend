import {
	Alert,
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	Modal,
	Skeleton,
	TextField,
	Typography,
} from '@mui/material'
import './book.css'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
	deleteOneBook,
	fetchAllBooks,
	fetchOneBook,
	modifyBookInfo,
} from '../../features/books/bookThunk'
import { fetchBooks } from '../../features/books/bookSlice'
import { fetchSingleBook } from '../../features/books/bookSlice'
import { fetchStatus } from '../../features/books/bookSlice'
import { singleFetchStatus } from '../../features/books/bookSlice'
import { fetchDeletitionStatus } from '../../features/books/bookSlice'
import { fetchModifyStatus } from '../../features/books/bookSlice'
import { IBook } from '../../features/interfaces'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import EditIcon from '@mui/icons-material/Edit'
import CheckIcon from '@mui/icons-material/Check'
import FullscreenIcon from '@mui/icons-material/Fullscreen'
import zIndex from '@mui/material/styles/zIndex'
import {
	resetSingleBookState,
	resetSingleModificationBookState,
} from '../../features/books/bookSlice'

const Book = () => {
	const dispatch = useAppDispatch()
	const booksFetch = useAppSelector(fetchBooks)
	const statusFetch = useAppSelector(fetchStatus)
	const singleStatusFetch = useAppSelector(singleFetchStatus)
	const singleBookFetch = useAppSelector(fetchSingleBook)
	const deletitionStatusFetch = useAppSelector(fetchDeletitionStatus)
	const modificationStatusFetch = useAppSelector(fetchModifyStatus)
	const [books, setBooks] = useState<IBook[]>([])
	const [book, setBook] = useState<IBook>({} as IBook)
	const [loading, setLoading] = useState(false)
	const [deleteAlert, setDeleteAlert] = useState(false)
	const [openEditionModal, setOpenEditionModal] = useState(false)
	const [openModal, setOpenModal] = useState(false)
	const [newTitle, setNewTitle] = useState('')
	const [newAuthor, setNewAuthor] = useState('')
	const [newDescription, setNewDescription] = useState('')
	const [newPrice, setNewPrice] = useState('')

	if (deleteAlert) {
		setTimeout(() => {
			setDeleteAlert(false)
		}, 4500)
	}

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
		if (deletitionStatusFetch === 'pending') {
			console.log('pending')
		} else if (deletitionStatusFetch === 'fulfilled') {
			setDeleteAlert(true)
		} else if (deletitionStatusFetch === 'rejected') {
			console.log('rejected')
		}
		if (singleStatusFetch === 'fulfilled') {
			setBook(singleBookFetch)
		}
		if (modificationStatusFetch === 'fulfilled') {
			setNewTitle('')
			setNewAuthor('')
			setNewDescription('')
			setNewPrice('')
			handleEditionModal()
		}
	}, [
		statusFetch,
		booksFetch,
		deletitionStatusFetch,
		singleStatusFetch,
		singleBookFetch,
		modificationStatusFetch,
		dispatch,
	])

	const handleDeletition = (id: string) => {
		dispatch(deleteOneBook(id))
	}

	const handleOneBookModal = () => setOpenModal((toggle) => !toggle)
	const handleOpenBook = (id: string) => {
		dispatch(fetchOneBook(id))
		handleOneBookModal()
	}

	const handleEditionModal = () => setOpenEditionModal((toggle) => !toggle)
	const handleBookEdition = (id: string) => {
		dispatch(fetchOneBook(id))
		handleEditionModal()
	}

	const handleApplyBookEdition = () => {
		const modifiedBook = {
			_id: book._id,
			title: newTitle ? newTitle : book.title,
			author: newAuthor ? newAuthor : book.author,
			description: newDescription ? newDescription : book.description,
			price: newPrice ? newPrice : book.price,
		}
		dispatch(modifyBookInfo(modifiedBook))
	}

	return (
		<div className='card-container'>
			<Modal
				open={openEditionModal}
				onClose={() => {
					handleEditionModal()
					dispatch(resetSingleModificationBookState())
				}}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'
			>
				<Box sx={modal_style}>
					<TextField
						defaultValue={book.title}
						autoFocus
						margin='normal'
						type='text'
						required
						id='outlined-basic'
						label='Title'
						variant='outlined'
						fullWidth
						onChange={(e) => {
							setNewTitle(e.target.value)
						}}
					/>
					<TextField
						defaultValue={book.author}
						margin='normal'
						type='text'
						required
						id='outlined-basic'
						label='Author'
						variant='outlined'
						fullWidth
						onChange={(e) => {
							setNewAuthor(e.target.value)
						}}
					/>
					<TextField
						defaultValue={book.description}
						margin='normal'
						type='text'
						required
						id='outlined-basic'
						label='Description'
						variant='outlined'
						fullWidth
						multiline
						rows={4}
						onChange={(e) => {
							setNewDescription(e.target.value)
						}}
					/>
					<TextField
						defaultValue={book.price}
						margin='normal'
						type='number'
						required
						id='outlined-basic'
						label='Price'
						variant='outlined'
						fullWidth
						onChange={(e) => {
							setNewPrice(e.target.value)
						}}
					/>
					<Button
						variant='contained'
						style={{
							background: '#2d2d2d',
							color: '#f4f2e9',
							border: 'none',
							textTransform: 'none',
							fontFamily: 'monospace',
						}}
						fullWidth
						size='large'
						type='submit'
						id='create-button'
						className='create-button'
						sx={{ mt: 5 }}
						onClick={() => {
							handleApplyBookEdition()
						}}
					>
						Modify book
					</Button>
				</Box>
			</Modal>
			<Modal
				open={openModal}
				onClose={() => {
					handleOneBookModal()
					dispatch(resetSingleBookState())
				}}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'
			>
				<Box sx={modalContainerStyle}>
					<Typography variant='h4' sx={modalTitleStyle}>
						{book.title}
					</Typography>
					<Typography variant='subtitle1' sx={modalSubtitleStyle}>
						Writed by{' '}
						<span style={{ fontWeight: 600 }}>{book.author}</span>
					</Typography>
					<Typography variant='body1' sx={modalTextStyles}>
						<span style={{ fontWeight: 600 }}>
							{book.description}
						</span>
					</Typography>
					<Typography variant='body1' sx={modalTextStyles}>
						Price:{' '}
						<span style={{ fontWeight: 700, fontSize: 20 }}>
							{book.price} €
						</span>
					</Typography>
				</Box>
			</Modal>

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
							textAlign={'justify'}
							fontWeight={700}
							sx={{
								mb: 2,
							}}
						>
							- Writed by:
							<Typography
								fontFamily={'monospace'}
								textTransform={'none'}
								fontSize={14}
							>
								{book.author}
							</Typography>
						</Typography>
						<Typography
							fontFamily={'monospace'}
							color={'#555555'}
							textAlign={'justify'}
							variant='overline'
							fontWeight={700}
							sx={{ mb: 2 }}
						>
							- Description:
							<Typography
								className='book-description'
								fontFamily={'monospace'}
								textTransform={'none'}
								fontSize={14}
							>
								{book.description}
							</Typography>
						</Typography>
						<Typography
							color={'#555555'}
							sx={{ mt: 2, mb: 6 }}
							fontWeight={700}
							fontSize={15}
							fontFamily={'monospace'}
						>
							{book.price} €
						</Typography>
					</CardContent>
					<CardActions className='buttons-container'>
						<Button
							color='success'
							variant='outlined'
							onClick={() => {
								book._id && handleBookEdition(book._id)
							}}
						>
							<EditIcon />
						</Button>
						<Button
							color='warning'
							variant='outlined'
							onClick={() => {
								book._id && handleDeletition(book._id)
							}}
						>
							<DeleteForeverIcon />
						</Button>
						<Button
							color='success'
							variant='outlined'
							onClick={() => {
								book._id && handleOpenBook(book._id)
							}}
						>
							<FullscreenIcon />
						</Button>
					</CardActions>
				</Card>
			))}
			{deleteAlert && (
				<Alert
					icon={<CheckIcon fontSize='inherit' />}
					severity='warning'
					variant='filled'
					sx={alert_style}
				>
					Book successfully deleted.
				</Alert>
			)}
		</div>
	)
}

export default Book

const modal_style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 600,
	height: 500,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
}

const alert_style = {
	position: 'fixed',
	top: '10%',
	right: '5%',
	width: 300,
	zIndex: zIndex.modal,
	fontSize: '20px',
}

const modalContainerStyle = {
	position: 'fixed',
	top: '10%',
	right: '5%',
	width: 300,
	zIndex: zIndex.modal,
	backgroundColor: '#fff',
	border: '1px solid #ccc',
	borderRadius: 8,
	padding: 20,
}

const modalTitleStyle = {
	fontSize: '1.5rem',
	marginBottom: 10,
}

const modalSubtitleStyle = {
	fontSize: '1rem',
	marginBottom: 8,
}

const modalTextStyles = {
	fontSize: '1rem',
	marginBottom: 8,
}
