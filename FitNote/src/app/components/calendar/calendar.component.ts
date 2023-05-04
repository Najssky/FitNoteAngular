import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
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
  openDialog(date: any): void {
    const dialogRef = this.dialog.open(TrainingInfoComponent, {
      data: { Date: date },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [interactionPlugin, dayGridPlugin],
    selectable: true,
    dateClick: (info) => this.openDialog(info.dateStr),
  };
}
