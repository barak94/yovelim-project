import { useNavigate } from 'react-router-dom'
import './Structure.css'


const Structure = ({ structure }) => {

  const {name, imageUrl} = structure;
  const navigate = useNavigate();

  return (
    
      <div className='structure-container' onClick={()=> { navigate('./facilities/' + name);}}>
        <img src={imageUrl} alt={name} />
        <span className='name'>{name}</span> 
      </div>
  
  )
}

export default Structure