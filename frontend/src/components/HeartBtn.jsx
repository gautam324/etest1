import React, { useState, useContext, useEffect } from 'react'
import { FaHeart } from 'react-icons/fa'
import useAuthCheck from '../hooks/useAuthCheck'
import { useMutation } from 'react-query'
import { useAuth0 } from '@auth0/auth0-react'
import UserDetailContext from '../context/userDetailContext'
import { updateFavourites, checkFavourites } from '../utils/common'
import { toFav } from '../utils/api'

const HeartBtn = ({id}) => {

  const [heartColor, setHeartColor] = useState('white');
  const { validateLogin } = useAuthCheck()                      // Fn que comprueba si el usuario esta autenticado
  const { user } = useAuth0()

  const {
    userDetails: { token, favourites },                         // Obtención del context del estado del userDetails {token, favourites}
    setUserDetails
  } = useContext(UserDetailContext)


  useEffect(() => {
    setHeartColor(() => checkFavourites( id, favourites))
  },[favourites])


  const { mutate } = useMutation({                              // mutate llama a api fn toFav -> backend: 'user/toFav
    mutationFn: () => toFav(id, user?.email, token),
    onSuccess: () => {                                          // Si tiene éxito
      setUserDetails((prev) => (                                // se establece el estado de userDetails
        {
          ...prev,
          favourites: updateFavourites(id, prev.favourites)     // añadiendo o quitando de favourites el id de la res según este o no en el [] 
        }
      ))
    }
  })


  const handleLike = () => {
      if(validateLogin){
        mutate()
        setHeartColor((prev) => prev === '#8ac243' ? "white" : "#8ac243")
      }
  }

  return (
    <FaHeart 
      onClick={(e) => {
        e.stopPropagation();
        handleLike()
      }}
      color={heartColor}
      size={23}
      className="cursor-pointer drop-shadow-sm"
    />
  )
}

export default HeartBtn