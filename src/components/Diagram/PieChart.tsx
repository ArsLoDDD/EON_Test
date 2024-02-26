import { Chart, registerables } from 'chart.js'
import React, { useEffect, useRef, useState } from 'react'

Chart.register(...registerables)

const PieChart: React.FC<any> = ({ data }) => {
	const chartRef = useRef<HTMLCanvasElement | null>(null)
	const [chartInstance, setChartInstance] = useState<any | null>(null)

	useEffect(() => {
		if (chartRef.current) {
			if (chartInstance) {
				console.log('12123123')
				chartInstance.destroy()
			}
			const ctx = chartRef.current.getContext('2d')
			if (ctx) {
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
	}, [data])

	return <canvas ref={chartRef} />
}

export default PieChart
