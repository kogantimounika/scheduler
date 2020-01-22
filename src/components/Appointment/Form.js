import React, {useState} from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";


export default function Form(props) {
  const { interviewers, onCancel, onSave } = props;
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  function reset() {
    setName("");
    setInterviewer(null);
  }
  function cancel() {
    reset();
    onCancel();
  }
  function save() {
    onSave(name, interviewer);
  }


  return (
  <main className="appointment__card appointment__card--create">
    <section className="appointment__card-left">
      <form autoComplete="off">
        <input
        className="appointment__create-input text--semi-bold"
        name="name"
        type="text"
        value={name}
        placeholder="Enter Student Name"
        onChange={(event) => setName(event.target.value)}
        data-testid="student-name-input"
        // onSave = {(event) => setName(event.target.value)}
        /*
          This must be a controlled component
        */
  
        />
      </form>
      <InterviewerList 
      interviewers={interviewers} 
      value={interviewer} 
      onChange={setInterviewer} />
    </section>
    <section className="appointment__card-right">
      <section className="appointment__actions">
      <Button confirm onClick={save} >Save</Button>
      <Button onClick={cancel} danger>Cancel</Button>
      
      </section>
    </section>
  </main>
  )
}