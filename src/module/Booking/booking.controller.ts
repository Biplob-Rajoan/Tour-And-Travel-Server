import { StatusCodes } from 'http-status-codes'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { bookingService } from './booking.service'

const createBooking = catchAsync(async (req, res) => {
  const payload = req.body

  const result = await bookingService.createBooking(payload)

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: 'Booking Created Successfully',
    data: result,
  })
})

export const bookingController = {
  createBooking,
}
