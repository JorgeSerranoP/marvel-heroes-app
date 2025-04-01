import { TitleCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-hero-modal',
  standalone: true,
  imports: [MatDialogModule, TitleCasePipe],
  templateUrl: './hero-modal.component.html',
  styleUrls: ['./hero-modal.component.scss']
})
export class HeroModalComponent {
  data = inject(MAT_DIALOG_DATA);
}
