import React from 'react'
import Pizza_Builder from './2D-configurator/Pizza_Builder'
import './2D-configurator/index.css'


const Configurator = () => {
    return (
        <>
            <div className='bodyParent'>
                <Pizza_Builder />
            </div>
        </>
    )
}

export default Configurator