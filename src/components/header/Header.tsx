import React from 'react'
import AppBar from '@mui/material/AppBar'
import Stack from '@mui/material/Stack'
import { Typography } from '@mui/material'
import './header.css'

export const Header = () => {
	return (
		<Stack spacing={2} sx={{ flexGrow: 1 }}>
			<AppBar
				position='sticky'
				className='container'
				style={{
					background: '#f4f2e9',
					boxShadow: 'none',
					padding: '15px',
				}}
			>
				<Typography
					align='center'
					fontSize={40}
					fontWeight={700}
					fontFamily={'monospace'}
					color={'#555555'}
				>
					Books Website
				</Typography>
			</AppBar>
		</Stack>
	)
}
