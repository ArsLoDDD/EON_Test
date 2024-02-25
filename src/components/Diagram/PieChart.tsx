import { Chart, registerables } from 'chart.js'
import React, { useRef, useEffect } from 'react'

Chart.register(...registerables)

const PieChart: React.FC<any> = ({ data }) => {
	const chartRef = useRef<HTMLCanvasElement | null>(null)

	useEffect(() => {
		if (chartRef.current) {
			const ctx = chartRef.current.getContext('2d')
			if (ctx) {
				new Chart(ctx, {
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
			}
		}
	}, [data])

	return <canvas ref={chartRef} />
}

export default PieChart
