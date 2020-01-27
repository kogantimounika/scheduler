import React , { useEffect , useReducer } from "react";

import {getInterviewersForDay,findDayByAppointment} from "../helpers/selectors";

import axios from "axios";

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";
const SET_INTERVIEWERS = "SET_INTERVIEWERS";
const UPDATE_SPOTS = "UPDATE_SPOTS";

function reducer(state, action) {
  switch (action.type){
    case SET_DAY:
      return {...state, day: action.value};
    case SET_APPLICATION_DATA:
      return {...state, days: action.days, appointments: action.appointments, interviewers: action.interviewers, interviewersDay : action.interviewersDay};
    case SET_INTERVIEW:
      const updated = {
        ...state.appointments[action.id],
        interview: action.interview
      };
      const updateAppointments = {
      ...state.appointments,
      [action.id]: updated
      };
      return {...state,
        appointments: updateAppointments};
    case SET_INTERVIEWERS:
      const result = getInterviewersForDay(state, state.day)
      return{...state, interviewersDay: result}
    case UPDATE_SPOTS:
    const dayId = findDayByAppointment(action.id, state);
    const aptIds = state.days[dayId].appointments;
      let newSpots = 0;
        for (let i = 0; i < aptIds.length; i++) {
          if (state.appointments[aptIds[i]].interview === null) {
            newSpots += 1;
          }
        }
      return {...state, 
      days: state.days.map((item, index) => {
        if (index !== dayId) {
          return item
        } else {
          return {
            ...item,
            spots: newSpots
          }
        }
      })}
    default:
      throw new Error(`Tried to reduce with unsupported action type: ${action.type}`
      ); 
  }
}


export default function useApplicationData() {

  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  
  function setDay(day) {
    dispatch({ type: SET_DAY, value: day })
  };


  function bookInterview(id, interview) {
    return axios.put(`/api/appointments/${id}`, { interview })
    .then(() => {dispatch({type: SET_INTERVIEW, interview : interview , id : id})})
    .then(() => dispatch({ type: UPDATE_SPOTS, id: id }))
  };


  function cancelInterview(id,interview) {
    return axios.delete(`/api/appointments/${id}`, { interview :  null})
    .then(() => {dispatch({type: SET_INTERVIEW, id : id})})
    .then(() => {dispatch({ type: UPDATE_SPOTS, id: id })})
  };


  useEffect(() => {
    const days = axios.get("http://localhost:8001/api/days");
    const appointments = axios.get("http://localhost:8001/api/appointments");
    const interviewers = axios.get("http://localhost:8001/api/interviewers");
    Promise.all([ days, appointments, interviewers])
    .then(([responseDays, responseAppointments, responseInterviewers]) => {
      const result = getInterviewersForDay({ 
        interviewers: responseInterviewers.data, 
        days: responseDays.data 
      }, state.day)
      dispatch({type:SET_APPLICATION_DATA,
                days: responseDays.data,
        appointments: responseAppointments.data,
        interviewers: responseInterviewers.data,
        interviewersDay: result})
    });
  }, []);

  useEffect(() => {
    dispatch({type: SET_INTERVIEWERS})
  }, [state.day]);
  return {bookInterview, state, setDay, cancelInterview}
}
