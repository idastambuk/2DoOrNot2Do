import React from "react";
import {CircularProgress, ThemeProvider} from "@material-ui/core";
import TransitionsModal from "../../components/modal/modal.component";
import {AddEditFormComponent} from "../../components/task-list/add-edit-task/add-edit-form.component";
import {connect} from "react-redux";
import {ITask} from "../../models/task";
import {
  addTaskAction,
  changeTaskFilters,
  deleteTasksAction,
  updateTaskAction
} from "../../store/task-list/task-list.actions";
import {IAppState} from "../../app-state";
import {TaskListComponent} from "../../components/task-list/task-list.components";
import {TaskFilters} from "../../models/task-filters";
import {changeRouteAction} from "../../store/routing/routing.actions";
import {RouteInfo} from "../../constants/routes";
import {ArrowBack} from "@material-ui/icons";
import {darkTheme} from "../../constants/themes";

interface IProps {
  activeFilters: TaskFilters;
  taskList: ITask[];
  onAddTask: (task: ITask, successCallback: () => void) => void;
  onFetchTasks: (filters: TaskFilters) => void;
  toggleComplete: (task: ITask) => void;
  onDeleteTasks: (taskIds: string[]) => void;
  onChangeTaskFilters: (field: keyof TaskFilters, value: any) => void;
  onViewTaskDetails: (taskId: string) => void;
  isLoading: boolean;
  goHome: () => void;
}

interface IState {
  isAddNewTaskModalOpen: boolean;
}

class TaskListPageInner extends React.Component<IProps> {

  constructor(props: IProps) {
    super(props);
    this.closeModal = this.closeModal.bind(this)
  }
  public state: IState = {
    isAddNewTaskModalOpen: false
  }


  render() {
    const {completedTasks, toDoTasks} = this.divideTasksByCompletion();
    return (
        <ThemeProvider theme={darkTheme}>
          <header><ArrowBack style={{cursor: 'pointer'}} onClick={() => this.props.goHome()}/></header>
          <div className="task-list-container">
            {this.props.isLoading &&
            <div className="loader"><CircularProgress color="inherit"/></div>}
            <TransitionsModal
                isOpen={this.state.isAddNewTaskModalOpen}
                onClose={() => this.closeModal()}>

              <AddEditFormComponent
                  isNew={true}
                  saveChanges={(task: ITask) => this.props.onAddTask(task, this.closeModal)}
                  closeForm={() => this.closeModal()}/>
            </TransitionsModal>
            <TaskListComponent
                activeFilters={this.props.activeFilters}
                onChangeTaskFilters={this.props.onChangeTaskFilters}
                onAddNewTask={() => this.openModal()}
                completedTasks={completedTasks}
                toDoTasks={toDoTasks}
                toggleComplete={this.props.toggleComplete}
                onViewTaskDetails={this.props.onViewTaskDetails}
                onDelete={this.props.onDeleteTasks}/>
          </div>
        </ThemeProvider>
    )
  }

  private divideTasksByCompletion() {
    const completedTasks: ITask[] = [];
    const toDoTasks: ITask[] = [];
    this.props.taskList.forEach((task: ITask) => {
      task.isCompleted ? completedTasks.push(task) : toDoTasks.push(task)
    })
    return {completedTasks, toDoTasks}
  }

  openModal() {
    this.setState({isAddNewTaskModalOpen: true})
  }

  closeModal() {
    this.setState({isAddNewTaskModalOpen: false})
  }
}

const mapState = (state: IAppState) => ({
  isLoading: state.taskList.loading,
  activeFilters: state.taskList.taskListActiveFilters,
  taskList: state.taskList.data,
})

const mapDispatch = (dispatch: any) => ({
  goHome: () => dispatch(changeRouteAction({routeInfo: RouteInfo.landing()})),
  toggleComplete: (task: ITask) => dispatch(updateTaskAction({...task, isCompleted: !task.isCompleted}, () => {return;})),
  onAddTask: (task: ITask, successCallback: () => void) => dispatch(addTaskAction(task, successCallback)),
  onChangeTaskFilters: (field: keyof TaskFilters, value: any) => dispatch(changeTaskFilters({field, value})),
  onDeleteTasks: (taskIds: string[]) => dispatch(deleteTasksAction(taskIds)),
  onViewTaskDetails: (taskId: string) => dispatch(changeRouteAction({
    routeInfo: RouteInfo.taskDetails(taskId),
    isPush: false
  }))
})

export const TaskListPage = connect(mapState, mapDispatch)(TaskListPageInner)
