import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { EventsService } from '../../services/events.service';
import { EventDetails } from '../../models/event-details.model';
import { AlertsService } from 'src/app/shared/services/alerts.service';

@Component({
  selector: 'app-event-details-modal',
  templateUrl: './event-details-modal.component.html',
  styleUrls: ['./event-details-modal.component.scss'],
})
export class EventDetailsModalComponent implements OnInit {
  @Input() calendarId!: number;
  @Input() eventId!: number;

  isLoading = true;

  event?: EventDetails;

  constructor(
    private readonly bsModalRef: BsModalRef,
    private readonly eventsService: EventsService,
    private readonly alertsService: AlertsService,
  ) {}

  ngOnInit(): void {
    this.eventsService
      .getEventDetailsById(this.calendarId, this.eventId)
      .subscribe({
        next: (data) => {
          this.isLoading = false;
          this.event = data;
        },
        error: (error) => {
          this.isLoading = false;
          this.alertsService.showErrorToast('Failed to fetch event data. Try again later.');
          this.closeModal()
        }
      });
  }

  closeModal() {
    this.bsModalRef.hide();
  }
}
