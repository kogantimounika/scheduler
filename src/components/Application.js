import React, { useState, useEffect } from "react";
import DayList from "../components/DayList";
import Appointment from "../components/Appointment";
import axios from "axios";
import "components/Application.scss";
import { getAppointmentsForDay, getInterview } from "../helpers/selectors";



export default function Application(props) {
  const setDay = day => setState({ ...state, day });
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });


  useEffect(() => {
    const days = axios.get("http://localhost:8001/api/days");
    const appointments = axios.get("http://localhost:8001/api/appointments");
    const interviewers = axios.get("http://localhost:8001/api/interviewers");
    Promise.all([ days, appointments, interviewers]).then(([responseDays, responseAppointments, responseInterviewers]) => {
      console.log("days", responseDays);
      console.log("appointments", responseAppointments);
      console.log("interviewers", interviewers);

      setState(prev => ({
        days: responseDays.data,
        appointments: responseAppointments.data,
        interviewers: responseInterviewers.data,
      }))
  
    });
  }, []);

  const appointments = getAppointmentsForDay(state, state.day);

  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
  
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
        <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
        <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
      {schedule}
        <Appointment key="last" time="5pm" />

      </section>
     </main>
  );
  
}


