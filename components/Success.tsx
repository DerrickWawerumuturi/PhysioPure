import React from 'react'
import Confetti from "react-confetti"
import useWindowSize from "react-use/lib/useWindowSize"
import { toast } from 'sonner'

export function Success() {
    const { width, height } = useWindowSize()
    return (
        <Confetti
            width={width}
            height={height}
            tweenDuration={1000}
        />
    )
}

export default Success