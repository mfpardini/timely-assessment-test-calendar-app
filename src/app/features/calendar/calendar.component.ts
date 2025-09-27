import { Component, OnInit } from '@angular/core';
import { CalendarService } from './services/calendar.service';
import { CalendarInfo } from './models/calendar-info.model';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  isLoading = false;
  
  calendarInfo?: CalendarInfo;

  constructor(private readonly calendarService: CalendarService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.calendarService.getCalendarInfo().subscribe({
      next: (data) => {
        this.calendarInfo = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.log(error);
        this.isLoading = false;
      }
    })
  }

}
