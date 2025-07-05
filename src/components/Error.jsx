import React from 'react'

const Error = ({ err }) => {
    return (
        <div>
            <h1>{err.length > 0 && err}</h1>
        </div>
    )
}

export default Error

