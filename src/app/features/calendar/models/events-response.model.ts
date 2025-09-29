import { CalendarEvent } from './calendar-event.model';

export interface EventsResponse {
  items: CalendarEvent[];
  total: number;
  size: number;
  from: number;
  has_next: boolean;
  has_prior: boolean;
}
