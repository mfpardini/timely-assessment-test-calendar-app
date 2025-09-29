import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerConfig, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { SharedModule } from 'src/app/shared/shared.module';
import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarComponent } from './calendar.component';
import { CalendarDayComponent } from './components/calendar-day/calendar-day.component';
import { CalendarFiltersComponent } from './components/calendar-filters/calendar-filters.component';
import { EventDetailsModalComponent } from './components/event-details-modal/event-details-modal.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { SafeHtmlPipe } from 'src/app/shared/pipes/safe-html.pipe';
import { FilterSelectDropdownComponent } from './components/filter-select-dropdown/filter-select-dropdown.component';

@NgModule({
  declarations: [
    CalendarComponent,
    CalendarDayComponent,
    CalendarFiltersComponent,
    EventDetailsModalComponent,
    FilterSelectDropdownComponent,
  ],
  providers: [BsModalService],
  imports: [
    CommonModule,
    CalendarRoutingModule,
    NgSelectModule,
    SharedModule,
    FormsModule,
    BsDatepickerModule
  ],
})
export class CalendarModule {}
