export class TaskFilters {
  public sortBy: "title" | "description" | "created" | "dueDate";
  public direction: "desc" | "asc"
  public filterText: string;

  constructor() {
    this.sortBy = "dueDate";
    this.direction = "asc";
    this.filterText = "";
  }
}

export interface IFilterChange {
  field: keyof TaskFilters;
  value: any
}
