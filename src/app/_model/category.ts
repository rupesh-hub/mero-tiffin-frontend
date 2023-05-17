export class Category {
    
  private id: number;
  private name: string;
  private description: string;
  private createdDate: string;
  private createdBy: string;
  private modifiedDate: string;
  private modifiedBy: string;
  private isActive: boolean;

  constructor(
    id: number,
    name: string,
    description: string,
    createdDate: string,
    createdBy: string,
    isActive: boolean,
    modifiedBy: string,
    modifiedDate: string
  ) {
    this.id = id;
    this.isActive = isActive;
    this.name = name;
    this.description = description;
    this.createdBy = createdBy;
    this.createdDate = createdDate;
    this.modifiedBy = modifiedBy;
    this.modifiedDate = modifiedDate;
  }
}
