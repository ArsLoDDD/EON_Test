import React, { useRef, useEffect, useState } from 'react'
//components
import Chart from 'chart.js/auto'

interface LineChartData {
	labels: string[]
	datasets: {
		label: string
		data: number[]
		color: string
	}[]
	xAxisLabel: string
	yAxisLabel: string
	aspectRatio?: number
}

const LineChart: React.FC<LineChartData> = ({
	labels,
	datasets,
	xAxisLabel,
	yAxisLabel,
}) => {
	const chartRef = useRef<HTMLCanvasElement | null>(null)
	const [chartInstance, setChartInstance] = useState<Chart | null>(null)

	useEffect(() => {
		if (chartRef.current) {
			if (chartInstance) {
				chartInstance.destroy()
			}
			const ctx = chartRef.current.getContext('2d')
			if (ctx) {
				const newChart = new Chart(ctx, {
					type: 'line',
					data: {
						labels: labels,
						datasets: datasets.map(dataset => ({
							label: dataset.label,
							data: dataset.data,
							borderColor: dataset.color,
							backgroundColor: 'transparent',
							borderWidth: 2,
						})),
					},
					options: {
						responsive: true,
						maintainAspectRatio: false,
						plugins: {
							legend: {
								display: false,
							},
						},
						scales: {
							x: {
								display: true,
								title: {
									display: true,
									text: xAxisLabel,
								},
							},
							y: {
								display: true,
								title: {
									display: true,
									text: yAxisLabel,
								},
							},
						},
					},
				})
				setChartInstance(newChart)
				return () => {
					newChart.destroy()
				}
			}
		}
	}, [labels])

	return <canvas ref={chartRef} />
}

export default LineChart
