import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FiltersRequestParams } from '../models/filters-request-params.model';
import { StandardFilter } from '../models/standard-filter.model';

type FilterRequestType = 'categories' | 'tags' | 'organizers' | 'venues';

@Injectable({ providedIn: 'root' })
export class FiltersService {
  private baseUrl = environment.mainApiUrl + '/calendars';

  constructor(private http: HttpClient) {}

  private getFilters(
    type: FilterRequestType,
    calendarId: number,
    filters: FiltersRequestParams
  ): Observable<StandardFilter> {
    return this.http
      .get<{ data: StandardFilter }>(
        `${this.baseUrl}/${calendarId}/filters/${type}`,
        {
          params: { ...JSON.parse(JSON.stringify(filters)) },
        }
      )
      .pipe(map((resp) => resp.data));
  }

  getCategories(
    calendarId: number,
    filters: FiltersRequestParams
  ): Observable<StandardFilter> {
    return this.getFilters('categories', calendarId, filters);
  }

  getTags(
    calendarId: number,
    filters: FiltersRequestParams
  ): Observable<StandardFilter> {
    return this.getFilters('tags', calendarId, filters);
  }

  getOrganizers(
    calendarId: number,
    filters: FiltersRequestParams
  ): Observable<StandardFilter> {
    return this.getFilters('organizers', calendarId, filters);
  }

  getVenues(
    calendarId: number,
    filters: FiltersRequestParams
  ): Observable<StandardFilter> {
    return this.getFilters('venues', calendarId, filters);
  }
}
