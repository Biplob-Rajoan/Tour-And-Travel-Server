import { z } from 'zod'

const userValidationSchema = z.object({
  name: z
    .string({
      required_error: 'Last name must be provided and must be a string',
    })
    .min(3)
    .max(50),

  age: z
    .number({
      required_error: 'Age must be provided and must be a positive number',
    })
    .int()
    .positive(),

  email: z
    .string({
      required_error: 'Email must be provided and must be a string',
    })
    .email(),

  photo: z
    .string({
      required_error: 'Photo must be provided and must be a string',
    })
    .optional(),
})

export const userValidation = {
  userValidationSchema,
}
