/**
 * user - id
 * tour - id
 *
 * bookedSlots
 *
 * bookingStatus
 *
 */

import mongoose from 'mongoose'

/**
 * bus - Dhaka - Cox's Bazar
 * 30 seats
 *
 * 1 Family -> 4 seats
 *
 * 30 seats - 4 seats = 26 seats
 *
 * 30 - 4 = 26
 *
 * 26 + 4 = 30
 *
 *  */
/**
 *
 *
 *
 *
 *
 *
 *
 *  */

export interface IBooking {
  user: mongoose.Schema.Types.ObjectId
  tour: mongoose.Schema.Types.ObjectId
  bookedSlots: number
  bookingStatus: 'PENDING' | 'PAID' | 'CANCELLED'
  totalPrice: number
}
