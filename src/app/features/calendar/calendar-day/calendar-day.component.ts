import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { CalendarEvent } from '../models/calendar-event.model';
import { CalendarInfo } from '../models/calendar-info.model';
import { EventsRequestFilters } from '../models/events-request-filters.model';
import { EventsService } from '../services/events.service';

@Component({
  selector: 'app-calendar-day',
  templateUrl: './calendar-day.component.html',
  styleUrls: ['./calendar-day.component.scss'],
})
export class CalendarDayComponent implements OnInit, OnDestroy {
  @Input() calendarInfo!: CalendarInfo;

  subscriptions: Subscription[] = [];

  isLoading = false;

  selectedDate: Date = new Date();
  events: CalendarEvent[] = [];

  eventsFilters?: EventsRequestFilters;

  constructor(private readonly eventsService: EventsService) {}

  ngOnInit(): void {
    this.eventsService
      .getEventsFilters()
      .subscribe((filters) => (this.eventsFilters = filters));

    // this.fetchEventsForDate(this.selectedDate);
  }

  getData() {
    this.isLoading = true;
    this.events = [];
    this.eventsService.getEvents(this.calendarInfo.id).subscribe({
      next: (data) => {
        this.events = data.items;
        this.isLoading = false;
      },
      error: (error) => {
        console.log(error);
        this.isLoading = false;
      },
    });
  }

  goToPreviousDay(): void {
    this.selectedDate = new Date(this.selectedDate);
    this.selectedDate.setDate(this.selectedDate.getDate() - 1);
    this.fetchEventsForDate(this.selectedDate);
  }

  goToNextDay(): void {
    this.selectedDate = new Date(this.selectedDate);
    this.selectedDate.setDate(this.selectedDate.getDate() + 1);
    this.fetchEventsForDate(this.selectedDate);
  }

  fetchEventsForDate(date: Date): void {
    this.eventsService.setEventsFilters({
      ...this.eventsFilters,
      start_date_utc: moment(this.selectedDate).startOf('day').unix(),
      end_date_utc: moment(this.selectedDate).endOf('day').unix(),
      per_page: 5,
    });
    this.getData();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
