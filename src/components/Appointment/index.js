import React from "react";
import Form from "components/Appointment/Form"
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import useVisualMode  from "hooks/useVisualMode";
import "components/Appointment/styles.scss";




const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING";

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
  <article className="appointment">
    <Header time={props.time} />
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    {mode === SHOW && (
    <Show
    student={props.interview.student}
    interviewer={props.interview.interviewer}
    onDelete= {() => transition(CONFIRM)}
    />
    )}
{mode === CONFIRM && ( 
  <Confirm
  onCancel={() => transition(SHOW)}
  onConfirm={() => {
    transition(DELETING, true)
    props.cancelInterview(props.id)
    .then(() => transition(EMPTY))
  }
}
message = "Are you sure you would like to Delete?"
/>
  )}
{mode === DELETING && <Status message="Deleting" />}
    {mode === CREATE && ( <Form
    interviewers = {props.interviewersDay}
    onSave={(name, interviewer) => {
      transition(SAVING);
      props.bookInterview(props.id,save(name, interviewer))
      .then(() => transition(SHOW))
    }}
    onCancel={() => back()}
    />
    )} 
    {mode === SAVING && <Status message="Saving" />}
  </article>
  )
}