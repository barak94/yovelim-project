import React, { useState } from 'react'
import Structure from './Structure/Structure';
import STRUCTURES_DATA from '../../../structures-data.json'
import './Structures.css'


const Structures = ({currentUser}) => {

    const [structures, setProducts] = useState(STRUCTURES_DATA);

    return (
        <div className={currentUser ? 'structures-container-user' : 'structures-container'}>
            { structures.map((structure) => <Structure structure={structure} key={structure.name}/>)}
        </div>
    )
}

export default Structures