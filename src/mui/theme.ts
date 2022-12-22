import { createTheme } from '@mui/material'

const theme = createTheme({
	typography: {
		h1: {
			fontSize: 32,
			fontWeight: 700,
		},
		h2: {
			fontSize: 20,
			fontWeight: 500,
		},
		h3: {
			fontSize: 22,
			lineHeight: '40px',
			fontWeight: 600,
			color: '#101223',
		},
		h4: {
			fontSize: 20,
			lineHeight: '40px',
			fontWeight: 400,
			fontStyle: 'italic',
			color: 'rgba(16, 18, 35, 0.8)',
		},
	},
	palette: {
		primary: {
			main: '#101223',
		},
		common: {
			black: '#101223',
		},
	},
	components: {
		MuiIconButton: {
			variants: [
				{
					props: { size: 'large' },
					style: {
						width: 50,
						height: 'auto',
						fontSize: 50,
					},
				},
			],
		},
	},
})

export default theme
