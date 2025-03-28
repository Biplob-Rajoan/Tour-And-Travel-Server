import mongoose from 'mongoose'
import Tour from '../tour/tour.model'
import { IBooking } from './booking.interface'
import Booking from './booking.model'

const createBooking = async (payload: IBooking): Promise<IBooking> => {
  //   const { tour, bookedSlots } = payload
  //   const requiredTour = await Tour.findById(tour)
  //   if (!requiredTour) {
  //     throw new Error('Tour not found')
  //   }
  //   const totalPrice = requiredTour.price * bookedSlots
  //   payload.totalPrice = totalPrice
  //   payload.bookingStatus = 'PENDING'
  //   // availableSeats = 2
  //   // bookedSlots = 3
  //   if (requiredTour.availableSeats < bookedSlots) {
  //     throw new Error('Not enough seats available')
  //   }
  //   const booking = await Booking.create(payload)
  //   //throw new Error('Failed to create booking')
  //   //availableSeats  = availableSeats - bookedSlots
  //   const updatedTour = await Tour.findByIdAndUpdate(
  //     tour,
  //     {
  //       $inc: { availableSeats: -bookedSlots },
  //     },
  //     { new: true }
  //   )
  //   if (!updatedTour) {
  //     throw new Error('Failed to update tour')
  //   }
  //   return booking

  // TRANSACTION AND ROLLBACK

  /**
   * clone database
   * sandbox - test database\
   * test database
   * 
   * database - error
   * database - delete
   * 
   * database - success
   * database - merge
   */

  const session = await mongoose.startSession()

  session.startTransaction()

  try {

    
        const { tour, bookedSlots } = payload
    const requiredTour = await Tour.findById(tour)
    if (!requiredTour) {
      throw new Error('Tour not found')
    }
    const totalPrice = requiredTour.price * bookedSlots
    payload.totalPrice = totalPrice
    payload.bookingStatus = 'PENDING'
    // availableSeats = 2
    // bookedSlots = 3
    if (requiredTour.availableSeats < bookedSlots) {
      throw new Error('Not enough seats available')
    }
    const booking = await Booking.create([payload], { session })
    //throw new Error('Failed to create booking')
    //availableSeats  = availableSeats - bookedSlots
    const updatedTour = await Tour.findByIdAndUpdate(
      tour,
      {
        $inc: { availableSeats: -bookedSlots },
      },
      { new: true }
    )
    if (!updatedTour) {
      throw new Error('Failed to update tour')
    }
    return booking


    
  } catch (error) {
    
  }

}

export const bookingService = {
  createBooking,
}
