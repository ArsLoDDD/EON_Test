import React from 'react'
import MenuItem from './MenuItem/MenuItem'
import DashboardHome from './MenuItem/ProductItemIcons/DashboardHome'

interface MenuItemProps {
	icon: React.FC
	text: string
	link: string
}

export const menuItems = [
	{
		icon: DashboardHome,
		text: 'Dashboard',
		link: '/',
	},
]

const Menu: React.FC = () => {
	return (
		<nav className='w-11/12 lg2:w-9/12 mx-auto flex flex-col justify-center gap-3'>
			{menuItems.map((item, index) => (
				<MenuItem
					key={item.text}
					index={index}
					icon={item.icon}
					text={item.text}
					link={item.link}
					bigIcon={true}
				/>
			))}
		</nav>
	)
}

export default Menu
