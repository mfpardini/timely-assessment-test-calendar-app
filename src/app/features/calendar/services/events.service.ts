import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EventsRequestFilters } from '../models/events-request-filters.model';
import { EventsResponse } from '../models/events-response.model';

@Injectable({ providedIn: 'root' })
export class EventsService {
  private baseUrl = environment.mainApiUrl + '/calendars';

  private eventsFilters = new BehaviorSubject<EventsRequestFilters>({});

  public setEventsFilters(filters: EventsRequestFilters) {
    this.eventsFilters.next(filters);
  }

  public getEventsFilters() {
    return this.eventsFilters.asObservable();
  }

  constructor(private http: HttpClient) {}

  getEvents(calendarId: number): Observable<EventsResponse> {
    return this.http
      .get<{ data: EventsResponse }>(`${this.baseUrl}/${calendarId}/events`, {
        params: { ...JSON.parse(JSON.stringify(this.eventsFilters.value)) },
      })
      .pipe(map((resp) => resp.data));
  }
}
