export const getAppointmentsForDay = (state, day) => {
  const appointmentsDay = state.days
    .filter(states => states.name === day)
    .map(states => states.appointments)
    .reduce((acc, val) => acc.concat(val), []);
  const appointment = [];
  appointmentsDay.forEach(states => {
    appointment.push(state.appointments[states]);
  });
  return appointment;
};