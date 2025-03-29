import express, { Request, Response } from 'express'
import userRouter from './module/user/user.router'
import tourRouter from './module/tour/tour.router'
//import { StatusCodes } from 'http-status-codes'
import bookingRouter from './module/Booking/booking.routes'
import { globalErrorHandler } from './middlewares/globalErrorHandler'

const app = express()

// middleware
app.use(express.json())

app.use('/api/user', userRouter)
app.use('/api/tour', tourRouter)
app.use('/api/booking', bookingRouter)

// method: POST  /api/user/create-user

app.get('/', (req: Request, res: Response) => {
  res.send({
    status: true,
    message: 'Server Live',
  })
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use(globalErrorHandler)

//Route not found error
app.use('*', (req: Request, res: Response) => {
  res.status(404).json({
    status: false,
    message: 'Route Not Found',
  })
})

export default app
