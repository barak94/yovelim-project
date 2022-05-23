import { useContext } from 'react'
import { facilityContext } from '../../../provider/facilityProvider'
import { useNavigate } from 'react-router-dom'
import './Structure.css'





const Structure = ({ structure }) => {

  const {name, imageUrl} = structure;
  const { setFacility } = useContext(facilityContext);
  const navigate = useNavigate();

  return (
    
      <div className='structure-container' onClick={()=> { navigate('./facilities'); setFacility(name) }}>
        <img src={imageUrl} alt={name} />
        <span className='name'>{name}</span> 
      </div>
   

  )
}

export default Structure