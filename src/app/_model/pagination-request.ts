export class PaginationRequest {
  private totalRecords: number;
  private pageSize: number;
  private page: number;
  private totalPages: number;

  constructor(
    totalRecords: number,
    pageSize: number,
    page: number,
    totalPages: number
  ) {
    this.totalRecords = totalPages;
    this.pageSize = pageSize;
    this.page = page;
    this.totalPages = totalPages;
  }
}
