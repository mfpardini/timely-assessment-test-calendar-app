import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, Subject, throwError } from 'rxjs';
import { StandardFilter } from 'src/app/shared/models/standard-filter.model';
import { AlertsService } from 'src/app/shared/services/alerts.service';
import { FiltersService } from 'src/app/shared/services/filters.service';
import { filtersResponseMock } from 'src/test/mocks/filters-response.mock';
import { EventsFiltersRequestParams } from '../../models/events-filters-request-params.model';
import { EventsService } from '../../services/events.service';
import { CalendarFiltersComponent } from './calendar-filters.component';

describe('CalendarFiltersComponent', () => {
  let component: CalendarFiltersComponent;
  let fixture: ComponentFixture<CalendarFiltersComponent>;
  let filtersService: jasmine.SpyObj<FiltersService>;
  let eventsService: jasmine.SpyObj<EventsService>;
  let alertsService: jasmine.SpyObj<AlertsService>;
  let eventsFiltersChangedSubject: Subject<void>;

  const mockEventFilters: EventsFiltersRequestParams = {
    categories: '1,2',
    organizers: '3',
    tags: '4',
    venues: '5',
  };

  const mockFiltersResponse = filtersResponseMock;

  beforeEach(async () => {
    const filtersServiceSpy = jasmine.createSpyObj('FiltersService', [
      'getCategories',
      'getOrganizers',
      'getTags',
      'getVenues',
    ]);
    const eventsServiceSpy = jasmine.createSpyObj(
      'EventsService',
      ['getEventsFilters', 'setEventsFilters'],
      {
        eventsFiltersChanged: new Subject<void>(),
      }
    );
    const alertsServiceSpy = jasmine.createSpyObj('AlertsService', [
      'showErrorToast',
    ]);

    eventsFiltersChangedSubject = new Subject<void>();
    eventsServiceSpy.eventsFiltersChanged = eventsFiltersChangedSubject;

    await TestBed.configureTestingModule({
      declarations: [CalendarFiltersComponent],
      providers: [
        { provide: FiltersService, useValue: filtersServiceSpy },
        { provide: EventsService, useValue: eventsServiceSpy },
        { provide: AlertsService, useValue: alertsServiceSpy },
      ],
    }).compileComponents();

    filtersService = TestBed.inject(
      FiltersService
    ) as jasmine.SpyObj<FiltersService>;
    eventsService = TestBed.inject(
      EventsService
    ) as jasmine.SpyObj<EventsService>;
    alertsService = TestBed.inject(
      AlertsService
    ) as jasmine.SpyObj<AlertsService>;

    fixture = TestBed.createComponent(CalendarFiltersComponent);
    component = fixture.componentInstance;

    // Set required inputs
    component.calendarId = 1;
    component.filterType = 'categories';
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should load event filters on initialization', () => {
      eventsService.getEventsFilters.and.returnValue(of(mockEventFilters));

      component.ngOnInit();

      expect(eventsService.getEventsFilters).toHaveBeenCalled();
      expect(component.eventFilters).toEqual(mockEventFilters);
    });
  });

  describe('onSearch', () => {
    it('should emit search term to searchInput$', () => {
      const searchTerm = 'test';
      let emittedValue = '';

      component.searchInput$.subscribe((value) => (emittedValue = value));
      component.onSearch(searchTerm);

      expect(emittedValue).toBe(searchTerm);
    });
  });

  describe('firstLoadItems', () => {
    it('should call loadItems when items array is empty', () => {
      spyOn(component, 'loadItems');
      component.items = [];

      component.firstLoadItems();

      expect(component.loadItems).toHaveBeenCalled();
    });

    it('should not call loadItems when items array is not empty', () => {
      spyOn(component, 'loadItems');
      component.items = [{ id: 1, title: 'Test' } as StandardFilter];

      component.firstLoadItems();

      expect(component.loadItems).not.toHaveBeenCalled();
    });
  });

  describe('loadItems', () => {
    beforeEach(() => {
      filtersService.getCategories.and.returnValue(of(mockFiltersResponse));
    });

    it('should load categories when filterType is categories', () => {
      component.filterType = 'categories';
      component.loadItems();

      expect(filtersService.getCategories).toHaveBeenCalledWith(1, {
        per_page: 1000,
        page: 1,
        title: '',
      });
    });

    it('should load organizers when filterType is organizers', () => {
      component.filterType = 'organizers';
      filtersService.getOrganizers.and.returnValue(of(mockFiltersResponse));

      component.loadItems();

      expect(filtersService.getOrganizers).toHaveBeenCalledWith(1, {
        per_page: 1000,
        page: 1,
        title: '',
      });
    });

    it('should load tags when filterType is tags', () => {
      component.filterType = 'tags';
      filtersService.getTags.and.returnValue(of(mockFiltersResponse));

      component.loadItems();

      expect(filtersService.getTags).toHaveBeenCalledWith(1, {
        per_page: 1000,
        page: 1,
        title: '',
      });
    });

    it('should load venues when filterType is venues', () => {
      component.filterType = 'venues';
      filtersService.getVenues.and.returnValue(of(mockFiltersResponse));

      component.loadItems();

      expect(filtersService.getVenues).toHaveBeenCalledWith(1, {
        per_page: 1000,
        page: 1,
        title: '',
      });
    });

    it('should handle successful response', () => {
      component.loadItems();

      expect(component.loading).toBe(false);
      expect(component.items).toEqual(mockFiltersResponse.items);
      expect(component.hasMore).toBe(true);
    });

    it('should handle error response', () => {
      filtersService.getCategories.and.returnValue(
        throwError(() => new Error('Test error'))
      );

      component.loadItems();

      expect(component.loading).toBe(false);
      expect(alertsService.showErrorToast).toHaveBeenCalledWith(
        'Error loading categories. Try again later.'
      );
    });

    it('should not load if already loading', () => {
      component.loading = true;
      component.loadItems();

      expect(filtersService.getCategories).not.toHaveBeenCalled();
    });

    it('should not load if no more items', () => {
      component.hasMore = false;
      component.loadItems();

      expect(filtersService.getCategories).not.toHaveBeenCalled();
    });

    it('should include search term in params', () => {
      component.searchTerm = 'test search';
      component.loadItems();

      expect(filtersService.getCategories).toHaveBeenCalledWith(1, {
        per_page: 1000,
        page: 1,
        title: 'test search',
      });
    });
  });

  describe('loadMore', () => {
    beforeEach(() => {
      spyOn(component, 'loadItems');
    });

    it('should increment currentPage and call loadItems', () => {
      component.currentPage = 1;
      component.loading = false;
      component.hasMore = true;

      component.loadMore();

      expect(component.currentPage).toBe(2);
      expect(component.loadItems).toHaveBeenCalled();
    });

    it('should not load more if loading', () => {
      component.loading = true;
      component.loadMore();

      expect(component.loadItems).not.toHaveBeenCalled();
    });

    it('should not load more if no more items', () => {
      component.hasMore = false;
      component.loadMore();

      expect(component.loadItems).not.toHaveBeenCalled();
    });
  });

  describe('onToggleItem', () => {
    beforeEach(() => {
      component.eventFilters = mockEventFilters;
      component.selectedItems = [1, 2];
      component.filterType = 'categories';
      spyOn(eventsFiltersChangedSubject, 'next');
    });

    it('should update event filters with selected items', () => {
      component.onToggleItem();

      expect(eventsService.setEventsFilters).toHaveBeenCalledWith({
        ...mockEventFilters,
        categories: '1,2',
      });
      setTimeout(() => {
        expect(eventsFiltersChangedSubject.next).toHaveBeenCalled();
      }, 300);
    });

    it('should set filter to undefined when no items selected', () => {
      component.selectedItems = [];
      component.onToggleItem();

      expect(eventsService.setEventsFilters).toHaveBeenCalledWith({
        ...mockEventFilters,
        categories: undefined,
      });
    });
  });

  describe('onRemoveItem', () => {
    beforeEach(() => {
      component.eventFilters = mockEventFilters;
      component.filterType = 'categories';
      spyOn(eventsFiltersChangedSubject, 'next');
    });

    it('should remove filter from event filters', () => {
      component.onRemoveItem();

      expect(eventsService.setEventsFilters).toHaveBeenCalledWith({
        ...mockEventFilters,
        categories: undefined,
      });
      setTimeout(() => {
        expect(eventsFiltersChangedSubject.next).toHaveBeenCalled();
      }, 300);
    });

    describe('initial state', () => {
      it('should have correct initial values', () => {
        expect(component.items).toEqual([]);
        expect(component.loading).toBe(false);
        expect(component.hasMore).toBe(true);
        expect(component.currentPage).toBe(1);
        expect(component.searchTerm).toBe('');
        expect(component.selectedItems).toEqual([]);
        expect(component.searchInput$).toBeTruthy();
      });
    });
  });

  describe('initial state', () => {
    it('should have correct initial values', () => {
      expect(component.items).toEqual([]);
      expect(component.loading).toBe(false);
      expect(component.hasMore).toBe(true);
      expect(component.currentPage).toBe(1);
      expect(component.searchTerm).toBe('');
      expect(component.selectedItems).toEqual([]);
      expect(component.searchInput$).toBeTruthy();
    });
  });
});
