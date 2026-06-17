"use client"
import { useState } from "react";


export const useWelcome = () =>{
    const [showWelcome, setShowWelcome] = useState(true)

    const enterApp = () =>{
        setShowWelcome(false)
    }

    return {
        showWelcome,
        enterApp
    }
}