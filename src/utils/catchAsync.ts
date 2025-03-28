import { NextFunction, Request, RequestHandler, Response } from 'express'

const catchAsync = (func: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(func(req, res, next)).catch((error) => next(error))
  }
}

export default catchAsync

// catchAsync(async (req, res) => {
//   const result = await userService.getUser()

//   sendResponse(res, {
//     statusCode: StatusCodes.OK,
//     message: 'User getting Successfully',
//     data: result,
//   })
// })
