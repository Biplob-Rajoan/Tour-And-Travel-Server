import { Response } from 'express'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleValidationError = (err: any, res: Response) => {
  // err.errors.

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const issues = Object.values(err.errors).map((item: any) => {
    return {
      path: item.path,
      message: item.message,
    }
  })

  console.log(issues)

  res.status(400).json({
    success: false,
    message: err.message,
    issues: issues,
    error: err,
  })
}
