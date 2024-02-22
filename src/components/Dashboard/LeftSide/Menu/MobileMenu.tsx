import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { menuItems } from './Menu'
import MenuItem from './MenuItem/MenuItem'
import ActiveUser from '../ActiveUser/ActiveUser'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../redux/store'

const MobileMenu: React.FC = () => {
	const mobileMenuIsActive = useSelector(
		(state: RootState) => state.menu?.mobileMenuIsActive
	)
	return (
		<AnimatePresence>
			{mobileMenuIsActive && (
				<motion.div
					key='menu'
					className='absolute h-screen w-full md:w-1/2 absolute h-screen w-full md:w-1/2 bg-white z-40'
					initial={{ opacity: 0, y: -100 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -100 }}
					transition={{ duration: 0.5 }}
				>
					<nav className='h-full w-1/2 mx-auto flex flex-col justify-evenly items-center'>
						{menuItems.map((item, index) => (
							<MenuItem
								key={item.text}
								index={index}
								icon={item.icon}
								text={item.text}
								link={item.link}
								classNameArgsMain='py-4 px-12'
								classNameArgsBlock='gap-8'
								classNameArgsText='text-xl'
								bigIcon={true}
							/>
						))}
						<ActiveUser isMobile={true} />
					</nav>
				</motion.div>
			)}
		</AnimatePresence>
	)
}

export default MobileMenu
