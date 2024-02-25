//components
import { ResponsivePie } from '@nivo/pie'

export type PieObject = {
	id: string
	value: number
}
export interface PieDiagramProps {
	data: PieObject[]
}

const MyResponsivePie: React.FC<PieDiagramProps> = ({ data }) => (
	<ResponsivePie
		data={data}
		margin={{ top: 40, right: 80, bottom: 40, left: 80 }}
		innerRadius={0.35}
		padAngle={1}
		cornerRadius={11}
		activeOuterRadiusOffset={8}
		colors={[
			'#6e5bd6',
			'#a53ed5',
			'#cc2cd4',
			'#f500d3',
			'#ff3d91',
			'#ff708d',
			'#ff9d88',
			'#ffbf82',
		]}
		borderWidth={3}
		borderColor={{
			from: 'color',
			modifiers: [['darker', 0.2]],
		}}
		arcLinkLabelsSkipAngle={10}
		arcLinkLabelsTextColor='#000000'
		arcLinkLabelsThickness={2}
		arcLinkLabelsColor={{ from: 'color' }}
		arcLabelsSkipAngle={10}
		arcLabelsTextColor={{
			from: 'color',
			modifiers: [['darker', 2]],
		}}
		defs={[
			{
				id: 'dots',
				type: 'patternDots',
				background: 'inherit',
				color: 'rgba(255, 255, 255, 0.3)',
				size: 4,
				padding: 1,
				stagger: true,
			},
			{
				id: 'lines',
				type: 'patternLines',
				background: 'inherit',
				color: 'rgba(255, 255, 255, 0.3)',
				rotation: -45,
				lineWidth: 6,
				spacing: 10,
			},
		]}
		fill={[
			{
				match: {
					id: 'ruby',
				},
				id: 'dots',
			},
			{
				match: {
					id: 'c',
				},
				id: 'dots',
			},
			{
				match: {
					id: 'go',
				},
				id: 'dots',
			},
			{
				match: {
					id: 'python',
				},
				id: 'dots',
			},
			{
				match: {
					id: 'scala',
				},
				id: 'lines',
			},
			{
				match: {
					id: 'lisp',
				},
				id: 'lines',
			},
			{
				match: {
					id: 'elixir',
				},
				id: 'lines',
			},
			{
				match: {
					id: 'javascript',
				},
				id: 'lines',
			},
		]}
		motionConfig='gentle'
	/>
)

export default MyResponsivePie
