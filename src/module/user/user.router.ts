import { NextFunction, Request, Response, Router } from 'express'
import { userController } from './user.controller'
import { userValidation } from './userValidation'

const userRouter = Router()

userRouter.post(
  '/create-user',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await userValidation.userValidationSchema.parseAsync(req.body)
      next()
    } catch (error) {
      next(error)
    }
  },
  userController.createUser
)
userRouter.get('/', userController.getUser)
userRouter.get('/:userId', userController.getSingleUser)
userRouter.put('/:userId', userController.updateUser)
userRouter.delete('/:userId', userController.deleteUser)

export default userRouter
