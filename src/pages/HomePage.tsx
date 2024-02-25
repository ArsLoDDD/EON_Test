//react
import React, { useEffect, useState } from 'react'
//redux
import PieChart from '../components/Diagram/PieChart'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { Keyword, setKeywords } from '../redux/slices/keywordsSlice'
//api
import { IUser } from '../types/userTypes'
//types
import { fetchKeywords } from '../api/fetchKeywords'
//utils
import randomColor from 'randomcolor'
//components
import LineChart from '../components/Diagram/LineChart'

const border = 'border-4 border-white'
export interface ChartData {
	labels: string[]
	values: number[]
	colors: string[]
}

const HomePage: React.FC = () => {
	//state
	const [connectedSourcesChart, setConnectedSourcesChart] = useState<ChartData>(
		{
			labels: [],
			values: [],
			colors: [],
		}
	)
	const [userKeywordsCountChart, setUserKeywordsCountChart] =
		useState<ChartData>({
			labels: [],
			values: [],
			colors: [],
		})
	//redux
	const dispatch = useDispatch()
	const userSources = useSelector((state: RootState) => {
		if (state.user.userData && 'connectedSources' in state.user.userData) {
			return (state.user.userData as IUser).connectedSources
		}
		return null
	})
	const userKeywordsCount = useSelector((state: RootState) => {
		if (state.keywords.keywords) {
			return state.keywords.keywords.length
		}
		return null
	})

	useEffect(() => {
		//fetch keywords if they are not in the store
		if (!userKeywordsCount) {
			;(async () => {
				const data: Keyword[] = await fetchKeywords()
				dispatch(setKeywords(data))
			})()
		}
		if (userSources) {
			const labels: string[] = []
			const values: number[] = []
			const colors: string[] = []
			userSources.forEach(source => {
				labels.push(source.name)
				values.push(source.connectedAccountData.followers)
				colors.push(randomColor())
			})
			setConnectedSourcesChart({ labels, values, colors })
		}
	}, [userSources, userKeywordsCount])

	useEffect(() => {
		//
		const userKeywords = localStorage.getItem('userKeywords')
		if (userKeywordsCount && userKeywords) {
			const data = [
				{
					labels: ['User Keywords', 'Servise Keywords'],
					values: [JSON.parse(userKeywords).length, userKeywordsCount],
					colors: [randomColor(), randomColor()],
				},
			]
			setUserKeywordsCountChart(data[0])
		}
	}, [userKeywordsCount])

	if (!userSources) return <div>loading...</div>
	return (
		<div className='w-full h-full relative flex flex-col justify-center items-center bg-slate-200'>
			<div
				className={`w-full h-1/5 ${border} flex justify-center items-center `}
			>
				<p className=' text-slate-500 font-poppins font-bold text-3xl'>
					Many updates later
				</p>
			</div>
			<div className={`w-full h-2/5 flex ${border}`}>
				<div
					className={`w-1/2 ${border} flex flex-col justify-center items-center py-4`}
				>
					<p className=' text-xs font-bold'>Your Accounts follower Stats</p>
					{connectedSourcesChart.colors.length && (
						<PieChart data={connectedSourcesChart} />
					)}
				</div>
				<div
					className={`w-1/2 ${border} flex flex-col justify-center items-center py-4 `}
				>
					<p className=' text-xs font-bold'>Yours and Servise Keywords</p>
					{userKeywordsCountChart.colors.length && (
						<PieChart data={userKeywordsCountChart} />
					)}
				</div>
			</div>
			<div
				className={`w-full h-2/5 ${border} flex flex-col justify-center items-center py-2`}
			>
				<p className=' text-xs font-bold pt-2 whitespace-nowrap'>
					Chart of growth of number of followers of likes and comments
				</p>
				<LineChart
					labels={[
						'January',
						'February',
						'March',
						'April',
						'May',
						'June',
						'July',
					]}
					datasets={[
						{
							label: 'Followers',
							data: [41245, 34581, 83762, 13058, 87122, 45616, 23451],
							color: 'rgb(255, 215, 0)',
						},
						{
							label: 'Likes',
							data: [98799, 12312, 42341, 12354, 43562, 32452, 52344],
							color: 'rgb(255, 0, 255)',
						},
						{
							label: 'Comments',
							data: [41231, 41245, 23411, 12341, 51321, 63131, 12367],
							color: 'rgb(0, 255, 0)',
						},
					]}
					xAxisLabel='Month'
					yAxisLabel='Percentage'
				/>
			</div>
		</div>
	)
}

export default HomePage
