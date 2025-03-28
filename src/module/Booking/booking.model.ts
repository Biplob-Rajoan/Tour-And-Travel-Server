import { model, Schema } from 'mongoose'
import { IBooking } from './booking.interface'

const bookingSchema = new Schema<IBooking>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    tour: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    bookedSlots: {
      type: Number,
      required: true,
    },
    bookingStatus: {
      type: String,
      enum: ['PENDING', 'PAID', 'CANCELLED'],
      default: 'PENDING',
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
)

const Booking = model<IBooking>('Booking', bookingSchema)

export default Booking
