import React from "react";
import {Button, TextField, Typography} from "@material-ui/core";
import {ITask} from "../../../models/task";
import {isEqual} from "lodash";
import TransitionsModal from "../../modal/modal.component";
import {DatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import DateFnsUtils from "@date-io/date-fns";

interface IState {
  isConfirmationModalVisible: boolean,
  task: ITask
}

interface IProps {
  isNew: boolean;
  closeForm: () => void;
  initialTask?: ITask;
  saveChanges: (task:ITask) => void;
}

export class AddEditFormComponent extends React.Component<IProps, IState> {

  public state: IState = {
    isConfirmationModalVisible: false,
    task: this.props.initialTask ?? {} as ITask,
  }


  render(){
    return (
        <div className="form-container">
          <form autoComplete="off">
            <div>
              <Typography component="h1" variant="h5">
                Title
              </Typography>
              <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="title"
                  label="Todo title"
                  InputLabelProps={{className: "input-label"}}
                  name="title"
                  autoFocus
                  inputProps={{
                    maxLength: 100
                  }}
                  value={this.state.task.title}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.handleChange(event.target.value,'title')}
              />
            </div>
            <div>
              <Typography component="h1" variant="h5">
                Description
              </Typography>
              <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="title"
                  label="Todo title"
                  InputLabelProps={{className: "input-label"}}
                  name="taskDescription"
                  inputProps={{
                    maxLength: 300
                  }}
                  autoFocus
                  value={this.state.task.description}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.handleChange(event.target.value,'description')}
              />
            </div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Select due date"
                disablePast
                value={this.state.task.dueDate}
                onChange={(event: Date|null) => this.handleChange((event as Date).getTime() ?? new Date().getTime(), 'dueDate')}
            />
            </MuiPickersUtilsProvider>
          </form>
          <div style={{marginTop: '15px'}}>
            <button disabled={!(this.state.task.title && this.state.task.description && this.state.task.dueDate)} className="theme-button" onClick={() => this.onSaveTask()}>{this.props.isNew ? 'Add' : 'Save'}</button>
            <button className="theme-button" onClick={() => this.onCancel()}>Cancel</button>
          </div>
          <TransitionsModal isOpen={this.state.isConfirmationModalVisible} onClose={() => this.closeConfirmationModal()}>
                <p>Discard all changes?</p>
                <Button onClick={() => this.closeConfirmationModal()}>Cancel</Button>
                <Button onClick={() => this.props.closeForm()}>Discard</Button>
          </TransitionsModal>
        </div>
    )
  }

  private handleChange(value: any, field: keyof ITask) {
    this.setState({...this.state,  task: {...this.state.task, [field]: value}});
  };

  private openConfirmationModal() {
    this.setState({isConfirmationModalVisible: true});
  };

  private closeConfirmationModal() {
    this.setState({isConfirmationModalVisible: false});
  };

  private onSaveTask() {
    this.props.saveChanges(this.state.task);
    this.props.closeForm();
  }
  onCancel() {
    if (!isEqual(this.state.task, this.props.initialTask ?? {})) {
      this.openConfirmationModal();
    } else {
      this.props.closeForm();
    }
  }
}
