export interface ImgTableData {
	id: number
	title?: string
	contentId?: number
	artistContentId?: number
	artistName?: string
	completitionYear?: number
	yearAsString?: string
	width?: number
	image?: string
	height?: number
	artistUrl?: string
	url?: string
	dictionaries?: number[]
	location?: string
	period?: string
	serie?: string
	genre?: string
	material?: string
	style?: string
	technique?: string
	sizeX?: string
	sizeY?: string
	diameter?: string
	auction?: string
	yearOfTrade?: string
	lastPrice?: string
	galleryName?: string
	tags?: string
	description?: string
	misc?: string
}

export interface ImgData {
	rows: ImgTableData[]
	tableName: string
}

export interface RatingData {
	id: string
	paintingId?: number
	userId: string
	rating?: number
	timestamp?: number
	time_spent?: number
	extUserId?: string
	groupId?: string
	misc?: string
}
