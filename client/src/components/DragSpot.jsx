import React, { useState } from 'react'

const DragSpot = ({ onDrop }) => {

    const [showDrop, setShowDrop] = useState(false)
    return (
        <section className={showDrop ? 'm-4 p-2 rounded-lg w-[80%] text-white border-dashed border-2' : 'opacity-0 h-2 mt-4'}
            onDragEnter={() =>
                setShowDrop(true)
            }
            onDragLeave={() =>
                setShowDrop(false)
            }
            onDrop={() => {
                onDrop();
                setShowDrop(false);
            }}
            onDragOver={e => e.preventDefault()}
        >
            Place Here
        </section>
    )
}

export default DragSpot