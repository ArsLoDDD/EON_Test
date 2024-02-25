import { useState, useEffect } from 'react'
//lodash
import { debounce } from 'lodash'

export enum ScreenSizeEnum {
	Mobile = 'mobile',
	Tablet = 'tablet',
	Desktop = 'desktop',
}

export type ScreenSize = ScreenSizeEnum

function useScreenSize(): ScreenSize {
	//check the screen size
	const [screenSize, setScreenSize] = useState<ScreenSize>(
		getInitialScreenSize()
	)

	function getInitialScreenSize(): ScreenSize {
		const width = window.innerWidth
		if (width < 768) {
			return ScreenSizeEnum.Mobile
		} else if (width >= 768 && width < 1024) {
			return ScreenSizeEnum.Tablet
		} else {
			return ScreenSizeEnum.Desktop
		}
	}

	useEffect(() => {
		const handleResize = debounce(() => {
			const width = window.innerWidth
			if (width < 768) {
				setScreenSize(ScreenSizeEnum.Mobile)
			} else if (width >= 768 && width < 1024) {
				setScreenSize(ScreenSizeEnum.Tablet)
			} else {
				setScreenSize(ScreenSizeEnum.Desktop)
			}
		}, 100)

		window.addEventListener('resize', handleResize)

		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	return screenSize
}

export default useScreenSize
