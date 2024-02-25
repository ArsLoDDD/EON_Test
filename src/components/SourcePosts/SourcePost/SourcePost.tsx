import React from 'react'
import { SourceDataPosts } from '../../../types/sourceTypes'
import KeywordItem from '../../KeywordsItem/KeywordItem'

interface SourcePostProps {
	post: SourceDataPosts
}

const SourcePost: React.FC<SourcePostProps> = ({ post }) => {
	const userKeywords = JSON.parse(
		localStorage.getItem('userKeywords') || '[]'
	) as string[]

	const highlightKeywords = (text: string) => {
		const words = text.split(/\b(?=[^\s,.!?]+)/)
		return words.map((word, index) => {
			const wordWithoutPunctuation = word.replace(/[^\w\s]/gi, '')
			const lowerCaseWord = wordWithoutPunctuation.trim().toLowerCase()
			const isUserKeyword = userKeywords.includes(lowerCaseWord)
			const punctuation = word.slice(wordWithoutPunctuation.length)
			return (
				<React.Fragment key={index}>
					{isUserKeyword ? (
						<>
							<KeywordItem
								keyword={wordWithoutPunctuation}
								isPicked={false}
								classNameArg='text-xs w-fit inline py-1 px-1 '
							/>
							{punctuation}
						</>
					) : (
						word
					)}
				</React.Fragment>
			)
		})
	}

	return (
		<div className='w-11/12 md:w-4/5 flex gap-2 bg-slate-300 text-slate-800 py-2 px-4 rounded-xl font-poppins'>
			<img
				src={`https://xsgames.co/randomusers/assets/avatars/male/${post.id}.jpg`}
				alt=''
				className='h-14 w-14 rounded-full'
			/>
			<article>
				<h2 className='font-bold'>{post.author}</h2>
				<div className=''>{highlightKeywords(post.text)}</div>
			</article>
		</div>
	)
}

export default SourcePost
