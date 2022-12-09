import React from 'react'

import { ThemeProvider } from '@mui/material'
import theme from './mui/theme'
import { Box } from '@mui/material'
import { styled } from '@mui/system'

import Header from './components/Header'
import RateMain from './components/RateMain'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
const MainContainer = styled(Box)({
	minWidth: '100vw',
	minHeight: '100vh',
	padding: 0,
	margin: 0,
})

function App() {
	const router = createBrowserRouter([
		{
			path: '/stars/:stars',
			element: <RateMain />,
			errorElement: <div>Error</div>,
		},
	])
	return (
		<ThemeProvider theme={theme}>
			<MainContainer>
				<Header />
				<RouterProvider router={router} />
			</MainContainer>
		</ThemeProvider>
	)
}

export default App
