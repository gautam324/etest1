import React, { useState, useContext } from 'react'
import UserDetailContext from '../context/userDetailContext'
import { useAuth0 } from '@auth0/auth0-react'
import useAuthCheck from '../hooks/useAuthCheck.js'
import { useQuery } from 'react-query'
import { getProperty, removeBooking } from '../utils/api'
import { useLocation } from 'react-router-dom'
import { PuffLoader } from 'react-spinners'
import HeartBtn from '../components/HeartBtn'
import { MdOutlineBed, MdOutlineBathtub, MdOutlineGarage } from 'react-icons/md'
import { CgRuler } from 'react-icons/cg'
import { FaLocationDot } from 'react-icons/fa6'
import { Link, useNavigate } from 'react-router-dom'
import Map from '../components/Map'
import BookingModal from '../components/BookingModal'
import { useMutation } from 'react-query'
import { Button } from '@mantine/core'
import { toast } from 'react-toastify'


const Property = () => {

  const { pathname } = useLocation()
  const id = pathname.split("/").slice(-1)[0]           // Obtención del id por el url

  const { data, isLoading, isError } = useQuery(        // Petición a api getProperty -> backend:"/residecy/id" para obtener la data de la property
    ["resd", id],
    () => getProperty(id)
  )

  const [modalOpened, setModalOpened] = useState(false)
  const { validateLogin } = useAuthCheck()              // Fn que comprueba si el usuario esta autenticado
  const { user } = useAuth0()

  const {
    userDetails: { token, bookings },                     // Obtención del context del estado del userDetails {token, bookings}
    setUserDetails
  } = useContext(UserDetailContext)


  const { mutate: cancelBooking, isLoading: cancelling } = useMutation({   // mutation de nombre cancelBooking llama a api/removeBooking -> backend: /user/removeBooking/${id}
    mutationFn: () => removeBooking(id, user?.email, token),
    onSuccess: () => {
      setUserDetails((prev) => ({                                           // Si todo fue bien  
        ...prev,
        bookings: prev.bookings.filter((booking) => booking?.id !== id)    // se quita de bookings[] la entrada correspondiente al id 
      }))
      toast.success("Booking cancelled", { position: 'bottom-right' })
    }
  })


  if (isLoading) {
    return (
      <div className="h-64 flexCenter">
        <PuffLoader
          height="80"
          width="80"
          radius={1}
          color="#555"
          aria-label="puff-loading"
        />
      </div>
    )
  }

  if (isError) {
    return (
      <div>
        <span>Error while fetchin data</span>
      </div>
    )
  }

  return (
    <section className="max-padd-container my-[99px]">
      <div className="pb-2 relative">
        <img
          src={data?.image}
          alt={data?.title}
          className="rounded-xl max-h-[27rem] self-center w-full object-cover"
        />
        {/* like btn */}
        <div className="absolute top-4 right-6">
          <HeartBtn id={id} />
        </div>
      </div>

      {/* container */}
      <div className="xl:flexBetween gap-8">

        {/* left-side */}
        <div className="flex-1">
          <h5 className="bold-16 my-1 text-secondary">{data?.city}</h5>
          <div className="flexBetween">
            <h4 className="medium-18 line-clamp-1">{data?.title}</h4>
            <div className="bold-20">
              ${data.price}.00
            </div>
          </div>

          {/* info */}
          <div className="flex gap-x-4 py-2">
            <div className="flexCenter gap-x-2 border-r border-slate-900/50 pr-4 font-[500]">
              <MdOutlineBed />{data?.facilities.bedrooms}
            </div>
            <div className="flexCenter gap-x-2 border-r border-slate-900/50 pr-4 font-[500]">
              <MdOutlineBathtub />{data?.facilities.bathrooms}
            </div>
            <div className="flexCenter gap-x-2 border-r border-slate-900/50 pr-4 font-[500]">
              <MdOutlineGarage />{data?.facilities.parkings}
            </div>
            <div className="flexCenter gap-x-2 border-r border-slate-900/50 pr-4 font-[500]">
              <CgRuler /> 400
            </div>
          </div>

          <p className="pt-2 mb-4">
            {data.description}
          </p>

          <div className="flexStart gap-x-2 my-5">
            <FaLocationDot />
            <div>
              {data?.address} {data?.city} {data?.country}
            </div>
          </div>

          <div className="flexBetween">
            {/* Si bookings[] incluye el id de la property -> button "Cancel" */}
            {bookings?.map((booking) => booking.id).includes(id) ? (
              <>
                <Button
                  onClick={() => cancelBooking()}
                  variant="outline"
                  w={"100%"}
                  color="red"
                  disabled={cancelling}
                >
                  Cancel booking
                </Button>
                <p className="text-red-500 medium-15 ml-3">
                  You've already booked visit for {bookings?.filter((booking) => booking?.id === id)[0].date}
                </p>
              </>
            ) : (
              <>
                {/* Si Bookings[] no contiene el id de la property se muestra button (Book the visit) */}
                <button
                  className="btn-secondary rounded-xl !py-[7px] !px-4 shadow-sm w-full"
                  onClick={() => { validateLogin() && setModalOpened(true) }}
                >
                  Book the visit
                </button>
              </>
            )
            }

            <BookingModal
              opened={modalOpened}
              setOpened={setModalOpened}
              propertyId={id}
              email={user?.email}
            />
          </div>
        </div>

        {/* rightSide */}
        <div className="flex-1">
          <Map
            address={data?.address}
            city={data?.city}
            country={data?.country}
          />
        </div>
      </div>
    </section>
  )
}

export default Property