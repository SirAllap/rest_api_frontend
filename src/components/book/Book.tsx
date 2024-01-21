import React from 'react'
import {
	Button,
	Card,
	CardActions,
	CardContent,
	Typography,
} from '@mui/material'
import './book.css'

const Book = () => {
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
			<Card className='card'>
				<CardContent>
					<Typography
						color={'#555555'}
						sx={{ fontSize: 19 }}
						gutterBottom
					>
						Title:
					</Typography>
					<hr />
					<Typography color={'#555555'} sx={{ mb: 1.5 }}>
						Author:
					</Typography>
					<Typography color={'#555555'} sx={{ mb: 1.5 }}>
						Description:
					</Typography>
					<Typography color={'#555555'} sx={{ mb: 1.5 }}>
						Price:
					</Typography>
				</CardContent>
				<CardActions className='buttons-container'>
					<Button size='small'>Edit</Button>
					<Button size='small'>Delete</Button>
				</CardActions>
			</Card>
		</div>
	)
}

export default Book
