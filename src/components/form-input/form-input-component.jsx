
import './form-input.styles.css'

const FormInput = ({ label, ...otherProps }) => {

    return (
        <>
            {label && <label className='form-input-label'>{ label }</label>}
            <input className="form-input" {...otherProps} />
        </>
    )

}

export default FormInput;