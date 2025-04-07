import { FilterQuery, Query } from "mongoose";

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;
  constructor(
    modelQuery: Query<T[], T>,
    query: Record<string, unknown>
  ) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  // SEARCH
  search(searchableFields: string[]) {
    const searchTerm = this?.query?.searchTerm;
    this.modelQuery = this.modelQuery.find({
      $or: searchableFields.map((field: any) => ({
        [field]: { $regex: searchTerm, $options: "i" },
      })),
    } as FilterQuery<T>);
    return this;
  }

  // FILTER

  filter() {
    const queryObj = { ...this.query };

    const excludingImportant = [
      "searchTerm",
      "page",
      "limit",
      "sortBy",
      "sortOrder",
      "fields",
    ];

    //jesob field amader filtering a dorkar nai sesob baad dissi
    excludingImportant.forEach((key) => delete queryObj[key]);
    this.modelQuery = this.modelQuery.find(queryObj);
    return this;
  }

  // PAGINATION
  paginate() {
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    //skip = (page - 1) * limit
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }

  // SORTING
  sort() {
    let sortStr = "";

    if (this?.query?.sortBy && this?.query?.sortOrder) {
      const sortBy = this?.query.sortBy;
      const sortOrder = this?.query.sortOrder;
      // " - price" othoba "price"
      sortStr = `${sortOrder === "desc" ? "-" : ""}${sortBy}`;
    }
    this.modelQuery = this.modelQuery.sort(sortStr);
    return this;
  }

  // SELECTING FIELDS
  select() {
    let fields = "- __v";

    if (this?.query?.fields) {
      fields = (this?.query.fields as string).split(",").join(" ");
    }
    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }
}

export default QueryBuilder;
