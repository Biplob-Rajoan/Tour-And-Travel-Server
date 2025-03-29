/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import mongoose from 'mongoose'
import { handleGenericError } from '../helpers/handleGenericError'
import { handleDuplicateError } from '../helpers/handleDuplicateError'
import { handleCastError } from '../helpers/handleCastError'
import { handleValidationError } from '../helpers/handleValidationError'
import { handleZodError } from '../helpers/handleZodError'

/**
 * ERROR
 * GENERIC ERROR
 * DUPLICATE
 * VALIDATION
 * CAST ERROR - TYPE CASTING ERROR  ---   implemenntion done
 * ZOD ERROR / JOI ERROR
 */

type TErrorResponse = {
  success: boolean
  message: string
  error: any
}

export const globalErrorHandler = (
  err: any, //TErrorResponse,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err.name && err.name === 'ZodError') {
    handleZodError(err, res)
  } else if (err instanceof mongoose.Error.CastError) {
    handleCastError(err, res)
  } else if (err instanceof mongoose.Error.ValidationError) {
    handleValidationError(err, res)
  } else if (err.code && err.code === 11000) {
    handleDuplicateError(err, res)
  } else if (err instanceof Error) {
    handleGenericError(err, res)
  }

  console.log('error from app.ts', err)

  console.log()
}

// Error - string = err.message
// Error - Customize - Array, Object, String, - JS Error

/**
 * JS Code
 *
 * error - JS Error -> customize -> new pattern of Error
 *
 * any error is a instance of Error class of JS
 *
 */
