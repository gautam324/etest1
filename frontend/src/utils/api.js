import axios from 'axios'
import dayjs from 'dayjs'
import { toast } from 'react-toastify'

export const api = axios.create({
  baseURL: "http://localhost:8000/api" // Backend
})

export const getAllProperties = async() => {

  try {
    const response = await api.get("/residency/allresd", {
      timeout: 10 * 1000
    })

    if(response.status === 400 || response.status === 500){
      throw response.data
    }

    return response.data;

  } catch (error) {
    toast.error("something went wrong")
    throw error
  }
};

export const getProperty = async(id) => {

  try {
    const response = await api.get(`/residency/${id}`, {
      timeout: 10 * 1000
    })

    if (response.status === 400 || response.status === 500) {
      throw response.data
    }

    return response.data;

  } catch (error) {
    toast.error("something went wrong")
    throw error
  }
}

export const createUser = async(email, token) => {    // Esta fn apunta a la route del backend para la creación de un usuario en bd
  try {
    await api.post(`/user/register`, {email}, {       // Le envía el email
      headers: {
        Authorization: `Bearer ${token}`              // y el token de autenticación
      }
    })
  } catch (error) {
    toast.error("Something went wrong, Please try again")
    throw error
  }

}

export const bookVisit = async (value, propertyId, email, token) => {
  try {
    await api.post(`/user/bookVisit/${propertyId}`, 
      { 
        email,
        id: propertyId,
        date: dayjs(value).format('DD/MM/YYYY')
      }, 
      {       
        headers: {
          Authorization: `Bearer ${token}`              
        }
      }
    )
  } catch (error) {
    toast.error("Something went wrong, Please try again")
    throw error
  }
}

export const removeBooking = async (id, email, token) => {
  try {
    await api.post(`/user/removeBooking/${id}`,
      {email},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
  } catch (error) {
    toast.error("Something went wrong, Please try again")
    throw error
  }
}

export const toFav = async( id, email, token) => {
  try {
    await api.post(`/user/toFav/${id}`,
      {email},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
  } catch (error) {
    toast.error("Something went wrong, Please try again")
    throw error
  }
}

export const getAllFav = async(email, token) => {
  if(!token) return

  try {
    const res = await api.post(`/user/allFav`, 
      {email},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    return res.data["favResidenciesID"]
  } catch (error) {
    toast.error("Something went wrong while fetching favs, Please try again")
    throw error
  }
}

export const getAllBookings = async(email, token) => {
  if(!token) return

  try {
    const res = await api.post(`/user/allBookings`, 
      {email},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    //console.log("res", res);
    return res.data["bookedVisits"]
  } catch (error) {
    toast.error("Something went wrong while fetching bookings, Please try again")
    throw error
  }
}

export const createResidency = async( data, userEmail, token ) => {
  console.log({...data});
  const requestData = {...data, userEmail}
  console.log(requestData);
  
  try {
    const res = await api.post(`/residency/create`,
      requestData,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    //return res.data
  } catch (error) {
    throw error
  }
}