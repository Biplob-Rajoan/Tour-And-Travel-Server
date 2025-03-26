import { model, Schema } from 'mongoose'
import { IUser } from './user.interface'

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    minlength: [3, 'Name must be at least 3 characters'],
    maxlength: [50, 'Name must be at most 50 characters'],
  },
  age: {
    type: Number,
    required: [true, 'Please provide a age'],
  },
  email: {
    type: String,
    required: [true, 'Please provide a email'],
    unique: true,
    validate: {
      validator: function (value: string) {
        return /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(value)
      },
      message: '{VALUE} is not a valid email',
    },
    immutable: true,
  },
  photo: String,
  role: {
    type: String,
    enum: {
      values: ['admin', 'user'],
      message: '{VALUE} is not valid, Please provide valid role',
    },
    required: true,
    default: 'user',
  },
  userStatus: {
    type: String,
    enum: ['active', 'inactive'],
    required: true,
    default: 'active',
  },
})

// //hook -> pre hook
// userSchema.pre('find', function (this, next) {
//   this.find({ userStatus: { $eq: 'active' }})
//   next()
// })

// //hook -> post hook
// userSchema.post('find', function (docs, next) {
//   docs.foreach((docs: IUser) => {
//     docs.name = docs.name.toUpperCase()
//   })
//   next()
// })

const User = model<IUser>('User', userSchema)
export default User
