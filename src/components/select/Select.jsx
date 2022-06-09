import React from 'react'
import './Select.css'

const Select = ({ ...Props }) => {
    return (
        <select {...Props}>
            <option value="">שלוחה</option>
            <option value="שלוחת מלחה" name='שלוחת מלחה' >שלוחת מלחה</option>
            <option value="רמת שרת דניה">רמת שרת דניה</option>
            <option value="עין כרם">עין כרם</option>
            <option value="מרכז תרבות בית טיילור">מרכז תרבות בית טיילור</option>
            <option value="מרכז ספורט בית טיילור">מרכז ספורט בית טיילור</option>
            <option value="בית רחל">בית רחל</option>
            <option value="פיליפ לאון">פיליפ לאון</option>
            <option value="המרכז הקהילתי עש הסנפלד">המרכז הקהילתי עש הסנפלד</option>
        </select>
    )
}

export default Select