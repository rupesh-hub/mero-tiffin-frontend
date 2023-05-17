export class PagingRequest {
  private searchField: any;
  private page: number;
  private limit: number;
  private userId: string;

  constructor(searchField: any, page: number, limit: number, userId: string) {
    this.searchField = searchField;
    this.page = page;
    this.limit = limit;
    this.userId = userId;
  }
}
