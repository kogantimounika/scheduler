import React from "react";
import "components/InterviewerListItem.scss";
import classnames from 'classnames';


export default function InterviewerListItem(props) {

    const interviewerClass = classnames("interviewers__item", {
      "interviewers__item--selected": props.selected,
      "interviewers__item-image": props.avatar
    });
  
    return (
      <li className={interviewerClass} onClick={() => props.setInterviewer(props.name)}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
    )
  }







