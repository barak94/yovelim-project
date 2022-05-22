import React, { useState } from 'react'

export const facilityContext = React.createContext();

const FacilityProvider = ({ children }) => {

    const [facility, setFacility] = useState('');

    return (
        <facilityContext.Provider value={{ facility, setFacility}}>
            {children}
        </facilityContext.Provider>
    )

}

export default FacilityProvider