import { useContext } from 'react'
import { facilityContext } from '../../../provider/facilityProvider'
import { Link } from 'react-router-dom'
import './Structure.css'





const Structure = ({ structure }) => {

  const {name, imageUrl} = structure;
  const { setFacility } = useContext(facilityContext);

  return (
    <Link to='facilities' onClick={() => setFacility(name)}>
      <div className='structure-container'>
        <img src={imageUrl} alt={name} />
        <span className='name'>{name}</span>
      </div>
    </Link>

  )
}

export default Structure