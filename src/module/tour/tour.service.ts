import QueryBuilder from "../../builder/queryBuilder";
import { ITour } from "./tour.interface";
import Tour from "./tour.model";

const createTour = async (payload: ITour) => {
  //   const result = await Tour.create(payload)

  const data = new Tour(payload);

  //   data.color = "red"

  const result = await data.save();
  return result;
};

const getTours = async (query: Record<string, unknown>) => {
  // // {searchTerm: "searchterm"}
  // console.log("main", query);

  // const queryObj = { ...query };

  // const excludingImportant = [
  //   "searchTerm",
  //   "page",
  //   "limit",
  //   "sortBy",
  //   "sortOrder",
  //   "fields",
  // ];

  // //jesob field amader filtering a dorkar nai sesob baad dissi
  // excludingImportant.forEach((key) => delete queryObj[key]);

  // console.log(queryObj);

  // const searchTerm = query?.searchTerm || "";

  // // "name", "startLocation", "locations"

  // const searchableFields = ["name", "startLocation", "locations"];

  // // const result = await Tour.find({
  // //   $or: [
  // //     { name: { $regex: searchTerm, $options: 'i' } },
  // //     { startLocation: { $regex: searchTerm, $options: 'i' } },
  // //     { locations: { $regex: searchTerm, $options: 'i' } },
  // //   ],
  // // })

  // // const result = await Tour.find({
  // //   $or: searchableFields.map((field) => ({
  // //     [field]: { $regex: searchTerm, $options: 'i' },
  // //   })),
  // // })

  // // const searchQuery = await Tour.find(
  // //   {
  // //     $and: [
  // //       {
  // //         $or: searchableFields.map((field) => ({
  // //           [field]: { $regex: searchTerm, $options: "i" },
  // //         })),
  // //       },
  // //     ],
  // //   },
  // //   queryObj
  // // );

  // const searchQuery = Tour.find({
  //   $or: searchableFields.map((field) => ({
  //     [field]: { $regex: searchTerm, $options: "i" },
  //   })),
  // });

  // //filtering
  // // const result = await searchQuery.find(queryObj);
  // const filterQuery = searchQuery.find(queryObj);

  // // PAGINATION
  // // Page: 1---> 1-10
  // //2---> 11-20
  // //3---> 21-30
  // //4---> 31-40
  // // keep in mind that skip and  limit

  // const page = Number(query?.page) || 1;
  // const limit = Number(query?.limit) || 10;
  // //skip = (page - 1) * limit
  // const skip = (page - 1) * limit;

  // //const result = await filterQuery.skip(skip).limit(limit);

  // // SORTING

  // const paginatedQuery = filterQuery.skip(skip).limit(limit);

  // let sortStr = "";

  // if (query?.sortBy && query?.sortOrder) {
  //   const sortBy = query.sortBy;
  //   const sortOrder = query.sortOrder;
  //   // " - price" othoba "price"
  //   sortStr = `${sortOrder === "desc" ? "-" : ""}${sortBy}`;
  // }
  // console.log("sort", sortStr);

  // //const result = await paginatedQuery.sort(sortStr);
  // const sortQuery =  paginatedQuery.sort(sortStr);

  // let fields = "- __v";

  // if (query?.fields) {
  //   fields = (query.fields as string).split(",").join(" ");
  // }

  // const result = await sortQuery.select(fields);

  // // (modelQuery, query) => (...)
  // // modelQuery.model.schema.path

  const searchableFields = ["name", "startLocation", "locations"];
  const tours = new QueryBuilder(Tour.find(), query)
    .search(searchableFields)
    .filter()
    .sort()
    .paginate()
    .select();

  const result = await tours.modelQuery;

  return result;
};

const getSingleTour = async (id: string) => {
  const result = Tour.findById(id);
  return result;
};

const updateTour = async (id: string, payload: Partial<ITour>) => {
  const result = Tour.findByIdAndUpdate(id, payload);
  return result;
};

const deleteTour = async (id: string) => {
  const result = Tour.findByIdAndDelete(id);
  return result;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getNextSchedule = async (id: string) => {
  const tour = await Tour.getNextNearestStartDateAndEndData();
  //   const nextSchedule = tour?.getNextNearestStartDateAndEndData()

  return {
    tour,
    // nextSchedule,
  };
};

export const tourService = {
  createTour,
  getTours,
  getSingleTour,
  updateTour,
  deleteTour,
  getNextSchedule,
};
