import { FilterQuery, Query } from "mongoose";

class QueryBuilder<T> {
    public modelQuery: Query<T[], T>;
    public query: Record<string, unknown>;
    // constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    //     this.modelQuery = modelQuery;
    //     this.query = query;
    // }
    constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
        this.modelQuery = modelQuery;
        this.query = query;
    }

    search(searchAbleFields: string[]) {

        const searchTerm = this?.query?.search
        if (searchTerm) {
            this.modelQuery = this.modelQuery.find({
                $or: searchAbleFields.map((field) => ({
                    [field]: { $regex: searchTerm, $options: 'i' }
                }) as FilterQuery<T>)
            })
        }
        return this
    }

    filter() {
        const queryObj = { ...this.query } // copy

        // filturing
        const excludeFields = ['search', 'sortBy', 'sortOrder']

        excludeFields.forEach((el) => delete queryObj[el])

        this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>)

        // console.log({ query }, { queryObj });
        return this
    }



    sort() {
        // Default sort field and order
        const defaultSort = "-createdAt -title";

        // Extracting sortBy and sortOrder from the query
        const sortBy = this?.query?.sortBy as string || defaultSort;
        const sortOrder = this?.query?.sortOrder as string || "asc";

        // Constructing the sort string
        const sortFields = sortBy.split(',');
        const sortDirections = sortOrder.split(',');

        // Map fields to their respective directions
        const combinedSort = sortFields.map((field, index) => {
            const order = sortDirections[index]?.toLowerCase() === 'desc' ? '-' : '';
            return `${order}${field}`;
        }).join(' ');

        // Applying sort to the model query
        this.modelQuery = this.modelQuery.sort(combinedSort);

        return this;
    }


    paginate() {
        const page = Number(this?.query?.page) || 1;
        const limit = Number(this?.query?.limit) || 10;
        const skip = (page - 1) * limit;

        this.modelQuery = this.modelQuery.skip(skip).limit(limit);

        return this
    }

    fields() {
        const fields = (this?.query.fields as string)?.split(',')?.join(' ') || '-__v';
        this.modelQuery = this.modelQuery.select(fields);
        return this
    }

}

export default QueryBuilder