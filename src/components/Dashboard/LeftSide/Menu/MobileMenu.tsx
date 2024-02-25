import React from 'react'
//redux
import { useSelector } from 'react-redux'
import { RootState } from '../../../../redux/store'
//animation
import { motion, AnimatePresence } from 'framer-motion'
//components
import { menuItems } from './Menu'
import MenuItem from './MenuItem/MenuItem'
import ActiveUser from '../ActiveUser/ActiveUser'

const MobileMenu: React.FC = () => {
	//redux
	const mobileMenuIsActive = useSelector(
		(state: RootState) => state.menu?.mobileMenuIsActive
	)
	return (
		<AnimatePresence>
			{mobileMenuIsActive && (
				<motion.div
					key='menu'
					className={'absolute h-screen w-full bg-white z-40'}
					initial={{ opacity: 0, y: -100 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -100 }}
					transition={{ duration: 0.5 }}
				>
					<nav className='h-full w-2/3 mx-auto flex flex-col justify-evenly items-center'>
						<div>
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
						</div>
						<ActiveUser isMobile={true} />
					</nav>
				</motion.div>
			)}
		</AnimatePresence>
	)
}

export default MobileMenu
