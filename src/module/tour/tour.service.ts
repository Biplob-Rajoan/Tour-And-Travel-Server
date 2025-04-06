import { ITour } from './tour.interface'
import Tour from './tour.model'

const createTour = async (payload: ITour) => {
  //   const result = await Tour.create(payload)

  const data = new Tour(payload)

  //   data.color = "red"

  const result = await data.save()
  return result
}

const getTours = async (query: Record<string, unknown>) => {
  // {searchTerm: "searchterm"}
  console.log('main', query)

  const queryObj = { ...query }

  const excludingImportant = ['searchTerm']

  //jesob field amader filtering a dorkar nai sesob baad dissi
  excludingImportant.forEach((key) => delete queryObj[key])

  console.log(queryObj)

  const searchTerm = query?.searchTerm || ''

  // "name", "startLocation", "locations"

  const searchableFields = ['name', 'startLocation', 'locations']

  // const result = await Tour.find({
  //   $or: [
  //     { name: { $regex: searchTerm, $options: 'i' } },
  //     { startLocation: { $regex: searchTerm, $options: 'i' } },
  //     { locations: { $regex: searchTerm, $options: 'i' } },
  //   ],
  // })

  // const result = await Tour.find({
  //   $or: searchableFields.map((field) => ({
  //     [field]: { $regex: searchTerm, $options: 'i' },
  //   })),
  // })

  const searchQuery = Tour.find({
    $or: searchableFields.map((field) => ({
      [field]: { $regex: searchTerm, $options: 'i' },
    })),
  })

  const result = await searchQuery.find(queryObj)

  return result
}

const getSingleTour = async (id: string) => {
  const result = Tour.findById(id)
  return result
}

const updateTour = async (id: string, payload: Partial<ITour>) => {
  const result = Tour.findByIdAndUpdate(id, payload)
  return result
}

const deleteTour = async (id: string) => {
  const result = Tour.findByIdAndDelete(id)
  return result
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getNextSchedule = async (id: string) => {
  const tour = await Tour.getNextNearestStartDateAndEndData()
  //   const nextSchedule = tour?.getNextNearestStartDateAndEndData()

  return {
    tour,
    // nextSchedule,
  }
}

export const tourService = {
  createTour,
  getTours,
  getSingleTour,
  updateTour,
  deleteTour,
  getNextSchedule,
}
