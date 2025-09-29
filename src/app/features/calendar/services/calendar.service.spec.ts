import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CalendarService } from './calendar.service';
import { CalendarInfo } from '../models/calendar-info.model';
import { environment } from 'src/environments/environment';
import { calendarInfoMock } from 'src/test/mocks/calendar-info.mock';

describe('CalendarService', () => {
  let service: CalendarService;
  let httpMock: HttpTestingController;

  const mockCalendarInfo: CalendarInfo = calendarInfoMock;

  const mockApiResponse = {
    data: mockCalendarInfo
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CalendarService]
    });

    service = TestBed.inject(CalendarService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getCalendarInfo', () => {
    it('should return calendar info', () => {
      service.getCalendarInfo().subscribe((data) => {
        expect(data).toEqual(mockCalendarInfo);
      });

      const req = httpMock.expectOne(`${environment.mainApiUrl}/calendars/info?${new URLSearchParams(environment.mainApiUrlDefaultParam).toString()}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockApiResponse);
    });

    it('should make GET request with correct parameters', () => {
      service.getCalendarInfo().subscribe();

      const req = httpMock.expectOne(`${environment.mainApiUrl}/calendars/info?${new URLSearchParams(environment.mainApiUrlDefaultParam).toString()}`);
      expect(req.request.method).toBe('GET');
      expect(req.request.params.keys()).toEqual(Object.keys(environment.mainApiUrlDefaultParam));
      
      req.flush(mockApiResponse);
    });

    it('should map response to extract data property', () => {
      service.getCalendarInfo().subscribe((data) => {
        expect(data).toEqual(mockCalendarInfo);
      });

      const req = httpMock.expectOne(`${environment.mainApiUrl}/calendars/info?${new URLSearchParams(environment.mainApiUrlDefaultParam).toString()}`);
      req.flush(mockApiResponse);
    });

    it('should handle empty response', () => {
      const emptyResponse = { data: {} as CalendarInfo };

      service.getCalendarInfo().subscribe((data) => {
        expect(data).toEqual({} as CalendarInfo);
      });

      const req = httpMock.expectOne(`${environment.mainApiUrl}/calendars/info?${new URLSearchParams(environment.mainApiUrlDefaultParam).toString()}`);
      req.flush(emptyResponse);
    });

    it('should handle HTTP error', () => {
      const errorMessage = '404 Not Found';

      service.getCalendarInfo().subscribe({
        next: () => fail('should have failed with 404 error'),
        error: (error) => {
          expect(error.status).toBe(404);
          expect(error.statusText).toBe(errorMessage);
        }
      });

      const req = httpMock.expectOne(`${environment.mainApiUrl}/calendars/info?${new URLSearchParams(environment.mainApiUrlDefaultParam).toString()}`);
      req.flush(errorMessage, { status: 404, statusText: errorMessage });
    });
  });
});