import React, { useContext, useRef, useEffect } from 'react'
import UserDetailContext from '../context/userDetailContext'
import { useQuery } from "react-query"
import { useAuth0 } from "@auth0/auth0-react"
import { getAllFav } from "../utils/api.js"

const useFavourites = () => {
  
  const {userDetails, setUserDetails} = useContext(UserDetailContext);
  const queryRef = useRef();
  const { user } = useAuth0()


  const { data , isLoading, isError, refetch } = useQuery({
    queryKey: "allFavourites",
    queryFn: () => getAllFav(user?.email, userDetails?.token),                          //api: getAllFav -> backend: /user/allFav
    onSuccess: (data) => setUserDetails((prev) =>  ({ ...prev, favourites: data })),    // data _> favourites
    enabled: user !== undefined,
    staleTime: 30000
  });

  queryRef.current = refetch; // La función refetch se almacena en queryRef para que pueda ser llamada desde otros lugares

  useEffect(() => {                         // Se ejecuta refetch cuando userDetails?.token cambie
    queryRef.current && queryRef.current()  // Si queryRef.current no es null ni undefined se llama a la fn refetch
  },[userDetails?.token])


  return (
    <div>useFAvourites</div>
  )
}

export default useFavourites