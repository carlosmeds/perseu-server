export class Pagination {
  static paginate(query: any) {
    const pageSize = query.pageSize ? Number(query.pageSize) : 10;
    const page = query.page ? Number(query.page) : 1;
    const skip = (page - 1) * pageSize;
    const search = query.search || ''

    return {
      page,
      pageSize,
      skip,
      search,
    };
  }
}
