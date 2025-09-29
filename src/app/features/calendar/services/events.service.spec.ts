import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EventsService } from './events.service';
import { EventDetails } from '../models/event-details.model';
import { EventsResponse } from '../models/events-response.model';
import { EventsFiltersRequestParams } from '../models/events-filters-request-params.model';
import { environment } from 'src/environments/environment';
import { eventDetailsMock } from 'src/test/mocks/event-details.mock';

describe('EventsService', () => {
  let service: EventsService;
  let httpMock: HttpTestingController;

  const mockEventsResponse: EventsResponse = {
    items: [],
    total: 0,
    from: 15,
    size: 30,
    has_next: true,
    has_prior: true
  };

  const mockEventDetails: EventDetails = eventDetailsMock;

  const mockApiEventsResponse = {
    data: mockEventsResponse
  };

  const mockApiEventDetailsResponse = {
    data: mockEventDetails
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EventsService]
    });

    service = TestBed.inject(EventsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('events filters', () => {
    it('should set events filters', () => {
      const filters: EventsFiltersRequestParams = {
        categories: '1,2',
        organizers: '3'
      };

      service.setEventsFilters(filters);

      service.getEventsFilters().subscribe((data) => {
        expect(data).toEqual(filters);
      });
    });

    it('should get events filters as observable', () => {
      const initialFilters: EventsFiltersRequestParams = {};
      
      service.getEventsFilters().subscribe((data) => {
        expect(data).toEqual(initialFilters);
      });
    });

    it('should get events filters subject', () => {
      const filtersSubject = service.getEventsFiltersSub();
      
      expect(filtersSubject).toBeTruthy();
      expect(filtersSubject.value).toEqual({});
    });

    it('should emit events filters changed event', () => {
      let emitted = false;
      
      service.eventsFiltersChanged.subscribe(() => {
        emitted = true;
      });

      service.eventsFiltersChanged.next();
      
      expect(emitted).toBe(true);
    });
  });

  describe('getEvents', () => {
    it('should return events for calendar', () => {
      const calendarId = 1;

      service.getEvents(calendarId).subscribe((data) => {
        expect(data).toEqual(mockEventsResponse);
      });

      const req = httpMock.expectOne(`${environment.mainApiUrl}/calendars/${calendarId}/events`);
      expect(req.request.method).toBe('GET');
      req.flush(mockApiEventsResponse);
    });

    it('should include current filters in request params', () => {
      const calendarId = 1;
      const filters: EventsFiltersRequestParams = {
        categories: '1,2',
        tags: '3'
      };

      service.setEventsFilters(filters);

      service.getEvents(calendarId).subscribe();

      const req = httpMock.expectOne(req => 
        req.url === `${environment.mainApiUrl}/calendars/${calendarId}/events`
      );
      expect(req.request.method).toBe('GET');
      expect(req.request.params.keys()).toEqual(Object.keys(filters));
      expect(req.request.params.get('categories')).toBe('1,2');
      expect(req.request.params.get('tags')).toBe('3');
      
      req.flush(mockApiEventsResponse);
    });

    it('should map response to extract data property', () => {
      const calendarId = 1;

      service.getEvents(calendarId).subscribe((data) => {
        expect(data).toEqual(mockEventsResponse);
      });

      const req = httpMock.expectOne(`${environment.mainApiUrl}/calendars/${calendarId}/events`);
      req.flush(mockApiEventsResponse);
    });

    it('should handle empty filters', () => {
      const calendarId = 1;

      service.getEvents(calendarId).subscribe();

      const req = httpMock.expectOne(`${environment.mainApiUrl}/calendars/${calendarId}/events`);
      expect(req.request.params.keys()).toEqual([]);
      
      req.flush(mockApiEventsResponse);
    });

    it('should handle HTTP error for getEvents', () => {
      const calendarId = 1;
      const errorMessage = '500 Internal Server Error';

      service.getEvents(calendarId).subscribe({
        next: () => fail('should have failed with 500 error'),
        error: (error) => {
          expect(error.status).toBe(500);
          expect(error.statusText).toBe(errorMessage);
        }
      });

      const req = httpMock.expectOne(`${environment.mainApiUrl}/calendars/${calendarId}/events`);
      req.flush(errorMessage, { status: 500, statusText: errorMessage });
    });
  });

  describe('getEventDetailsById', () => {
    it('should return event details by id', () => {
      const calendarId = 1;
      const eventId = 123;

      service.getEventDetailsById(calendarId, eventId).subscribe((data) => {
        expect(data).toEqual(mockEventDetails);
      });

      const req = httpMock.expectOne(`${environment.mainApiUrl}/calendars/${calendarId}/events/${eventId}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockApiEventDetailsResponse);
    });

    it('should map response to extract data property', () => {
      const calendarId = 1;
      const eventId = 123;

      service.getEventDetailsById(calendarId, eventId).subscribe((data) => {
        expect(data).toEqual(mockEventDetails);
      });

      const req = httpMock.expectOne(`${environment.mainApiUrl}/calendars/${calendarId}/events/${eventId}`);
      req.flush(mockApiEventDetailsResponse);
    });

    it('should handle different calendar and event ids', () => {
      const calendarId = 999;
      const eventId = 456;

      service.getEventDetailsById(calendarId, eventId).subscribe();

      const req = httpMock.expectOne(`${environment.mainApiUrl}/calendars/${calendarId}/events/${eventId}`);
      expect(req.request.method).toBe('GET');
      
      req.flush(mockApiEventDetailsResponse);
    });

    it('should handle HTTP error for getEventDetailsById', () => {
      const calendarId = 1;
      const eventId = 123;
      const errorMessage = '404 Not Found';

      service.getEventDetailsById(calendarId, eventId).subscribe({
        next: () => fail('should have failed with 404 error'),
        error: (error) => {
          expect(error.status).toBe(404);
          expect(error.statusText).toBe(errorMessage);
        }
      });

      const req = httpMock.expectOne(`${environment.mainApiUrl}/calendars/${calendarId}/events/${eventId}`);
      req.flush(errorMessage, { status: 404, statusText: errorMessage });
    });
  });
});