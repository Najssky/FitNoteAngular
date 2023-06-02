import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { TrainingInfoComponent } from '../training-info/training-info.component';

export interface DialogData {
  Date: any;
}
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent {
  constructor(public dialog: MatDialog) {}
  @Input() isDarkMode!: boolean;

  openDialog(date: any): void {
    console.log(this.isDarkMode);
    const dialogRef = this.dialog.open(TrainingInfoComponent, {
      data: { Date: date },
      minWidth: window.innerWidth <= 600 ? '100vw' : '60vw',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [interactionPlugin, dayGridPlugin, bootstrap5Plugin],
    selectable: true,
    themeSystem: 'bootstrap5',
    dateClick: (info) => this.openDialog(info.dateStr),
  };
}
