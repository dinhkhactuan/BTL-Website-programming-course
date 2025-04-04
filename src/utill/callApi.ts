import { Query } from 'mongoose';

interface IQueryString {
  [key: string]: string | number | undefined;
  fields?: string;
  page?: number;
  sort?: string;
  limit?: number;
}

class ApiFeatures {
  private query: Query<any, any>;
  private queryString: IQueryString;

  constructor(query: Query<any, any>, queryString: IQueryString) {
    this.query = query;
    this.queryString = queryString;
  }

  fillter() {
    const queryObj = { ...this.queryString };
    const fields = ["fields", "page", "sort", "limit"];
    fields.forEach((el) => delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lt|lte)\b/g, (match) => `$${match}`);
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      let checkQuery = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(checkQuery);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fieled = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fieled);
    } else {
      this.query = this.query.select("-__v");
    }
    return this;
  }

  page() {
    const limit = this?.queryString?.limit || 0 * 1 || 100;
    const page = this?.queryString?.page || 0 * 1 || 1;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

export default ApiFeatures;
