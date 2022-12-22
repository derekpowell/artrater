import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useParams } from 'react-router-dom'

import { RatingData, ImgTableData } from './types'
import { formatRatingDataPainting, storeSurvey } from './functions'

import RateStars from './RateStars'

interface IProps {
	getNextData: VoidFunction
	isEnded: boolean
	toggleIsEnded: VoidFunction
	updateComplitedData: (data: RatingData) => void
	currentData: ImgTableData
	toggleIsCompleted: VoidFunction
	numOfRatings: number
	completedData: RatingData[]
	updateIsLoading: (state: boolean) => void
	imgUrl?: string
}

const RateStarsPainting = (props: IProps) => {
	const {
		getNextData,
		isEnded,
		toggleIsEnded,
		updateComplitedData,
		currentData,
		toggleIsCompleted,
		numOfRatings,
		completedData,
		updateIsLoading,
		imgUrl,
	} = props
	const [cookies] = useCookies(['user'])
	const { extUserId, groupId, misc } = useParams()

	const numOfStars = 5
	const rateRange = Array.from(Array(numOfStars).keys())
	const rateArr = new Array(numOfStars).fill(false)
	const [ratings, setRatings] = useState<boolean[]>(rateArr)
	const [timeBegin, setTimeBegin] = useState<number>(Date.now())
	const rateAndNext = (rate: number) => {
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
				getNextData()
			}
		})
	}
	const storeRatedData = async (rate: number, diff: number) => {
		const userId = cookies.user || ''
		const formatted = formatRatingDataPainting(
			currentData,
			rate,
			diff,
			userId,
			extUserId || '',
			groupId || '',
			misc || '',
		)
		updateComplitedData(formatted)
		return await storeSurvey(formatted, process.env.REACT_APP_SAVE_SURVEY || '')
	}
	useEffect(() => {
		if (isEnded) {
			setRatings(rateArr)
			setTimeBegin(Date.now())
			toggleIsEnded()
		}
	}, [imgUrl])

	useEffect(() => {
		setTimeBegin(Date.now())
	}, [])

	return <RateStars rateAndNext={rateAndNext} rateRange={rateRange} ratings={ratings} />
}

export default RateStarsPainting
