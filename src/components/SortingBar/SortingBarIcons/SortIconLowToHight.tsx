import { ISortIconProps } from './SortIconHightToLow'

const SortIconLowToHight: React.FC<ISortIconProps> = ({
	classNameArgs,
	sortFun,
}) => {
	return (
		<svg
			width='30'
			height='30'
			viewBox='0 0 24 24'
			id='magicoon-Filled'
			xmlns='http://www.w3.org/2000/svg'
			className={`${classNameArgs} fill-slate-600 hover:fill-purple-bg-item-menu duration-300 cursor-pointer`}
			onClick={sortFun}
		>
			<path
				id='sort-ascending-Filled-2'
				data-name='sort-ascending-Filled'
				d='M12,2.5A9.5,9.5,0,1,0,21.5,12,9.509,9.509,0,0,0,12,2.5ZM11,7h2a1,1,0,0,1,0,2H11a1,1,0,0,1,0-2ZM9.5,11h5a1,1,0,0,1,0,2h-5a1,1,0,0,1,0-2ZM16,17H8a1,1,0,0,1,0-2h8a1,1,0,0,1,0,2Z'
			/>
		</svg>
	)
}
export default SortIconLowToHight
