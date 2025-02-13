import React, { Children, createContext, useState } from 'react'

export const Person = createContext()

const PersonProvider = ({children}) => {
    const [info,setInfo] = useState({})
  return (
    <Person.Provider value={{info,setInfo}}>
        {children}
    </Person.Provider>
  )
}

export default PersonProvider