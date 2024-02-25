// react
import React from 'react'
// redux
import { useDispatch } from 'react-redux'
import {
	setActiveElement,
	setMobileMenuIsActive,
} from '../../../../../redux/slices/menuSlice'
// router
import { NavLink } from 'react-router-dom'
// hooks
import useScreenSize, {
	ScreenSizeEnum,
} from '../../../../../hooks/useScreenSize'
// components
import ChevronRight from './ProductItemIcons/ChevronRight'
import { IMenuButtonProps } from './ProductItemIcons/DashboardHome'

export interface MenuItemProps {
	icon: React.FC<IMenuButtonProps>
	text: string
	link: string
	index?: number
	classNameArgsMain?: string
	classNameArgsBlock?: string
	classNameArgsText?: string
	bigIcon: boolean
}

const MenuItem: React.FC<MenuItemProps> = ({
	icon,
	text,
	link,
	index = 0,
	classNameArgsMain,
	classNameArgsBlock,
	classNameArgsText,
	bigIcon,
}) => {
	//redux
	const dispatch = useDispatch()
	//hooks
	const screenSize = useScreenSize()

	const handleChangeActiveElement = () => {
		// set active element
		dispatch(setActiveElement(index))
		if (screenSize !== ScreenSizeEnum.Desktop) {
			dispatch(setMobileMenuIsActive(false))
		}
	}

	return (
		<NavLink
			to={link}
			className={({ isActive }) =>
				`flex justify-between items-center py-2.5 px-4   rounded-2xl gap-2 duration-700 ease-in-out  ${
					isActive
						? 'hover:bg-opacity-80 bg-purple-bg-item-menu '
						: 'hover:bg-opacity-10 hover:bg-purple-bg-item-menu'
				} ${classNameArgsMain}`
			}
			onClick={handleChangeActiveElement}
		>
			{({ isActive }) => (
				<>
					<div
						className={`flex gap-4 lg2:gap-2 lg3:gap-4 items-center ${classNameArgsBlock}`}
					>
						{bigIcon && (
							<>
								{React.createElement(icon, {
									isActive,
									bigIcon,
									additionalProp: 'value',
								})}
							</>
						)}
						<span
							className={`text-lg font-poppins ${
								isActive ? 'text-white' : 'text-gray-item '
							} ${classNameArgsText}`}
						>
							{text}
						</span>
					</div>
				</>
			)}
		</NavLink>
	)
}

export default MenuItem
