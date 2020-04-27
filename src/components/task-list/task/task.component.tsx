import React from "react";
import {ITask} from "../../../models/task";
import {Button} from "@material-ui/core";
import {MomentHelper} from "../../helpers/moment-helper";
import {CheckCircle, CheckCircleOutline} from "@material-ui/icons";

interface IProps {
  task: ITask;
  onClick: (event: any) => void;
  toggleComplete: () => void;
  isSelected: boolean;
  onViewTaskDetails: () => void;
}

export class TaskComponent extends React.Component<IProps> {
  render() {
    const {task} = this.props;
    return (
        <div className="card">
          <div className={`face face1 ${this.props.isSelected && 'selected'}`} onClick={this.props.onClick}>
            <div className="content">
              <p><span>due </span>{MomentHelper.formatDueDate(task.dueDate)}</p>
              <img
                  alt="task-icon"
                  src="https://github.com/Jhonierpc/WebDevelopment/blob/master/CSS%20Card%20Hover%20Effects/img/design_128.png?raw=true"/>
              <h3>{task.title}</h3>
            </div>
          </div>
          <div className="face face2">
            <div className="content">
              <p>{task.description}</p>
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <button className="view" onClick={(event: React.SyntheticEvent) => this.onViewTaskDetails(event)}>View</button>
                {task.isCompleted ?
                    <Button onClickCapture={(event: React.SyntheticEvent) => this.toggleComplete(event)}>
                      <CheckCircle/>
                    </Button>
                    :
                    <Button className="toggle"
                            onClickCapture={(event: React.SyntheticEvent) => this.toggleComplete(event)}>
                      <CheckCircleOutline/>
                    </Button>
                }
              </div>
            </div>
          </div>
        </div>
    )
  }

  private toggleComplete = (event: React.SyntheticEvent) => {
    event.stopPropagation();
    this.props.toggleComplete();
  }

  private onViewTaskDetails = (event: React.SyntheticEvent) => {
    event.stopPropagation();
    this.props.onViewTaskDetails();
  }
}
