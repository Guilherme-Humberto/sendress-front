import { useEffect, useState } from 'react'

export const useMediaQuery = (width: string): boolean | undefined => {
    const [mediaQuery, setMediaQuery] = useState<boolean>()

    useEffect(() => {
        const handleWindowResize = () => {
            const { matches } = window.matchMedia(width)
            setMediaQuery(matches)
        }

        handleWindowResize()
        window.addEventListener('resize', handleWindowResize)

        return () => {
            window.removeEventListener('resize', handleWindowResize)
        }
    }, [width])

    return mediaQuery
}