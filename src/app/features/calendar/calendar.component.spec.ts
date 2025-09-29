import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { BsModalService } from 'ngx-bootstrap/modal';
import { delay, of, switchMap, throwError } from 'rxjs';
import { AlertsService } from 'src/app/shared/services/alerts.service';
import { calendarInfoMock } from 'src/test/mocks/calendar-info.mock';
import { CalendarComponent } from './calendar.component';
import { EventDetailsModalComponent } from './components/event-details-modal/event-details-modal.component';
import { CalendarInfo } from './models/calendar-info.model';
import { CalendarService } from './services/calendar.service';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;
  let calendarService: jasmine.SpyObj<CalendarService>;
  let modalService: jasmine.SpyObj<BsModalService>;
  let alertsService: jasmine.SpyObj<AlertsService>;

  const mockCalendarInfo: CalendarInfo = calendarInfoMock;

  beforeEach(async () => {
    const calendarServiceSpy = jasmine.createSpyObj('CalendarService', [
      'getCalendarInfo',
    ]);
    const modalServiceSpy = jasmine.createSpyObj('BsModalService', ['show']);
    const alertsServiceSpy = jasmine.createSpyObj('AlertsService', [
      'showError',
    ]);

    await TestBed.configureTestingModule({
      declarations: [CalendarComponent],
      providers: [
        { provide: CalendarService, useValue: calendarServiceSpy },
        { provide: BsModalService, useValue: modalServiceSpy },
        { provide: AlertsService, useValue: alertsServiceSpy },
      ],
    }).compileComponents();

    calendarService = TestBed.inject(
      CalendarService
    ) as jasmine.SpyObj<CalendarService>;
    modalService = TestBed.inject(
      BsModalService
    ) as jasmine.SpyObj<BsModalService>;
    alertsService = TestBed.inject(
      AlertsService
    ) as jasmine.SpyObj<AlertsService>;

    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call getData on initialization', () => {
      spyOn(component, 'getData');

      component.ngOnInit();

      expect(component.getData).toHaveBeenCalled();
    });
  });

  describe('getData', () => {
    it('should load calendar info successfully', fakeAsync(() => {
      calendarService.getCalendarInfo.and.returnValue(
        of(mockCalendarInfo).pipe(delay(100))
      );

      component.getData();

      // Immediately after calling getData, isLoading should be true
      expect(component.isLoading).toBe(true);
      expect(calendarService.getCalendarInfo).toHaveBeenCalled();

      // Fast-forward until all pending asynchronous activities complete
      tick(100);

      // After the delay, isLoading should be false and data should be loaded
      expect(component.calendarInfo).toEqual(mockCalendarInfo);
      expect(component.isLoading).toBe(false);
    }));

    it('should handle error when loading calendar info', fakeAsync(() => {
      const error = new Error('Test error');
      calendarService.getCalendarInfo.and.returnValue(
        of(null).pipe(
          delay(100),
          // Switch to error after the delay
          switchMap(() => throwError(() => error))
        )
      );
      component.getData();
      fixture.detectChanges();

      // Immediately after calling getData, isLoading should be true
      expect(component.isLoading).toBe(true);
      expect(calendarService.getCalendarInfo).toHaveBeenCalled();

      // Fast-forward until all pending asynchronous activities complete
      tick(100);

      // After the delay, isLoading should be false due to error
      expect(component.isLoading).toBe(false);
      expect(alertsService.showError).toHaveBeenCalledWith(
        'Error loading calendar. Try again later.'
      );
    }));

    it('should set isLoading to true immediately when called', () => {
      calendarService.getCalendarInfo.and.returnValue(
        of(mockCalendarInfo).pipe(delay(1000))
      );

      component.getData();

      // This assertion should pass immediately - isLoading should be true right after calling getData
      expect(component.isLoading).toBe(true);
    });
  });

  describe('openEventDetails', () => {
    beforeEach(() => {
      component.calendarInfo = mockCalendarInfo;
    });

    it('should open event details modal', () => {
      const eventId = 123;

      component.openEventDetails(eventId);

      expect(modalService.show).toHaveBeenCalledWith(
        EventDetailsModalComponent,
        {
          initialState: {
            calendarId: mockCalendarInfo.id,
            eventId: eventId,
          },
          focus: true,
          class: 'modal-dialog-centered modal-xl',
        }
      );
    });

    it('should handle openEventDetails when calendarInfo is undefined', () => {
      component.calendarInfo = undefined;
      const eventId = 123;

      expect(() => {
        component.openEventDetails(eventId);
      }).toThrow();
    });
  });

  describe('initial state', () => {
    it('should have correct initial values', () => {
      expect(component.isLoading).toBe(false);
      expect(component.calendarInfo).toBeUndefined();
      expect(component.items).toEqual([]);
      expect(component.loading).toBe(false);
      expect(component.hasMore).toBe(true);
      expect(component.currentPage).toBe(1);
      expect(component.searchTerm).toBe('');
      expect(component.searchInput$).toBeTruthy();
    });
  });
});
