import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Hero } from '../../interfaces/heroes.interfaces';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
})
export class ConfirmComponent {
  hero!: Hero;

  constructor(
    public dialogRef: MatDialogRef<ConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { hero: Hero }
  ) {
    this.hero = data.hero;
  }

  close(): void {
    this.dialogRef.close();
  }

  remove(): void {
    this.dialogRef.close(true);
  }
}
