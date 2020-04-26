import firebase from "firebase";
import {TASKS_URL} from "../../constants/urls";
import {ITask} from "../../models/task";
import {TaskFilters} from "../../models/task-filters";

export const fetchTasksByUid = (uid: string, filters: TaskFilters): any => {
  return firebase.database().ref(TASKS_URL+ uid).orderByChild(filters.sortBy).once('value')
      .then((response: firebase.database.DataSnapshot) => {
        const items: ITask[] = [];
        let filteredItems: ITask[];
        response.forEach((child: any) => {
          items.push(child.val());
        });
        if(filters.filterText) {
          filteredItems = items.filter((item: ITask) => item.title.includes(filters.filterText) || item.description.includes(filters.filterText));
        } else {
          filteredItems = items;
        }
        return filters.direction === "asc" ? filteredItems as ITask[] : filteredItems.reverse() as ITask[];
      }).catch(error => {
        throw error;
      });
}

export const addTask = (uid: string, task: ITask): any => {
  const id = firebase.database().ref(TASKS_URL + uid).push().key!;
    firebase.database().ref(TASKS_URL + uid + "/" + id).set({...task, id})
        .then(() => {
        return task;
      }).catch(error => {
        throw error;
      });
}

export const updateTask = (uid: string, task: ITask): any => {
  return firebase.database().ref(TASKS_URL + uid).update({[task.id]: task})
      .then(() => {
        return task;
      }).catch(error => {
        throw error;
      });
}

export const deleteTask = (uid: string, taskId: string): any => {
  return firebase.database().ref(TASKS_URL + uid).child(taskId).remove()
      .then(() => {
        return taskId;
      }).catch(error => {
        throw error;
      });
}
