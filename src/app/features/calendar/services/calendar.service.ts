import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CalendarInfo } from '../models/calendar-info.model';

@Injectable({ providedIn: 'root' })
export class CalendarService {
  private baseUrl = environment.mainApiUrl + '/calendars';

  constructor(private http: HttpClient) {}

  getCalendarInfo(): Observable<CalendarInfo> {
    return this.http.get<{ data: CalendarInfo }>(
      `${this.baseUrl}/info`, {params: {...environment.mainApiUrlDefaultParam}}
    ).pipe(map(res => res.data));
  }
}
