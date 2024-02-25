// react
import React, { MouseEventHandler } from 'react'
// redux
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../../redux/store'
import { setMobileMenuIsActive } from '../../../../redux/slices/menuSlice'
// react-router
import { NavLink } from 'react-router-dom'
// hooks
import useScreenSize from '../../../../hooks/useScreenSize'
// components
import Avatar from './Avatar/Avatar'
import AvatarWithoutImg from './Avatar/AvatarWithoutImg/AvatarWithoutImg'

const ActiveUser: React.FC<{ isMobile?: boolean }> = ({ isMobile = false }) => {
	// redux
	const userInfo = useSelector((state: RootState) => state?.user?.userData)
	const dispatch = useDispatch()
	// hooks
	const screenSize = useScreenSize()

	const typedUserInfo = userInfo as {
		role: string
		avatar: string | null
		fullName: string
	}

	const handleClick: MouseEventHandler<HTMLAnchorElement> = event => {
		// close mobile menu
		if (isMobile) {
			dispatch(setMobileMenuIsActive(false))
		}
	}

	if (!typedUserInfo) return <h1>Loading</h1>

	return (
		<NavLink
			to={'/profile'}
			onClick={handleClick}
			className={({ isActive }) =>
				`flex justify-start items-center gap-2 ${
					isMobile ? 'w-full' : 'w-9/12'
				} mx-auto group  rounded-2xl py-2.5 px-4 duration-1000 ease-in-out ${
					isActive
						? 'hover:bg-white bg-purple-bg-item-menu '
						: ' hover:bg-purple-bg-item-menu'
				}`
			}
		>
			{({ isActive }) => (
				<>
					{typedUserInfo.avatar ? (
						<Avatar
							classNameArg={` ${
								isMobile
									? 'h-16 w-16'
									: 'hidden lg3:flex lg3:h-8 lg3:w-8 xl:h-12 xl:w-12'
							}`}
							url={typedUserInfo.avatar}
						/>
					) : (
						<AvatarWithoutImg
							classNameArg={`${
								isActive
									? ' text-white group-hover:text-black border-white  group-hover:border-black'
									: 'text-black group-hover:text-white group-hover:border-white'
							} duration-500 ${
								isMobile
									? 'h-16 w-20'
									: 'hidden lg3:flex lg3:h-8 lg3:w-8 xl:h-12 xl:w-14'
							}  `}
						/>
					)}
					<div
						className={`flex flex-col text-center lg3:text-left  ${
							isMobile ? 'w-full' : 'w-10/12'
						} font-poppins gap-0.5 ${
							isActive
								? `group-hover:translate-x-0  translate-x-3 lg:group-hover:translate-x-4
								lg3:group-hover:translate-x-0 `
								: `group-hover:translate-x-3 md:group-hover:translate-x-2 lg:group-hover:translate-x-4
								lg3:group-hover:translate-x-0 `
						} duration-1000 `}
					>
						<span
							className={` text-sm font-medium  ${
								isActive
									? ' text-white group-hover:text-black'
									: 'text-black group-hover:text-white'
							} duration-500`}
						>
							{typedUserInfo.fullName}
						</span>
						<span
							className={` opacity-40 text-xs  ${
								isActive
									? ' text-white group-hover:text-black'
									: 'text-black group-hover:text-white'
							} duration-500 text-nowrap lg3:w-9/12 whitespace-nowrap overflow-hidden overflow-ellipsis`}
						>
							{typedUserInfo.role}
						</span>
					</div>
				</>
			)}
		</NavLink>
	)
}

export default ActiveUser
