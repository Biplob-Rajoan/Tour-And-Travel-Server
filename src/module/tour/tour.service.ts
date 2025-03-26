import { ITour } from './tour.interface'
import Tour from './tour.model'

const createTour = async (payload: ITour) => {
  const result = await Tour.create(payload)
  return result
}

const getTours = async () => {
  const result = await Tour.find()
  return result
}

const getsingleTour = async (id: string) => {
  const result = await Tour.findById(id)
  return result
}

const getUpdateTour = async (id: string, payload: Partial<ITour>) => {
  const result = await Tour.findByIdAndUpdate(id, payload)
  return result
}

const deleteTour = async (id: string) => {
  const result = await Tour.findByIdAndDelete(id)
  return result
}

export const tourService = {
  createTour,
  getTours,
  getsingleTour,
  getUpdateTour,
  deleteTour,
}
