import React from 'react'
import MenuItem, { MenuItemProps } from './MenuItem/MenuItem'
import DashboardHome from './MenuItem/ProductItemIcons/DashboardHome'
import ProductIcon from './MenuItem/ProductItemIcons/ProductIcon'

interface MenuIconItemProps {
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
	{
		icon: ProductIcon,
		text: 'Keywords',
		link: '/keywords',
	},
]

const Menu: React.FC = () => {
	return (
		<nav className='w-11/12 lg2:w-9/12 mx-auto flex flex-col justify-center gap-3'>
			{menuItems.map((item, index) => (
				<MemoizedMenuItem
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

const MemoizedMenuItem: React.FC<MenuItemProps> = React.memo(props => {
	return <MenuItem {...props} />
})

export default Menu
