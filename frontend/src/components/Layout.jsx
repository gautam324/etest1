import React, { useState, useEffect, useContext } from 'react'
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import UserDetailContext from '../context/userDetailContext'
import { useMutation } from 'react-query'
import { useAuth0 } from '@auth0/auth0-react';
import { createUser } from '../utils/api'
import useFavourites from '../hooks/useFavourites'
import useBookings from '../hooks/useBookings.jsx'

const Layout = () => {

  useFavourites()
  useBookings()

  const { isAuthenticated, user, getAccessTokenWithPopup } = useAuth0();  // Cargamos la data del usuario autenticado
  const { userDetails, setUserDetails } = useContext(UserDetailContext);  // Obtenemos la fn para establecer el estado del user en la app
  
  const { mutate } = useMutation({                                        // mutation de  react-query para crear en bd un usuario basado en el email
    mutationKey: [user?.email],
    mutationFn: (token) => createUser(user?.email, token)                 // con validación del token (jwtCheck del backend)
  })

  useEffect(() => {  
    const getTokenAndRegister = async() => {                              // Cada vez que isAuthenticated cambia,

      const res = await getAccessTokenWithPopup({                         // Obtenemos de Auth0 el token de autorización
        authorizationParams: {
          audience: "http://localhost:8000",
          scope: "openid profile email"
        }
      })

      localStorage.setItem("acces_token", res)                           // Se graba el token de acceso en localStorage
      setUserDetails((prev) => ({...prev, token:res}))                   // y se establece el estado del usuario con el mismo.
      mutate(res);                                                       // Por último se crea un usuario en bd en base al email respaldado por el token
    }                                                                    // sino existía antes. 

    isAuthenticated && getTokenAndRegister()                             // Esto se realizará si el usuario se autenticó
    
  },[isAuthenticated])
 
  return (
    <>
      <div>
        <Header />
        <Outlet />
      </div>
      <Footer />
    </>
  )
}

export default Layout