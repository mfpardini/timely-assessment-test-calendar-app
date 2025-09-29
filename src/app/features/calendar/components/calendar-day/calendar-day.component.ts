import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import * as moment from 'moment';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Subscription } from 'rxjs';
import { Pagination } from 'src/app/shared/models/pagination.model';
import { AlertsService } from 'src/app/shared/services/alerts.service';
import { CalendarEvent } from '../../models/calendar-event.model';
import { CalendarInfo } from '../../models/calendar-info.model';
import { EventsFiltersRequestParams } from '../../models/events-filters-request-params.model';
import { EventsService } from '../../services/events.service';

@Component({
  selector: 'app-calendar-day',
  templateUrl: './calendar-day.component.html',
  styleUrls: ['./calendar-day.component.scss'],
})
export class CalendarDayComponent implements OnInit, OnDestroy {
  @Input() calendarInfo!: CalendarInfo;
  @Output() openEventDetails = new EventEmitter<number>();

  subscriptions: Subscription[] = [];

  isLoading = false;

  isFirstLoad = true;

  selectedDate?: Date;
  events: CalendarEvent[] = [];

  eventsFilters?: EventsFiltersRequestParams;

  pagination?: Pagination<CalendarEvent>;

  bsConfig?: Partial<BsDatepickerConfig>;

  constructor(
    private readonly eventsService: EventsService,
    private readonly alertsService: AlertsService
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.eventsService
        .getEventsFilters()
        .subscribe((filters) => (this.eventsFilters = filters))
    );

    this.subscriptions.push(
      this.eventsService.eventsFiltersChanged.subscribe(() => {
        this.fetchEventsForDate();
      })
    );

    this.eventsService.setEventsFilters({
      ...this.eventsFilters,
      per_page: 30,
      page: 1,
    });

    this.fetchEventsForDate();

    this.bsConfig = {
      dateInputFormat: 'dddd, MMMM Do YY',
      showTodayButton: true,
      selectFromOtherMonth: true,
      showWeekNumbers: false,
    };
  }

  getData() {
    this.isLoading = true;
    this.eventsService.getEvents(this.calendarInfo.id).subscribe({
      next: (data) => {
        this.pagination = data;
        this.events = [...this.events, ...data.items];
        this.isLoading = false;
      },
      error: (error) => {
        console.log(error);
        this.alertsService.showErrorToast(
          'Error loading events. Try again later.'
        );
        this.isLoading = false;
      },
    });
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 &&
      !this.isLoading
    ) {
      this.loadMore();
    }
  }

  loadMore() {
    if (!this.pagination?.has_next) {
      return;
    }

    const page =
      this.pagination?.from === 0
        ? 2
        : this.pagination!.from / this.pagination!.size + 2;

    this.isLoading = true;
    this.eventsService.setEventsFilters({
      ...this.eventsFilters,

      page: page,
    });
    this.getData();
  }

  goToPreviousDay(): void {
    this.selectedDate = new Date(this.selectedDate!);
    this.selectedDate.setDate(this.selectedDate.getDate() - 1);
    this.fetchEventsForDate();
  }

  goToNextDay(): void {
    this.selectedDate = new Date(this.selectedDate!);
    this.selectedDate.setDate(this.selectedDate.getDate() + 1);
    this.fetchEventsForDate();
  }

  fetchEventsForDate(): void {
    if (!this.selectedDate) {
      this.selectedDate = new Date();
    }
    this.eventsService.setEventsFilters({
      ...this.eventsFilters,
      start_date_utc: moment(this.selectedDate).startOf('day').unix(),
      end_date_utc: moment(this.selectedDate).endOf('day').unix(),
      page: 1,
    });
    this.events = [];
    this.getData();
  }

  onDateChange(date: Date) {
    this.selectedDate = date;
    if (!this.selectedDate || !date) {
      return;
    }
    if (this.selectedDate.toDateString() !== date.toDateString()) {
      this.fetchEventsForDate();
    }
  }

  formatDate(date: Date | string) {
    return moment(date).format('ddd DD MMM, HH:mm ');
  }

  showEventDetails(eventId: number) {
    this.openEventDetails.emit(eventId);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
