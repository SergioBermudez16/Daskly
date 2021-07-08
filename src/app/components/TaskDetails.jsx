import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../store/actions";

const TaskDetails = ({
  id,
  comments,
  task,
  isComplete,
  groups,

  setTaskCompletion,
  setTaskGroup,
  setTaskName,
}) => (
  <div>
    <div>
      <input onChange={setTaskName} value={task.name}></input>
    </div>
    <h2>{task.name}</h2>
    <button onClick={() => setTaskCompletion(id, !isComplete)}>
      {isComplete ? "ReOpen" : "Complete"}
    </button>

    <select onChange={setTaskGroup} value={task.group}>
      {groups.map((group) => (
        <option key={group.id} value={group.id}>
          {group.name}
        </option>
      ))}
    </select>
    <Link to="/dashboard">
      <button>Done</button>
    </Link>
  </div>
);

const mapStateToProps = (state, ownProps) => {
  let id = ownProps.match.params.id;
  let task = state.tasks.find((task) => task.id == id);
  let groups = state.groups;

  return {
    id,
    task,
    groups,
    isComplete: task.isComplete,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const id = ownProps.match.params.id;
  return {
    setTaskCompletion(id, isComplete) {
      dispatch(actions.setTaskCompletion(id, isComplete));
    },
    setTaskGroup(e) {
      dispatch(actions.setTaskGroup(id, e.target.value));
    },
    setTaskName(e) {
      dispatch(actions.setTaskName(id, e.target.value));
    },
  };
};

export const ConnectedTaskDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskDetails);
