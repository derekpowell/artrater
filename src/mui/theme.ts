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
	},
	palette: {
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
