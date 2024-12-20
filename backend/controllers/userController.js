import asyncHandler from 'express-async-handler'
import { prisma } from '../config/prismaConfig.js'

export const createUser = asyncHandler(async(req, res) => {
  console.log("creating user");

  let {email} = req.body;
  //console.log(email)

  const userExists = await prisma.user.findUnique({where: {email: email}});

  if(!userExists){
    const user = await prisma.user.create({data: req.body});
    res.send({
      message: "user registered successfully",
      user: user,
    })
  }else{
    res.status(201).send({
      message: "user already registered"
    }) 
  }
});

// To book a visit to resd
export const bookVisit = asyncHandler(async(req, res) => {

  const {email, date} = req.body;
  const {id} = req.params;

  try {
    console.log(`Received request to book visit for email: ${email}, date: ${date}, propertyId: ${id}`);
    const allreadyBooked = await prisma.user.findUnique({ // Se busca en el usuario con el email propocionado todas sus visitas programadas
      where: { email },
      select: { bookedVisits: true }
    });

    if (!allreadyBooked) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    console.log(`User's booked visits: ${JSON.stringify(allreadyBooked.bookedVisits)}`);

    if(allreadyBooked.bookedVisits.some((visit) => visit.id === id)){ // Si en sus visitas programadas hay alguna cuyo id coincida con el del argumento
      console.log('The visit is already booked by this user.');
      return res.status(400).json({
        message: "This residency already booked by you"               // mensaje de que ya estaba programada (booked)
      })
    }else{
      console.log('Booking a new visit.');
      await prisma.user.update({                                      // Si en sus visitas programadas no hay ninguna que coincida con el id del argumento
        where: { email },                                             // se procede a actualizar el campo bookedVisits del usuario con dicho id
        data: {
          bookedVisits: { push: {id, date}}
        }
      })
    }

    return res.send("Your visit is booked succesfully");

  } catch (err) {
    console.error(`Error booking visit: ${err.message}`);
    throw new Error(err.message)
  }
});

// To get all bookings
export const allBookings = asyncHandler(async(req, res) => {
  
  const { email } = req.body;

  try {

    const bookings = await prisma.user.findUnique({
      where: { email },
      select: { bookedVisits: true }
    });

    res.status(200).send(bookings);
    
  } catch (err) {
    throw new Error(err.message)
  }
})


// To cancel a booking
export const cancelBooking = asyncHandler(async(req, res) => {
  
  const { email } = req.body; // email del usuario que quiere visitar
  const { id } = req.params;  // id de la residencia a visitar

  try {

    const user = await prisma.user.findUnique({                             // Se busca el usuario según el email
      where: { email },
      select: { bookedVisits: true }                                        // mostrando el objeto bookedVisits
    });

    const index = user.bookedVisits.findIndex((visit) => visit.id === id)   // Se busca el índice dentro de user.bookedVisits correspondiente al id de los params

    if (index === -1) {                                                     // Si index = -1 
      res.status(404).json({ message: "Booking not found" })                // no se encontró ninguna visita con el id especificado en user.bookedVisits.
    }else{                                                                  // Si index != 1
      user.bookedVisits.splice(index, 1);                                   // elimina el elemento en user.bookedVisits en la posición index usando splice
      await prisma.user.update({                                            // Se actualiza el usuario según email
        where: {email},
        data: {                                                             // con el nuevo contenido de bookedVisits
          bookedVisits: user.bookedVisits
        }
      })

      res.send("Booking cancelled successfully")
    }

  } catch (err) {
    throw new Error(err.message)
  }
});

// To add a residency in favorites list of a user
export const toFav = asyncHandler(async(req, res) => {

  const {email} = req.body; // Email del usuario
  const {rid} = req.params; // id de la residencia que se quiere añadir a favoritos  

  try {
    const user = await prisma.user.findUnique({ // Se busca el usuario según email
      where: {email}
    });

    if (user.favResidenciesID.includes(rid)){            // Si en las residencias favoritas del usuario está incluida la que se quiere añadir
      const updatedUser = await prisma.user.update({     // se actualiza el user.favResidenciesID eliminando el rid ( Pulsar en una existente -> borrarla) 
        where: {email},
        data: {
          favResidenciesID: {
            set: user.favResidenciesID.filter( (id) => id !== rid )  // Solo se deján los ids distintos del rid
          }
        }
      })

      res.send({message: "Removed from favourites", user: updatedUser})
    
    }else{                                              // Si por el contrario en las residendicas favoritas del usuario no esta incluida la que se quiere añadir
      const updatedUser = await prisma.user.update({    // se actualiza el user.favResidenciesID añadiendo el rid (pulsar en una inexistente -> añadirla)
        where: {email},
        data: {
          favResidenciesID: {
            push: rid
          }
        }
      })

      res.send({message: "Updated favourites", user: updatedUser})
    }

  } catch (err) {
    throw new Error(err.message)
  }
});

// To get all favourites list
export const getAllFav = asyncHandler(async(req, res) => {
  const { email } = req.body

  try {
    const favResd = await prisma.user.findUnique({
      where: {email},
      select: {favResidenciesID: true}
    });

    res.status(200).send(favResd)

  } catch (err) {
    throw new Error(err.message)
  }

})


