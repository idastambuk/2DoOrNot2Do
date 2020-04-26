export class TaskFilters {
  public sortBy: "title" | "description" | "created";
  public direction: "desc" | "asc"
  public filterText: string;

  constructor() {
    this.sortBy = "title";
    this.direction = "desc";
    this.filterText = "";
  }
}

export interface IFilterChange {
  field: keyof TaskFilters;
  value: any
}
