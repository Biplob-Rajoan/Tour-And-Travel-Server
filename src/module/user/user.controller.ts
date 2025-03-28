//req and response manage

//;import User from './user.model'
import { userService } from './user.service'
import sendResponse from '../../utils/sendResponse'
import { StatusCodes } from 'http-status-codes'
import catchAsync from '../../utils/catchAsync'

const createUser = catchAsync(async (req, res) => {
  const payload = req.body

  const result = await userService.createUser(payload)

  //const result = await User.create(payload)

  // res.json({
  //   status: true,
  //   message: 'User Created Successfully',
  //   result,
  // })
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: 'User Created Successfully',
    data: result,
  })
})
const getUser = catchAsync(async (req, res) => {
  const result = await userService.getUser()
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'User getting Successfully',
    data: result,
  })
})

const getSingleUser = catchAsync(async (req, res) => {
  console.log(req.params)
  const userId = req.params.userId
  const result = await userService.getSingleUser(userId)

  // res.send({
  //   status: true,
  //   message: 'User getting Successfully',
  //   data: result,
  // })
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'User getting successfully',
    data: result,
  })
})
const updateUser = catchAsync(async (req, res) => {
  const userId = req.params.userId
  const body = req.body

  const result = await userService.updateUser(userId, body)

  // res.send({
  //   status: true,
  //   message: 'User updated Successfully',
  //   data: result,
  // })
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'User updated Successfully',
    data: result,
  })
})
const deleteUser = catchAsync(async (req, res) => {
  const userId = req.params.userId

  const result = await userService.deleteUser(userId)

  // res.send({
  //   status: true,
  //   message: 'User deleted Successfully',
  //   result: {},
  // })
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'User deleted Successfully',
    data: result,
  })
})
export const userController = {
  createUser,
  getUser,
  getSingleUser,
  updateUser,
  deleteUser,
}
