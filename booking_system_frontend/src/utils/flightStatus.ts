/**
 * Derives a human-readable flight status from departure and arrival timestamps.
 * All logic is client-side — no backend call needed.
 */

export type FlightStatus =
  | 'Scheduled'
  | 'Check-in Open'
  | 'Boarding'
  | 'Departed'
  | 'Arrived';

export interface FlightStatusInfo {
  label: FlightStatus;
  color: string;    // Tailwind bg class
  textColor: string; // Tailwind text class
}

export const getFlightStatus = (
  departureTime: string,
  arrivalTime: string,
  now: Date = new Date()
): FlightStatusInfo => {
  const departure = new Date(departureTime);
  const arrival   = new Date(arrivalTime);
  const nowMs     = now.getTime();
  const depMs     = departure.getTime();
  const arrMs     = arrival.getTime();
  const diffHours = (depMs - nowMs) / (1000 * 60 * 60);

  if (nowMs >= arrMs) {
    return { label: 'Arrived',       color: 'bg-gray-100',   textColor: 'text-gray-600'   };
  }
  if (nowMs >= depMs) {
    return { label: 'Departed',      color: 'bg-orange-100', textColor: 'text-orange-700' };
  }
  if (diffHours <= 2) {
    return { label: 'Boarding',      color: 'bg-yellow-100', textColor: 'text-yellow-700' };
  }
  if (diffHours <= 4) {
    return { label: 'Check-in Open', color: 'bg-green-100',  textColor: 'text-green-700'  };
  }
  return   { label: 'Scheduled',     color: 'bg-blue-100',   textColor: 'text-blue-700'   };
};
