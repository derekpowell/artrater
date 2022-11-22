import React from 'react'

import { ThemeProvider } from '@mui/material'
import theme from './mui/theme'
import { Box } from '@mui/material'
import { styled } from '@mui/system'

import Header from './components/Header'
import RateMain from './components/RateMain'

const MainContainer = styled(Box)({
	minWidth: '100vw',
	minHeight: '100vh',
	padding: 0,
	margin: 0,
})

function App() {
	return (
		<ThemeProvider theme={theme}>
			<MainContainer>
				<Header />
				<RateMain />
			</MainContainer>
		</ThemeProvider>
	)
}

export default App
