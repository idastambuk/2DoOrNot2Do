import React from "react";
import {FormControl, Input, InputLabel, Select} from "@material-ui/core";
import SortByAlpha from '@material-ui/icons/SortByAlphaTwoTone';
import {debounce} from "lodash";
import {TaskFilters} from "../../../models/task-filters";

interface IProps {
  activeFilters: TaskFilters;
  onChangeFilters: (field: keyof TaskFilters, value: any) => void;
}

interface IState {
  filterText: string;
}

export class TaskFilterComponent extends React.Component<IProps, IState> {

  private debounced = debounce(this.props.onChangeFilters, 500, {'maxWait': 1000});

  public state: IState = {
    filterText: ""
  };

  render() {
    return (
        <div className="filter-container">
          <div className="filter-element">
            <FormControl>
              <InputLabel
                  style={{color: "#ffff"}}
                  color={undefined}
                  htmlFor="sortBy">Sort by field</InputLabel>
              <Select
                  native
                  value={this.props.activeFilters.sortBy}
                  color={undefined}
                  onChange={(event: any) => this.props.onChangeFilters('sortBy', event.target.value)}
                  inputProps={{
                    name: 'sortBy',
                    id: 'sortBy'
                  }}
              >
                <option aria-label="Sort by" value=""/>
                <option value={"title"}>Title</option>
                <option value={"description"}>Description</option>
                <option value={"created"}>Date created</option>
                <option value={"dueDate"}>Due date</option>
              </Select>
            </FormControl>
          </div>
          <div className="sort-icon">
            <SortByAlpha
                className={this.props.activeFilters.direction === "asc" ? "filled" : ""}
                onClick={() => this.props.onChangeFilters('direction', this.props.activeFilters.direction === "desc" ? "asc" : "desc")}/>
          </div>
          <div className="filter-element">
            <FormControl>
              <InputLabel style={{color: "#ffff"}} color={undefined} htmlFor="textFilter">Find title or
                description</InputLabel>
              <Input
                  color={undefined}
                  id="textFilter"
                  value={this.state.filterText}
                  inputProps={{
                    maxLength: 15,
                    style: {color: '#ffff'}
                  }}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.filterTasks(event)}/>
            </FormControl>
          </div>
        </div>
    )
  }

  private filterTasks(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({filterText: event.target.value});
    this.debounced('filterText', event.target.value);
  }
}
