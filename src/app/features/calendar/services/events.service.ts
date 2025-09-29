import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EventDetails } from '../models/event-details.model';
import { EventsFiltersRequestParams } from '../models/events-filters-request-params.model';
import { EventsResponse } from '../models/events-response.model';

@Injectable({ providedIn: 'root' })
export class EventsService {
  private baseUrl = environment.mainApiUrl + '/calendars';

  // handling state inside the same service
  private eventsFilters = new BehaviorSubject<EventsFiltersRequestParams>({});

  public setEventsFilters(filters: EventsFiltersRequestParams) {
    this.eventsFilters.next(filters);
  }

  public getEventsFilters() {
    return this.eventsFilters.asObservable();
  }

  public getEventsFiltersSub() {
    return this.eventsFilters;
  }

  // subject that will help 
  public eventsFiltersChanged = new Subject<void>();

  constructor(private http: HttpClient) {}

  getEvents(calendarId: number): Observable<EventsResponse> {
    return this.http
      .get<{ data: EventsResponse }>(`${this.baseUrl}/${calendarId}/events`, {
        params: { ...JSON.parse(JSON.stringify(this.eventsFilters.value)) },
      })
      .pipe(map((resp) => resp.data));
  }

  getEventDetailsById(
    calendarId: number,
    eventId: number
  ): Observable<EventDetails> {
    return this.http
      .get<{ data: EventDetails }>(
        `${this.baseUrl}/${calendarId}/events/${eventId}`
      )
      .pipe(map((resp) => resp.data));
  }
}
