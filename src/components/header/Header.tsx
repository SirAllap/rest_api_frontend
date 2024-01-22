import AppBar from '@mui/material/AppBar'
import Stack from '@mui/material/Stack'
import { Alert, Box, Button, Modal, TextField, Typography } from '@mui/material'
import './header.css'
import AddIcon from '@mui/icons-material/Add'
import CheckIcon from '@mui/icons-material/Check'
import { useEffect, useState } from 'react'
import zIndex from '@mui/material/styles/zIndex'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { addNewBook } from '../../features/books/bookThunk'
import { fetchAllBooks } from '../../features/books/bookThunk'
import { fetchCreationStatus } from '../../features/books/bookSlice'

export const Header = () => {
	const dispatch = useAppDispatch()
	const creationStatusFetch = useAppSelector(fetchCreationStatus)
	const [open, setOpen] = useState(false)
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [description, setDescription] = useState('')
	const [price, setPrice] = useState('')
	const [alert, setAlert] = useState(false)

	if (alert) {
		setTimeout(() => {
			setAlert(false)
		}, 4500)
	}

	useEffect(() => {
		if (creationStatusFetch === 'pending') {
			console.log('pending')
		} else if (creationStatusFetch === 'fulfilled') {
			setAlert(true)
			setTitle('')
			setAuthor('')
			setDescription('')
			setPrice('')
			handleModal()
			dispatch(fetchAllBooks())
		} else if (creationStatusFetch === 'rejected') {
			console.log('rejected')
		}
	}, [creationStatusFetch, dispatch])

	const handleModal = () => setOpen((toggle) => !toggle)

	const handleBookCreation = () => {
		const newBook = {
			title: title,
			author: author,
			description: description,
			price: price,
		}
		dispatch(addNewBook(newBook))
	}

	return (
		<Stack spacing={2} sx={{ flexGrow: 1 }}>
			<Modal
				open={open}
				onClose={handleModal}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'
			>
				<Box sx={modal_style}>
					<TextField
						autoFocus
						margin='normal'
						type='text'
						required
						id='outlined-basic'
						label='Title'
						variant='outlined'
						fullWidth
						onChange={(e) => {
							setTitle(e.target.value)
						}}
					/>
					<TextField
						margin='normal'
						type='text'
						required
						id='outlined-basic'
						label='Author'
						variant='outlined'
						fullWidth
						onChange={(e) => {
							setAuthor(e.target.value)
						}}
					/>
					<TextField
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
							setDescription(e.target.value)
						}}
					/>
					<TextField
						margin='normal'
						type='number'
						required
						id='outlined-basic'
						label='Price'
						variant='outlined'
						fullWidth
						onChange={(e) => {
							setPrice(e.target.value)
						}}
					/>
					<Button
						variant='contained'
						style={{
							background:
								title === '' ||
								author === '' ||
								description === '' ||
								price === ''
									? '#2d2d2d3b'
									: '#2d2d2d',
							color: '#f4f2e9',
							border: 'none',
							textTransform: 'none',
							fontFamily: 'monospace',
						}}
						fullWidth
						size='large'
						endIcon={<AddIcon />}
						type='submit'
						id='create-button'
						className='create-button'
						sx={{ mt: 5 }}
						onClick={() => {
							handleBookCreation()
						}}
						disabled={
							title === '' ||
							author === '' ||
							description === '' ||
							price === ''
						}
						data-testid='create-button'
						data-cy='create-button'
						data-test-id='create-button'
						data-cy-id='create-button'
						data-test-id-id='create-button'
					>
						Create book
					</Button>
				</Box>
			</Modal>
			<AppBar
				position='sticky'
				className='container'
				style={{
					background: '#f4f2e9',
					boxShadow: 'none',
				}}
			>
				<div className='text-container'>
					<Typography
						className='header-title'
						fontWeight={700}
						fontFamily={'monospace'}
						fontSize={40}
					>
						Books Website
					</Typography>
					<Button
						className='header-add'
						variant='outlined'
						size='large'
						style={{
							borderRadius: '10px',
							fontSize: '20px',
							border: 'none',
							color: '#f4f2e9',
							background: '#2d2d2d',
							textTransform: 'none',
							fontFamily: 'monospace',
						}}
						endIcon={<AddIcon />}
						onClick={handleModal}
					>
						Add a new book
					</Button>
				</div>
			</AppBar>
			{alert && (
				<Alert
					icon={<CheckIcon fontSize='inherit' />}
					severity='success'
					variant='filled'
					sx={alert_style}
				>
					Book successfully added.
				</Alert>
			)}
		</Stack>
	)
}

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
