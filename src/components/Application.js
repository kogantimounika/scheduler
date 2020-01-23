import React, { useState, useEffect } from "react";
import DayList from "../components/DayList";
import Appointment from "../components/Appointment";
import axios from "axios";
import "components/Application.scss";


const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "3pm",
    interview: {
      student: "Mounika Koganti",
      interviewer: {
        id: 1,
        name: "Mildred Nazir",
        avatar: "https://i.imgur.com/T2WwVfS.png",
      }
    }
  },
  {
    id: 4,
    time: "5pm",
    interview: {
      student: "Apama",
      interviewer: {
        id: 1,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  },
  {
    id: 5,
    time: "5pm",
    interview: {
      student: "Evelyn",
      interviewer: {
        id: 1,
        name: "Tori Malcolm",
        avatar: "https://i.imgur.com/Nmx0Qxo.png",
      }
    }
  }

];



export default function Application(props) {
  // const [day, setDay] = useState("Monday");
  // const [days, setDays] = useState([]);
  // const [appointments, setAppointments] = useState(hardCodedAppointments);
  const setDay = day => setState({ ...state, day });
  // const setDays = days => setState({...state,days});
  const setDays = days => setState(prev => ({ ...prev, days }));
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });
  // useEffect(() => {
  //   axios.get("http://localhost:8001/api/days").then(response => {
  //   console.log('response:', response);
  //     setDays(response.data);
  //   });
  // }, []);


  useEffect(() => {
    axios.get("http://localhost:8001/api/days")
      .then(response => {
        console.log('response', response)
        setDays(response.data)
      }).catch(error => {
        console.log("error",error)
      })
  }, []);

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
      {appointments.map(appointment =>  {
        return (
        <Appointment
          key={appointment.id} 
          time={appointment.time}
          interview={appointment.interview}
          />)
      })
    }
        {/* <Appointment key="last" time="5pm" /> */}

      </section>
     </main>
  );
  
}


