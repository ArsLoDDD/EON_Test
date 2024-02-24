import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import CloseIcon from './CloseIcon/CloseIcon'
import { addKeyword, removeKeyWord } from '../../redux/slices/userSlice'

export interface KeywordItemProps {
	keyword: string
	isPicked: boolean
}

const style =
	'text-center p-2 rounded-md font-poppins font-bold text-white duration-300'

const KeywordItem: React.FC<KeywordItemProps> = React.memo(
	({ isPicked, keyword }) => {
		const dispatch = useDispatch()

		const handlePickWord = useCallback(() => {
			console.log(keyword)
			const oldData = JSON.parse(localStorage.getItem('userKeywords') || '[]')
			if (oldData.includes(keyword)) {
				return
			}
			const newData = [...oldData, keyword]
			localStorage.setItem('userKeywords', JSON.stringify(newData))
			dispatch(addKeyword(keyword))
		}, [keyword, dispatch])

		const handleRemoveWord = useCallback(() => {
			const oldData = JSON.parse(localStorage.getItem('userKeywords') || '[]')
			const newData = oldData.filter((word: string) => word !== keyword)
			localStorage.setItem('userKeywords', JSON.stringify(newData))
			dispatch(removeKeyWord(keyword))
		}, [keyword, dispatch])

		if (isPicked) {
			return (
				<div
					className={`${style} bg-green-500 hover:scale-110 cursor-pointer`}
					onClick={handlePickWord}
				>
					<span>{keyword.charAt(0).toUpperCase() + keyword.slice(1)}</span>
				</div>
			)
		}
		return (
			<div
				className={`${style} relative  bg-red-400 hover:animate-custom-bounce cursor-default
				`}
			>
				<div className='h-4 w-4  bg-black absolute top-0 right-0 translate-x-1/4 -translate-y-1/4 rounded-full flex justify-center items-center text-white text-xs cursor-pointer '>
					<CloseIcon onClick={handleRemoveWord} />
				</div>
				<span>{keyword.charAt(0).toUpperCase() + keyword.slice(1)}</span>
			</div>
		)
	}
)

export default KeywordItem
