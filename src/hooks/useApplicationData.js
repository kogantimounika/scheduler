import { useState, useEffect } from "react";
import { getInterviewersForDay } from "../helpers/selectors";
import axios from "axios";


export default function useApplicationData() {

 const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });


  const setDay = day => setState({ ...state, day });
  const setInterviwers = interviewersDay => setState({ ...state, interviewersDay});

  
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`/api/appointments/${id}`, { interview })
    .then(() => setState({...state, appointments}))
  }
  
  function cancelInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.delete(`/api/appointments/${id}`, { interview: null})
    .then(() => setState({...state, appointments}))
  }


  useEffect(() => {
    const days = axios.get("http://localhost:8001/api/days");
    const appointments = axios.get("http://localhost:8001/api/appointments");
    const interviewers = axios.get("http://localhost:8001/api/interviewers");
    Promise.all([ days, appointments, interviewers]).then(([responseDays, responseAppointments, responseInterviewers]) => {
      console.log("days", responseDays);
      console.log("appointments", responseAppointments);
      console.log("interviewers", interviewers);
        
      const result = getInterviewersForDay({
        interviewers: responseInterviewers.data,
        days: responseDays.data
      }, state.day)

      setState(prev => ({
        ...prev,
        days: responseDays.data,
        appointments: responseAppointments.data,
        interviewers: responseInterviewers.data,
        interviewersDay: result
      }))
    });
  }, []);


  useEffect(() => {
    const result = getInterviewersForDay(state, state.day)
    setInterviwers(result);
  }, [state.day])

  return { state, setDay ,bookInterview, cancelInterview }
} 