import React, { useContext, useRef, useEffect } from 'react'
import UserDetailContext from '../context/userDetailContext'
import { useQuery } from "react-query"
import { useAuth0 } from "@auth0/auth0-react"
import { getAllFav, getAllBookings } from "../utils/api.js"

const useBookings = () => {
  
  const {userDetails, setUserDetails} = useContext(UserDetailContext);
  const queryRef = useRef();
  const { user } = useAuth0()


  const { data , isLoading, isError, refetch } = useQuery({
    queryKey: "allBookings",
    queryFn: () => getAllBookings(user?.email, userDetails?.token),                   //api: getAllBooking -> backend: /user/allBookings
    onSuccess: (data) => setUserDetails((prev) =>  ({ ...prev, bookings: data })),    // data -> bookings
    enabled: user !== undefined,
    staleTime: 30000
  });

  queryRef.current = refetch; // La función refetch se almacena en queryRef para que pueda ser llamada desde otros lugares

  useEffect(() => {                         // Se ejecuta refetch cuando userDetails?.token cambie
    queryRef.current && queryRef.current()  // Si queryRef.current no es null ni undefined se llama a la fn refetch
  },[userDetails?.token])


  return (
    <div>useBookings</div>
  )
}

export default useBookings