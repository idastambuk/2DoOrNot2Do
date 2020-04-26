import React from "react";
import TransitionsModal from "../../components/modal/modal.component";
import {AddEditFormComponent} from "../../components/task-list/add-edit-task/add-edit-form.component";
import {connect} from "react-redux";
import {ITask} from "../../models/task";
import {deleteTasksAction, updateTaskAction} from "../../store/task-list/task-list.actions";
import {IAppState} from "../../app-state";
import {Delete, EditAttributes} from "@material-ui/icons";
import {TaskDetailsComponent} from "../../components/task-list/task-details/task-details.component.";
import {CircularProgress} from "@material-ui/core";

interface IProps {
  task: ITask | null;
  onUpdateTask: (task: ITask) => void;
  onDeleteTask: (taskId: string) => void;
  isLoading: boolean;
}

interface IState {
  isEditTaskModalOpen: boolean;
}

class TaskDetailsPageInner extends React.Component<IProps> {

  public state: IState = {
    isEditTaskModalOpen: false
  }

  render() {
    const {task} = this.props;
    return task &&
        (<div style={{paddingTop: '15%'}}>
          {this.props.isLoading &&  <CircularProgress/>}
          <TaskDetailsComponent
              task={task}
              onDeleteTask={() => this.props.onDeleteTask(task.id)}
              onEditTask={() => this.onEditTask()}/>
          <TransitionsModal
              isOpen={this.state.isEditTaskModalOpen}
              onClose={() => this.closeModal()}>
            <AddEditFormComponent
                isNew={false}
                initialTask={task!}
                saveChanges={this.props.onUpdateTask}
                closeForm={() => this.closeModal()}/>
          </TransitionsModal>
        </div>)
  }

  onEditTask() {
    this.setState({isEditTaskModalOpen: true})
  }

  closeModal() {
    this.setState({isEditTaskModalOpen: false})
  }
}

const mapState = (state: IAppState) => ({
  isLoading: state.taskList.loading,
  task: state.taskList.currentTask,
})

const mapDispatch = (dispatch: any) => ({
  onUpdateTask: (task: ITask) => dispatch(updateTaskAction(task)),
  onDeleteTask: (taskId: string) => dispatch(deleteTasksAction([taskId]))
})

export const TaskDetailsPage = connect(mapState, mapDispatch)(TaskDetailsPageInner);
