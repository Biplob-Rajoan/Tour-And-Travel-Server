import express, { NextFunction, Request, Response } from 'express'
import userRouter from './module/user/user.router'
import tourRouter from './module/tour/tour.router'
import { StatusCodes } from 'http-status-codes'

const app = express()

// middleware
app.use(express.json())

app.use('/api/user', userRouter)
app.use('/api/tour', tourRouter)

// method: POST  /api/user/create-user

app.get('/', (req: Request, res: Response) => {
  res.send({
    status: true,
    message: 'Server Live',
  })
})

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err)
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    status: false,
    message: err.message,
    error: err,
  })
})

export default app
