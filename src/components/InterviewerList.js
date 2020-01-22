// import React from "react";
// import InterviewerListItem from "./InterviewerListItem"
// import "components/InterviewerList.scss"


// export default function InterviewerList(props) {
//   //  const { interviewers, setInterviewer, interviewer } = props;
//    const interviewers = props.interviewers.map(interviewer => {
//     return (
//       <InterviewerListItem
//         key={interviewer.id}
//         name={interviewer.name}
//         avatar={interviewer.avatar}
//         selected={interviewer.id === props.value}
//         setInterviewer={event => props.setInterviewer(interviewer.id)}
//       />
//     );
//   });

//     return (
//       <section className="interviewers">
//       <h4 className="interviewers__header text--light">Interviewer</h4>
//       <ul className="interviewers__list">{interviewers}</ul>
//       </section>
//     )
// }


import React from "react";
import InterviewerListItem from "./InterviewerListItem"
import "components/InterviewerList.scss";
export default function InterviewerList(props) {
  const { interviewers, onChange, value } = props;
  const interviewerList = interviewers.map(({
    id,
    name,
    avatar
  }) => {
    return (
      <InterviewerListItem
        key={id}
        name={name}
        avatar={avatar}
        selected={id === value}
        setInterviewer={() => onChange(id)}
      />
    );
  });
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewerList}</ul>
    </section>
  );
};
