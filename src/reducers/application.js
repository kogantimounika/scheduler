import {
  getInterviewersForDay,
  findDayByAppointment
} from "../helpers/selectors";

export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";
export const SET_INTERVIEWERS = "SET_INTERVIEWERS";
export const UPDATE_SPOTS = "UPDATE_SPOTS";

export default function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return { ...state, day: action.value };

    case SET_APPLICATION_DATA:
      return {
        ...state,
        days: action.days,
        appointments: action.appointments,
        interviewers: action.interviewers,
        interviewersDay: action.interviewersDay
      };

    case SET_INTERVIEW:
      const updated = {
        ...state.appointments[action.id],
        interview: action.interview
      };
      const updateAppointments = {
        ...state.appointments,
        [action.id]: updated
      };
      return { ...state, appointments: updateAppointments };
    case SET_INTERVIEWERS:
      const result = getInterviewersForDay(state, state.day);
      return { ...state, interviewersDay: result };
    case UPDATE_SPOTS:
      const dayId = findDayByAppointment(action.id, state);
      const aptIds = state.days[dayId].appointments;
      let openSpots = 0;
      for (let i = 0; i < aptIds.length; i++) {
        if (!state.appointments[aptIds[i]].interview) {
          openSpots += 1;
        }
      }
      return {
        ...state,
        days: state.days.map((item, index) => {
          if (index !== dayId) {
            return item;
          } else {
            return {
              ...item,
              spots: openSpots
            };
          }
        })
      };
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}