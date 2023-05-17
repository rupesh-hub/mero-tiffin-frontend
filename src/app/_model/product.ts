import { Category } from './category';

export class Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  thumbnail: string;
  images: any;
  quantity: number;
  weight: number;
  createdDate: string;
  createdBy: string;
  modifiedDate: string;
  modifiedBy: string;
  isActive: boolean;
  category: Category;

  constructor(
    id: number,
    title: string,
    description: string,
    price: number,
    discountPercentage: number,
    rating: number,
    stock: number,
    brand: string,
    category: Category,
    thumbnail: string,
    images: any,
    quantity: number,
    weight: number,
    createdDate: string,
    createdBy: string,
    modifiedDate: string,
    modifiedBy: string,
    isActive: boolean
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.price = price;
    this.discountPercentage = discountPercentage;
    this.rating = rating;
    this.stock = stock;
    this.brand = brand;
    this.category = category;
    this.thumbnail = thumbnail;
    this.images = images;
    this.quantity = quantity;
    this.weight = weight;
    this.createdDate = createdDate;
    this.createdBy = createdBy;
    this.modifiedDate = modifiedDate;
    this.modifiedBy = modifiedBy;
    this.isActive = isActive;
  }
}
