import React, {ReactElement} from "react";
import {ITask} from "../../models/task";
import {Button} from "@material-ui/core";
import {TaskComponent} from "./task/task.component";
import {TaskFilterComponent} from "./task-filter/task-filter.component";
import {TaskFilters} from "../../models/task-filters";
import TransitionsModal from "../modal/modal.component";

interface IProps {
  completedTasks: ITask[];
  toDoTasks: ITask[];
  toggleComplete: (task: ITask) => void;
  onDelete: (taskIds: string[]) => void;
  onViewTaskDetails: (taskId: string) => void;
  activeFilters: TaskFilters;
  onChangeTaskFilters: (field: keyof TaskFilters, value: any) => void;
  onAddNewTask: () => void;
}

interface IState {
  selectedTaskIds: string[];
  isConfirmationModalVisible: boolean;
}

export class TaskListComponent extends React.Component<IProps, IState> {
  public state: IState = {
    selectedTaskIds: [],
    isConfirmationModalVisible: false
  }

  render() {
    return (
        <div style={{padding: '30px 0'}}>
          <div className="list-actions">
            <TaskFilterComponent activeFilters={this.props.activeFilters}
                                 onChangeFilters={this.props.onChangeTaskFilters}/>
            <button className="theme-button" onClick={() => this.openConfirmationModal()}
                    disabled={this.state.selectedTaskIds.length === 0}>Delete selected
            </button>
          </div>
          <div className="task-column-container">
            <div className="task-column">
              <p className="column-title">In progress</p>
              <button onClick={() => this.props.onAddNewTask()} className="add-button"></button>
              <div className="task-container">
                {this.renderTaskColumns(this.props.toDoTasks)}
              </div>
            </div>
            <div className="task-column">
              <p className="column-title">Completed</p>
              <div className="task-container">
                {this.renderTaskColumns(this.props.completedTasks)}
              </div>
            </div>
          </div>
          <TransitionsModal isOpen={this.state.isConfirmationModalVisible}
                            optionalClass="confirmation-modal"
                            onClose={() => this.closeConfirmationModal()}>
            <p>Delete items?</p>
            <Button onClick={() => this.closeConfirmationModal()}>Cancel</Button>
            <Button onClick={() => this.deleteTasks()}>Delete</Button>
          </TransitionsModal>
        </div>
    )
  }

  private renderTaskColumns = (tasks: ITask[]): ReactElement[] => {
    return tasks.map((task: ITask) => {
      return (<TaskComponent
          key={task.id}
          isSelected={this.state.selectedTaskIds.includes(task.id)}
          task={task}
          toggleComplete={this.props.toggleComplete.bind(this, task)}
          onViewTaskDetails={this.props.onViewTaskDetails.bind(this, task.id)}
          onClick={() => this.selectTask(task)}/>)
    })
  }

  private selectTask(task: ITask) {
    const index = this.state.selectedTaskIds.indexOf(task.id);
    let newIds = [...this.state.selectedTaskIds];
    if (index >= 0) {
      newIds.splice(index, 1);
    } else {
      newIds.push(task.id);
    }
    this.setState({selectedTaskIds: newIds})
  }

  private deleteTasks() {
    this.props.onDelete(this.state.selectedTaskIds);
    this.setState({selectedTaskIds: [], isConfirmationModalVisible: false});
  }

  private openConfirmationModal() {
    this.setState({isConfirmationModalVisible: true});
  };

  private closeConfirmationModal() {
    this.setState({isConfirmationModalVisible: false});
  };
}
