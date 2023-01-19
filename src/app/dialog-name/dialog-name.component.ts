import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog-name',
  templateUrl: './dialog-name.component.html',
  styleUrls: ['./dialog-name.component.scss']
})
export class DialogNameComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogNameComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
