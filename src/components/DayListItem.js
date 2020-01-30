import React from "react";
import "components/DayListItem.scss";
import classnames from 'classnames';


export default function DayListItem(props) {
  const displayClass = classnames("day-list__item", {
    "day-list__item--selected" : props.selected,
    "day-list__item--full" : !props.spots
  });
  const formatSpots = function() {
    if(props.spots > 1) {
      return `${props.spots} spots remaining`;
    } else if (props.spots === 1) {
      return `${props.spots} spot remaining`;
    } else {
      return "no spots remaining";
    }
  }
  return (
    <li className= { displayClass } onClick={() => props.setDay(props.name)} data-testid="day">
    <h2 className="text--regular">{ props.name }</h2>
    <h3 className="text--light">{ formatSpots() }</h3>
    </li>
    );
  }
