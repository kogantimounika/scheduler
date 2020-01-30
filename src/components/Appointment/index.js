import React from "react";
import Form from "components/Appointment/Form"
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";
import useVisualMode  from "hooks/useVisualMode";
import "components/Appointment/styles.scss";


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING";
const EDIT = "EDIT";
const ERROR_DELETE = "ERROR_DELETE";
const ERROR_SAVE = "ERROR_SAVE";

export default function Appointment(props) {
 
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    return interview;
  }

  return (
  <article className="appointment" data-testid="appointment">
    <Header time={props.time} />
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

    {mode === SHOW && (
    <Show
    student={props.interview.student}
    interviewer={props.interview.interviewer}
    onDelete= {() => transition(CONFIRM)}
    onEdit= {() => transition(EDIT)}
    />
    )}

    {mode === CONFIRM && ( 
    <Confirm
    onCancel={() => transition(SHOW)}
    onConfirm={() => {
      transition(DELETING, true)
      props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(error => transition(ERROR_DELETE, true));
    }
  }
  message = "Are you sure you would like to Delete?"
  />
  )}

    {mode === DELETING && <Status message="Deleting" />}

    {mode === EDIT && ( <Form
    interviewer = {props.interview.interviewer.id}
    name = {props.interview && props.interview.student}
    interviewers = {props.interviewersDay}
    onSave={(name, interviewer) => {
      transition(SAVING);
      props.bookInterview(props.id,save(name, interviewer))
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_DELETE));
    }}
    onCancel={() => back()} />
    )} 

    {mode === CREATE && ( <Form
    interviewers = {props.interviewersDay}
    onSave={(name, interviewer) => {
      transition(SAVING);
      props.bookInterview(props.id,save(name, interviewer))
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));
    }}
    onCancel={() => back()} />
    )} 

    {mode === SAVING && <Status message="Saving" />}
    {mode === ERROR_SAVE && (
    <Error message = "Could not save appointment" onClose ={() => back()}/>
    )}

    {mode === ERROR_DELETE && (
        <Error message = "Could not cancel appointment" onClose={() => back()} />
        )}
  </article>
  )
}