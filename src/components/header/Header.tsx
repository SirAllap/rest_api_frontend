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
				}}
			>
				<Typography
					className='header-title'
					fontWeight={700}
					fontFamily={'monospace'}
					fontSize={40}
					margin={'0 auto'}
				>
					Books Website
				</Typography>
			</AppBar>
		</Stack>
	)
}
