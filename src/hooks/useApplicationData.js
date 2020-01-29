import React, { useEffect, useReducer } from "react";

import {
  getInterviewersForDay,
} from "../helpers/selectors";

import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW,
  UPDATE_SPOTS
} from "reducers/application";
import axios from "axios";

export default function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  function setDay(day) {
    dispatch({ type: SET_DAY, value: day });
  }

  // Booking Interview

  function bookInterview(id, interview) {
    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then(() => {
        dispatch({ type: SET_INTERVIEW, interview: interview, id: id });
      })
      .then(() => dispatch({ type: UPDATE_SPOTS, id: id }));
  }
  
  // function To cancel an interview

  function cancelInterview(id, interview) {
    return axios
      .delete(`/api/appointments/${id}`, { interview: null })
      .then(() => {
        dispatch({ type: SET_INTERVIEW, id: id });
      })
      .then(() => {
        dispatch({ type: UPDATE_SPOTS, id: id });
      });
  }

  // to connect to an api

  useEffect(() => {
    const days = axios.get("/api/days");
    const appointments = axios.get("/api/appointments");
    const interviewers = axios.get("/api/interviewers");
    Promise.all([days, appointments, interviewers]).then(
      ([responseDays, responseAppointments, responseInterviewers]) => {
        const result = getInterviewersForDay(
          {
            interviewers: responseInterviewers.data,
            days: responseDays.data
          },
          state.day
        );
        dispatch({
          type: SET_APPLICATION_DATA,
          days: responseDays.data,
          appointments: responseAppointments.data,
          interviewers: responseInterviewers.data,
          interviewersDay: result
        });
      }
    );
  }, []);

  return { bookInterview, state, setDay, cancelInterview };
}