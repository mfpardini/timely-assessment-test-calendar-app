import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { delay, of, switchMap, throwError } from 'rxjs';
import { AlertsService } from 'src/app/shared/services/alerts.service';
import { EventDetails } from '../../models/event-details.model';
import { EventsService } from '../../services/events.service';
import { EventDetailsModalComponent } from './event-details-modal.component';
import { eventDetailsMock } from 'src/test/mocks/event-details.mock';

describe('EventDetailsModalComponent', () => {
  let component: EventDetailsModalComponent;
  let fixture: ComponentFixture<EventDetailsModalComponent>;
  let eventsService: jasmine.SpyObj<EventsService>;
  let alertsService: jasmine.SpyObj<AlertsService>;
  let bsModalRef: jasmine.SpyObj<BsModalRef>;

  const mockEventDetails: EventDetails = eventDetailsMock;

  beforeEach(async () => {
    const eventsServiceSpy = jasmine.createSpyObj('EventsService', [
      'getEventDetailsById',
    ]);
    const alertsServiceSpy = jasmine.createSpyObj('AlertsService', [
      'showErrorToast',
    ]);
    const bsModalRefSpy = jasmine.createSpyObj('BsModalRef', ['hide']);

    await TestBed.configureTestingModule({
      declarations: [EventDetailsModalComponent],
      providers: [
        { provide: EventsService, useValue: eventsServiceSpy },
        { provide: AlertsService, useValue: alertsServiceSpy },
        { provide: BsModalRef, useValue: bsModalRefSpy },
      ],
    }).compileComponents();

    eventsService = TestBed.inject(
      EventsService
    ) as jasmine.SpyObj<EventsService>;
    alertsService = TestBed.inject(
      AlertsService
    ) as jasmine.SpyObj<AlertsService>;
    bsModalRef = TestBed.inject(BsModalRef) as jasmine.SpyObj<BsModalRef>;

    fixture = TestBed.createComponent(EventDetailsModalComponent);
    component = fixture.componentInstance;

    // Set required inputs
    component.calendarId = 1;
    component.eventId = 123;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should load event details successfully', fakeAsync(() => {
      eventsService.getEventDetailsById.and.returnValue(
        of(mockEventDetails).pipe(delay(100))
      );

      component.ngOnInit();

      expect(component.isLoading).toBe(true);
      expect(eventsService.getEventDetailsById).toHaveBeenCalledWith(1, 123);

      // Simulate async operation completion
      fixture.detectChanges();

      tick(100);

      expect(component.isLoading).toBe(false);
      expect(component.event).toEqual(mockEventDetails);
    }));

    it('should handle error when loading event details', fakeAsync(() => {
      const error = new Error('Test error');
      eventsService.getEventDetailsById.and.returnValue(
        of(null).pipe(
          delay(100),
          // Switch to error after the delay
          switchMap(() => throwError(() => error))
        )
      );
      spyOn(component, 'closeModal');

      component.ngOnInit();
      fixture.detectChanges();

      expect(component.isLoading).toBe(true);
      expect(eventsService.getEventDetailsById).toHaveBeenCalledWith(1, 123);

      // Simulate async operation completion
      fixture.detectChanges();
      tick(100);

      expect(component.isLoading).toBe(false);
      expect(alertsService.showErrorToast).toHaveBeenCalledWith(
        'Failed to fetch event data. Try again later.'
      );
      expect(component.closeModal).toHaveBeenCalled();
    }));
  });

  describe('closeModal', () => {
    it('should call hide on bsModalRef', () => {
      component.closeModal();

      expect(bsModalRef.hide).toHaveBeenCalled();
    });
  });

  describe('initial state', () => {
    it('should have correct initial values', () => {
      expect(component.isLoading).toBe(true);
      expect(component.event).toBeUndefined();
      expect(component.calendarId).toBe(1);
      expect(component.eventId).toBe(123);
    });
  });

  it('should handle different calendarId and eventId inputs', () => {
    component.calendarId = 999;
    component.eventId = 456;
    eventsService.getEventDetailsById.and.returnValue(of(mockEventDetails));

    component.ngOnInit();

    expect(eventsService.getEventDetailsById).toHaveBeenCalledWith(999, 456);
  });
});
