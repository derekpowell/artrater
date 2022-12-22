import React, { useState, useEffect } from 'react'

import { useCookies } from 'react-cookie'
import { useParams } from 'react-router-dom'

import { RatingData, TextTableData } from './types'
import { formatRatingDataText, storeSurvey } from './functions'

import RateStars from './RateStars'

interface IProps {
	getNextData: VoidFunction
	isEnded: boolean
	toggleIsEnded: VoidFunction
	numOfStars: number
	updateComplitedData: (data: RatingData) => void
	currentData: TextTableData
	toggleIsCompleted: VoidFunction
	numOfRatings: number
	completedData: RatingData[]
	updateIsLoading: (state: boolean) => void
	imgUrl?: string
}

const RateStarsText = (props: IProps) => {
	const {
		getNextData,
		isEnded,
		toggleIsEnded,
		numOfStars,
		updateComplitedData,
		currentData,
		toggleIsCompleted,
		numOfRatings,
		completedData,
		updateIsLoading,
	} = props
	const { extUserId, groupId, misc } = useParams()
	const [cookies] = useCookies(['user'])
	const rateRange = Array.from(Array(numOfStars).keys())
	const rateArr = new Array(numOfStars).fill(false)
	const [ratings, setRatings] = useState(rateArr)
	const [timeBegin, setTimeBegin] = useState<number>(Date.now())

	const rateAndNext = (rate: number) => {
		// rate and next func here
		updateIsLoading(true)
		toggleIsEnded()
		const beginTime = timeBegin
		const endTime = Date.now()
		const diff = endTime - beginTime
		const copy = [...ratings]
		copy[rate] = true
		copy.forEach((bool, i) => (i <= rate ? (copy[i] = true) : (copy[i] = false)))
		setRatings(copy)
		const len = completedData.length + 1
		storeRatedData(rate, diff).then((res) => {
			console.log({ res })
			if (len >= numOfRatings) {
				toggleIsCompleted()
			} else {
				if (completedData.length < 8) {
					getNextData()
				} else {
					toggleIsCompleted()
				}
			}
		})
	}
	const storeRatedData = (rate: number, diff: number) => {
		//write func to store rated data
		console.log('storeRatedData', rate, diff)
		const formatted = formatRatingDataText(
			currentData,
			rate,
			diff,
			cookies.user,
			extUserId || '',
			groupId || '',
			misc || '',
		)
		console.log({ formatted })
		updateComplitedData(formatted)
		return storeSurvey(formatted, process.env.REACT_APP_SAVE_SURVEY_TEXT || '')
	}
	useEffect(() => {
		if (isEnded) {
			setRatings(rateArr)
			setTimeBegin(Date.now())
			updateIsLoading(false)
			toggleIsEnded()
		}
	}, [currentData])

	useEffect(() => {
		setTimeBegin(Date.now())
	}, [])

	return <RateStars rateAndNext={rateAndNext} rateRange={rateRange} ratings={ratings} />
}

export default RateStarsText
