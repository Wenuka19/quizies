import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function HomePage() {
    let start = useNavigate();
    return (
        <div className='home-container'>
            <h1>Welcome to Quiz App</h1>
            <p>Press the button to test your knowledge!</p>
            <button onClick={() => start('/start')}>Start</button>
        </div>
    )
}
