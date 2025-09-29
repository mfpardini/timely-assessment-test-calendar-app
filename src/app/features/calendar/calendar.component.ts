import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { AlertsService } from 'src/app/shared/services/alerts.service';
import { EventDetailsModalComponent } from './components/event-details-modal/event-details-modal.component';
import { CalendarInfo } from './models/calendar-info.model';
import { CalendarService } from './services/calendar.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  isLoading = false;

  calendarInfo?: CalendarInfo;

  items: any[] = [];
  loading = false;
  hasMore = true;
  currentPage = 1;
  searchTerm = '';

  searchInput$ = new Subject<string>();

  constructor(
    private readonly calendarService: CalendarService,
    private readonly modalService: BsModalService,
    private readonly alertsService: AlertsService
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.isLoading = true;
    this.calendarService.getCalendarInfo().subscribe({
      next: (data) => {
        this.calendarInfo = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.log(error);
        this.alertsService.showError(
          'Error loading calendar. Try again later.'
        );
        this.isLoading = false;
      },
    });
  }

  openEventDetails(eventId: number) {
    const modalRef = this.modalService.show(EventDetailsModalComponent, {
      initialState: {
        calendarId: this.calendarInfo!.id,
        eventId,
      },
      focus: true,
      class: 'modal-dialog-centered modal-xl',
    });
  }
}
