import React from 'react'

import { ThemeProvider } from '@mui/material'
import theme from './mui/theme'
import { Box } from '@mui/material'
import { styled } from '@mui/system'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Header from './components/Header'
import RateMain from './components/RateMain'
import NotFound from './components/NotFound'

const MainContainer = styled(Box)({
	minWidth: '100vw',
	minHeight: '100vh',
	padding: 0,
	margin: 0,
	overflow: 'hidden',
})

function App() {
	const router = createBrowserRouter([
		{
			path: '/:rates',
			element: <RateMain />,
			errorElement: <NotFound />,
		},
		{
			path: '/:rates/extUserId/:extUserId',
			element: <RateMain />,
			errorElement: <NotFound />,
		},
		{
			path: '/:rates/extUserId/:extUserId/groupId/:groupId',
			element: <RateMain />,
			errorElement: <NotFound />,
		},
		{
			path: '/:rates/extUserId/:extUserId/groupId/:groupId/misc/:misc',
			element: <RateMain />,
			errorElement: <NotFound />,
		},
		{
			path: '/:rates/extUserId/:extUserId/misc/:misc',
			element: <RateMain />,
			errorElement: <NotFound />,
		},
		{
			path: '/:rates/extUserId/:extUserId/misc/:misc/groupId/:groupId',
			element: <RateMain />,
			errorElement: <NotFound />,
		},
		{
			path: '/:rates/groupId/:groupId',
			element: <RateMain />,
			errorElement: <NotFound />,
		},
		{
			path: '/:rates/groupId/:groupId/misc/:misc',
			element: <RateMain />,
			errorElement: <NotFound />,
		},
		{
			path: '/:rates/groupId/:groupId/misc/:misc/extUserId/:extUserId',
			element: <RateMain />,
			errorElement: <NotFound />,
		},
		{
			path: '/:rates/groupId/:groupId/extUserId/:extUserId',
			element: <RateMain />,
			errorElement: <NotFound />,
		},
		{
			path: '/:rates/groupId/:groupId/extUserId/:extUserId/misc/:misc',
			element: <RateMain />,
			errorElement: <NotFound />,
		},
		{
			path: '/:rates/misc/:misc',
			element: <RateMain />,
			errorElement: <NotFound />,
		},
		{
			path: '/:rates/misc/:misc/groupId/:groupId',
			element: <RateMain />,
			errorElement: <NotFound />,
		},
		{
			path: '/:rates/misc/:misc/extUserId/:extUserId',
			element: <RateMain />,
			errorElement: <NotFound />,
		},
		{
			path: '/:rates/misc/:misc/extUserId/:extUserId/groupId/:groupId',
			element: <RateMain />,
			errorElement: <NotFound />,
		},
		{
			path: '/:rates/misc/:misc/groupId/:groupId/extUserId/:extUserId',
			element: <RateMain />,
			errorElement: <NotFound />,
		},
		{
			path: '/:rates/extUserId/:extUserId/groupId/:groupId/misc/:misc',
			element: <RateMain />,
			errorElement: <NotFound />,
		},
		{
			path: '/',
			element: <RateMain />,
			errorElement: <NotFound />,
		},
		{
			path: '/extUserId/:extUserId',
			element: <RateMain />,
			errorElement: <NotFound />,
		},
		{
			path: '/groupId/:groupId',
			element: <RateMain />,
			errorElement: <NotFound />,
		},
		{
			path: '/misc/:misc',
			element: <RateMain />,
			errorElement: <NotFound />,
		},
		{
			path: '/misc/:misc/extUserId/:extUserId',
			element: <RateMain />,
			errorElement: <NotFound />,
		},
		{
			path: '/misc/:misc/extUserId/:extUserId/groupId/:groupId',
			element: <RateMain />,
			errorElement: <NotFound />,
		},
		{
			path: '/misc/:misc/groupId/:groupId',
			element: <RateMain />,
			errorElement: <NotFound />,
		},
		{
			path: '/misc/:misc/groupId/:groupId/extUserId/:extUserId',
			element: <RateMain />,
			errorElement: <NotFound />,
		},
		{
			path: '/extUserId/:extUserId/groupId/:groupId',
			element: <RateMain />,
			errorElement: <NotFound />,
		},
		{
			path: '/extUserId/:extUserId/misc/:misc',
			element: <RateMain />,
			errorElement: <NotFound />,
		},
		{
			path: '/extUserId/:extUserId/misc/:misc/groupId/:groupId',
			element: <RateMain />,
			errorElement: <NotFound />,
		},
		{
			path: '/groupId/:groupId/misc/:misc',
			element: <RateMain />,
			errorElement: <NotFound />,
		},
		{
			path: '/extUserId/:extUserId/groupId/:groupId/misc/:misc',
			element: <RateMain />,
			errorElement: <NotFound />,
		},
		{
			path: '*',
			element: <NotFound />,
			errorElement: <NotFound />,
		},
	])
	window.onbeforeunload = (event) => {
		const e = event || window.event
		// Cancel the event
		e.preventDefault()
		if (e) {
			e.returnValue = '' // Legacy method for cross browser support
		}
		return '' // Legacy method for cross browser support
	}
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
