import React from 'react';

interface Appointment {
  id: string;
  customerName: string;
  service: string;
  time: string;
  image: string;
}

interface AppointmentsListProps {
  appointments: Appointment[];
}

const AppointmentsList = ({ appointments }: AppointmentsListProps) => (
  <div className="bg-white p-6 rounded-lg shadow-sm">
    <h2 className="text-lg font-semibold mb-4">Recent Appointments</h2>
    <div className="space-y-4">
      {appointments.map((appointment) => (
        <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-4">
            <img
              src={appointment.image}
              alt={appointment.customerName}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="font-medium">{appointment.customerName}</p>
              <p className="text-sm text-gray-500">{appointment.service}</p>
            </div>
          </div>
          <span className="text-sm text-purple-600 font-medium">{appointment.time}</span>
        </div>
      ))}
    </div>
  </div>
);

export default AppointmentsList;