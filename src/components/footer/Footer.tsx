import { Link, Stack, Typography } from '@mui/material'
import './footer.css'

function Footer() {
	return (
		<div className='footer'>
			<span>
				<Stack direction='row' alignItems='center' gap={1}>
					<Typography
						sx={{ fontSize: '1rem' }}
						color={'#555555'}
						fontFamily={'monospace'}
					>
						Check this project here:{' '}
						<Link
							color={'#555555'}
							fontWeight={700}
							underline='hover'
							href='https://github.com/SirAllap/rest_api_frontend'
							target='_blank'
						>
							GitHub
						</Link>
					</Typography>
				</Stack>
			</span>
		</div>
	)
}

export default Footer
