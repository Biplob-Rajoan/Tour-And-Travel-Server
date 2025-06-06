import { Response } from 'express'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleZodError = (err: any, res: Response) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const issues = err.issues.map((item: any) => {
    return {
      path: item.path.join(''),
      message: item.message,
    }
  })

  res.status(400).json({
    success: false,
    message: err.message,
    issues: issues,
    error: err,
  })
}
