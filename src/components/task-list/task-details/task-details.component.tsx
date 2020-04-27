import React from "react";
import {ITask} from "../../../models/task";
import {MomentHelper} from "../../helpers/moment-helper";
import {Delete, Edit} from "@material-ui/icons";

interface IProps {
  task: ITask;
  onEditTask: () => void;
  onDeleteTask: () => void;
}

export const TaskDetailsComponent = (props: IProps) => {
  const {task} = props;
  return (
      <div className="task-details-container">
        <div className="actions">
          <Edit style={{cursor: 'pointer'}} onClick={props.onEditTask}/>
          <Delete style={{cursor: 'pointer'}} onClick={props.onDeleteTask}/>
        </div>
        <div className="task-details">
          <h5 className="title">{task.title}</h5>
          <div className="task">
            <p className="label">Title</p>
            <p className="item">{task.title}</p>
          </div>
          <div className="task">
            <p className="label">Description</p>
            <p className="item">{task.description}</p>
          </div>
          <div className="task">
            <p className="label">Due date</p>
            <p className="item">{MomentHelper.formatDueDate(task.dueDate)}</p>
          </div>
          <div className="task">
            <p className="label">Created</p>
            <p className="item">{MomentHelper.formatDate(task.created)}</p>
          </div>
        </div>
      </div>
  )
}
