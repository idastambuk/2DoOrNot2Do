import React from "react";
import {ITask} from "../../../models/task";
import {Button, Card, Checkbox, SvgIcon} from "@material-ui/core";
import {MomentHelper} from "../../helpers/moment-helper";
import {CheckCircle, CheckCircleOutline} from "@material-ui/icons";

interface IProps {
  task: ITask;
  onClick: (event: any) => void;
  toggleComplete: () => void;
  isSelected: boolean;
  onViewTaskDetails: () => void;
}
export const TaskComponent = (props: IProps) => {
  const {task} = props;

  const toggleComplete = (event: React.SyntheticEvent) => {
    event.preventDefault();
    event.persist();
    event.nativeEvent.stopImmediatePropagation();
    event.nativeEvent.stopPropagation();
    props.toggleComplete();
  }

  const onViewTaskDetails = (event: React.SyntheticEvent) => {
    event.stopPropagation();
    props.onViewTaskDetails();
  }

  return (
      <div className="card" onClick={props.onClick}>
        <div className={`face face1 ${props.isSelected && 'selected'}`}>
          <div className="content">
            <p><span>due </span>{MomentHelper.formatDueDate(task.dueDate)}</p>
            <img
                src="https://github.com/Jhonierpc/WebDevelopment/blob/master/CSS%20Card%20Hover%20Effects/img/design_128.png?raw=true"/>
              <h3>{task.title}</h3>
          </div>
        </div>
        <div className="face face2">
          <div className="content">
            <p>{task.description}</p>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <a onClick={(event: React.SyntheticEvent) => onViewTaskDetails(event)}>View</a>
            {task.isCompleted ?
                <Button>
                  <CheckCircle/>
                </Button>:
                <Button onClick={(event: React.SyntheticEvent) => toggleComplete(event)}>
                  <CheckCircle/>
                </Button>
            }
            </div>
          </div>
        </div>
      </div>
  )
}
