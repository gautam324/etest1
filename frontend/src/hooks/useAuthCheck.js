import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { toast } from 'react-toastify'


const useAuthCheck = () => {

  const { isAuthenticated } = useAuth0();
  const validateLogin = () => { // Devuelve true o false según sea el estado de autenticación del usuario
    if(!isAuthenticated){
      toast.error("You must login to continue", { position: "botton-right" })
      return false
    }else return true
  }

  return (
    {
      validateLogin // Retornamos la función que valida el estado de autenticación del usuario
    }
  )
}

export default useAuthCheck