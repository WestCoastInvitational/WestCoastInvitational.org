export interface ScheduleItem {
  time: string;
  label: string;
  big?: boolean;
}

// Tentative. Times are estimates and may change.
export const schedule: ScheduleItem[] = [
  { time: "7:30–8:00 AM", label: "Volunteers arrive" },
  { time: "8:30 AM", label: "Venue opens" },
  { time: "8:30–9:30 AM", label: "Team check-in" },
  { time: "9:00–10:30 AM", label: "Robot inspection" },
  { time: "9:30–10:30 AM", label: "Practice matches" },
  { time: "10:45–11:30 AM", label: "Opening ceremonies & drivers' meeting", big: true },
  { time: "11:30 AM–12:00 PM", label: "Qualification matches", big: true },
  { time: "12:00–12:45 PM", label: "Lunch" },
  { time: "12:45–3:45 PM", label: "Qualification matches", big: true },
  { time: "4:00–4:15 PM", label: "Alliance selection", big: true },
  { time: "4:30–6:00 PM", label: "Playoffs", big: true },
  { time: "6:05–6:15 PM", label: "Closing ceremonies" },
  { time: "6:30 PM", label: "Venue closes" },
  { time: "6:30–7:30 PM", label: "Teardown" },
];
