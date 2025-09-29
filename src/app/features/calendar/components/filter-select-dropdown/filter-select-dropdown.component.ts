import { Component, Input, OnInit } from '@angular/core';
import { EMPTY, Observable, Subject, Subscription } from 'rxjs';
import { FiltersRequestParams } from 'src/app/shared/models/filters-request-params.model';
import { StandardFilter } from 'src/app/shared/models/standard-filter.model';
import { AlertsService } from 'src/app/shared/services/alerts.service';
import {
  FilterRequestType,
  FiltersResponse,
  FiltersService,
} from 'src/app/shared/services/filters.service';
import { CalendarInfo } from '../../models/calendar-info.model';
import { EventsFiltersRequestParams } from '../../models/events-filters-request-params.model';
import { EventsService } from '../../services/events.service';

@Component({
  selector: 'app-filter-select-dropdown',
  templateUrl: './filter-select-dropdown.component.html',
  styleUrls: ['./filter-select-dropdown.component.scss'],
})
export class FilterSelectDropdownComponent implements OnInit {
  @Input() calendarId!: number;
  @Input() filterType!: FilterRequestType;

  private subscriptions: Subscription[] = [];

  items: StandardFilter[] = [];
  loading = false;
  hasMore = true;
  currentPage = 1;
  searchTerm = '';
  selectedItems: number[] = [];

  searchInput$ = new Subject<string>();

  eventFilters!: EventsFiltersRequestParams;

  constructor(
    private filtersService: FiltersService,
    private eventsService: EventsService,
    private alertsService: AlertsService
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.eventsService
        .getEventsFilters()
        .subscribe((data) => (this.eventFilters = data))
    );
  }

  onSearch(term: string) {
    this.searchInput$.next(term);
  }

  firstLoadItems() {
    if (this.items.length === 0) {
      this.loadItems();
    }
  }

  loadItems() {
    if (this.loading || !this.hasMore) return EMPTY;

    this.loading = true;

    const params: FiltersRequestParams = {
      per_page: 1000,
      page: this.currentPage,
      title: this.searchTerm,
    };

    let source$: Observable<FiltersResponse> =
      this.filtersService.getCategories(this.calendarId, params);
    if (this.filterType === 'organizers') {
      source$ = this.filtersService.getOrganizers(
        this.calendarId,
        params
      );
    }
    if (this.filterType === 'tags') {
      source$ = this.filtersService.getTags(this.calendarId, params);
    }
    if (this.filterType === 'venues') {
      source$ = this.filtersService.getVenues(this.calendarId, params);
    }

    return source$.subscribe({
      next: (response) => {
        this.items = [...this.items, ...response.items];
        this.hasMore = response.items.length > 0;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading items:', error);
        this.alertsService.showErrorToast(
          `Error loading ${this.filterType}. Try again later.`
        );
        this.loading = false;
      },
    });
  }

  loadMore() {
    if (this.loading || !this.hasMore) return;
    this.currentPage++;
    this.loadItems();
  }

  onToggleItem() {
    this.eventsService.setEventsFilters({
      ...this.eventFilters,
      categories:
        this.selectedItems.length > 0
          ? this.selectedItems.join(',')
          : undefined,
    });
    this.eventsService.eventsFiltersChanged.next();
  }

  onRemoveItems() {
    this.eventsService.setEventsFilters({
      ...this.eventFilters,
      categories: undefined,
    });
    this.eventsService.eventsFiltersChanged.next();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
