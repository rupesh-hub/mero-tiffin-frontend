export class Cart {
  private productId: number;
  private title: string;
  private price: number;
  private quantity: number;
  private image: string;
  private createdBy: string;

  constructor(
    productId: number,
    title: string,
    price: number,
    quantity: number,
    image: string,
    createdBy: string
  ) {
    this.productId = productId;
    this.title = title;
    this.price = price;
    this.quantity = quantity;
    this.image = image;
    this.createdBy = createdBy;
  }
}
