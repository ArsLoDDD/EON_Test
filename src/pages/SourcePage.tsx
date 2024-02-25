//react
import React, { useEffect, useState } from 'react'
//redux
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
//router
import { useLocation } from 'react-router-dom'
//api
import { getSource } from '../api/getSource'
import { getSourceData } from '../api/getSourceData'
//types
import { Rating, Source, SourceDataPosts } from '../types/sourceTypes'
import { UserSourceStatus } from '../types/userTypes'
//components
import MyResponsivePie, { PieObject } from '../components/Diagram/PieDiagram'
import SourcePosts from '../components/SourcePosts/SourcePosts'

const btnStyles =
	' text-white font-bold flex justify-center items-center rounded-xl cursor-pointer whitespace-nowrap '

const SourcePage: React.FC = () => {
	//router
	const path = useLocation().pathname.split('/').pop()
	//state
	const [source, setSource] = useState<Source | undefined>(undefined)
	const [sourceData, setSourceData] = useState<SourceDataPosts[]>([])
	const [ratings, setRatings] = useState<PieObject[]>([])
	const [sourceStatuses, setSourceStatuses] = useState<{
		isActive: boolean
		isAlreadyPicked: boolean
	}>({
		isActive: false,
		isAlreadyPicked: false,
	})
	//redux
	const accountConnectedData = useSelector((state: RootState) => {
		if (state.user.userData && state.user.userData.connectedSources && path) {
			const connectedSource = state.user.userData.connectedSources.find(
				source => source.name === path.charAt(0).toUpperCase() + path.slice(1)
			)
			return connectedSource
		}
		return null
	})

	useEffect(() => {
		if (path) {
			;(async () => {
				const source = await getSource(path)
				setSource(source)
				if (source) {
					const ratings: PieObject[] = []
					const sourceRatings: Rating = source.ratings
					Object.keys(sourceRatings).forEach(key => {
						ratings.push({ id: key, value: sourceRatings[key] })
					})
					setRatings(ratings)
				}
				const sourceData = await getSourceData(path)
				setSourceData(sourceData)
			})()
		}
	}, [path])

	useEffect(() => {
		if (accountConnectedData) {
			setSourceStatuses({
				isActive:
					accountConnectedData.connectedAccountData.status ===
					UserSourceStatus.Active,
				isAlreadyPicked: true,
			})
		}
	}, [accountConnectedData])

	if (!source || !sourceData) {
		return <div>Loading...</div>
	}

	return (
		//need to fix box height when posts are lengthy
		<div className='bg-slate-100 w-full z-10  '>
			<div className='w-full h-2/6 flex border border-white rounded-xl'>
				<div className='w-1/2 border border-white rounded-t-xl'>
					<div className='h-4/6 flex justify-center items-center border border-white'>
						<img className='w-40 h-40 rounded-full' src={source.logo} alt='' />
					</div>
					<div className='h-2/6 flex justify-evenly items-center border border-white'>
						<div
							className={`${btnStyles} ${
								sourceStatuses.isActive ? 'bg-red-500' : 'bg-green-500'
							} h-3/6 w-3/12 text-xs`}
						>
							{sourceStatuses.isActive ? 'Deactivate' : 'Activate'}
						</div>
						<div
							className={`${btnStyles} ${
								sourceStatuses.isAlreadyPicked ? 'bg-red-500' : 'bg-green-500'
							} text-xs h-3/6 w-4/12`}
						>
							{sourceStatuses.isAlreadyPicked
								? 'Remove Account'
								: 'Add Account'}
						</div>
						<div className={`${btnStyles} bg-sky-500 h-3/6  w-3/12`}>Help</div>
					</div>
				</div>
				<div className='w-1/2 border border-white'>
					<MyResponsivePie data={ratings} />
				</div>
			</div>
			<div className='w-full h-3/6 border-b-2 rounded-3xl shadow-2xl py-5 overflow-scroll '>
				<SourcePosts source={sourceData} />
			</div>
			<p className='h-1/6 flex justify-center items-center text-slate-500 font-poppins font-bold text-3xl'>
				Many updates later
			</p>
		</div>
	)
}
export default SourcePage
