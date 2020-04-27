import React from "react";
import TransitionsModal from "../../components/modal/modal.component";
import {AddEditFormComponent} from "../../components/task-list/add-edit-task/add-edit-form.component";
import {connect} from "react-redux";
import {ITask} from "../../models/task";
import {deleteTasksAction, updateTaskAction, updateTaskSuccessAction} from "../../store/task-list/task-list.actions";
import {IAppState} from "../../app-state";
import {ArrowBack} from "@material-ui/icons";
import {TaskDetailsComponent} from "../../components/task-list/task-details/task-details.component";
import {Button, CircularProgress, ThemeProvider} from "@material-ui/core";
import {changeRouteAction} from "../../store/routing/routing.actions";
import {RouteInfo} from "../../constants/routes";
import {darkTheme} from "../../constants/themes";

interface IProps {
  task: ITask | null;
  onUpdateTask: (task: ITask, successCallback: () => void) => void;
  onDeleteTask: (taskId: string, successCallback: () => void) => void;
  onResetCurrentTask: () => void;
  goBack: () => void;
  isLoading: boolean;
}

interface IState {
  isEditTaskModalOpen: boolean;
  isConfirmationModalVisible: boolean;
}

class TaskDetailsPageInner extends React.Component<IProps> {

  constructor(props: IProps) {
    super(props);
    this.closeModal = this.closeModal.bind(this)
  }

  public state: IState = {
    isEditTaskModalOpen: false,
    isConfirmationModalVisible: false
  }

  render() {
    const {task} = this.props;
    return task &&
        (<>
          <header><ArrowBack style={{cursor: 'pointer'}} onClick={() => this.goToLanding()}/></header>
          <div style={{paddingTop: '15%'}}>
            {this.props.isLoading &&
            <div className="loader"><CircularProgress color="inherit"/></div>}
          <TaskDetailsComponent
              task={task}
              onDeleteTask={() => this.openConfirmationModal()}
              onEditTask={() => this.onEditTask()}/>
          <TransitionsModal
              isOpen={this.state.isEditTaskModalOpen}
              onClose={() => this.closeModal()}>
            <AddEditFormComponent
                isNew={false}
                initialTask={task!}
                saveChanges={(task: ITask) => this.props.onUpdateTask(task, this.closeModal)}
                closeForm={() => this.closeModal()}/>
          </TransitionsModal>
          <ThemeProvider theme={darkTheme}>
            <TransitionsModal isOpen={this.state.isConfirmationModalVisible}
                              onClose={() => this.closeConfirmationModal()}
                              optionalClass={"confirmation-modal"}>
              <p>Delete task?</p>
              <Button onClick={() => this.closeConfirmationModal()}>Cancel</Button>
              <Button onClick={() => this.props.onDeleteTask(task.id, this.props.goBack)}>Delete</Button>
            </TransitionsModal>
          </ThemeProvider>
        </div>
          </>)
  }

  onEditTask() {
    this.setState({isEditTaskModalOpen: true})
  }

  closeModal() {
    this.setState({isEditTaskModalOpen: false})
  }

  private openConfirmationModal() {
    this.setState({isConfirmationModalVisible: true});
  };

  private closeConfirmationModal() {
    this.setState({isConfirmationModalVisible: false});
  };

  goToLanding() {
    this.props.goBack();
    this.props.onResetCurrentTask();
  }
}

const mapState = (state: IAppState) => ({
  isLoading: state.taskList.loading,
  task: state.taskList.currentTask,
})

const mapDispatch = (dispatch: any) => ({
  goBack: () => dispatch(changeRouteAction({routeInfo: RouteInfo.taskList()})),
  onUpdateTask: (task: ITask, successCallback: () => void) => dispatch(updateTaskAction(task, successCallback)),
  onResetCurrentTask: () => dispatch(updateTaskSuccessAction(null)),
  onDeleteTask: (taskId: string, successCallback: () => void) => dispatch(deleteTasksAction([taskId], successCallback))
})

export const TaskDetailsPage = connect(mapState, mapDispatch)(TaskDetailsPageInner);
