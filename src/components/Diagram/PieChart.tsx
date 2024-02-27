import { Chart, registerables } from 'chart.js'
import React, { useEffect, useRef, useState } from 'react'
import useScreenSize from '../../hooks/useScreenSize'

Chart.register(...registerables)

interface ChartDataProps {
	data: {
		labels: string[]
		values: number[]
		colors: string[]
	}
}

const PieChart: React.FC<ChartDataProps> = ({ data }) => {
	const chartRef = useRef<HTMLCanvasElement | null>(null)
	const [chartInstance, setChartInstance] = useState<Chart<'pie'> | null>(null)
	const screenSize = useScreenSize()

	useEffect(() => {
		if (chartRef.current) {
			if (chartInstance) {
				console.log('12123123')
				chartInstance.destroy()
			}
			const ctx = chartRef.current.getContext('2d')
			if (ctx && data) {
				const newChart = new Chart(ctx, {
					type: 'pie',
					data: {
						labels: data.labels,
						datasets: [
							{
								data: data.values,
								backgroundColor: data.colors,
							},
						],
					},
					options: {
						responsive: true,

						plugins: {
							legend: undefined,
							tooltip: undefined,
							title: {
								text: 'Pie Chart',
							},
						},
					},
				})
				setChartInstance(newChart)
			}
		}
	}, [data, screenSize])

	return <canvas ref={chartRef} />
}

export default PieChart
