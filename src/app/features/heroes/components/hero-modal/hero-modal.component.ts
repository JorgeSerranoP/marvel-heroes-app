import { TitleCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Hero } from '../../../../core/models/hero';

@Component({
  selector: 'app-hero-modal',
  standalone: true,
  imports: [MatDialogModule, TitleCasePipe],
  templateUrl: './hero-modal.component.html',
  styleUrls: ['./hero-modal.component.scss']
})
export class HeroModalComponent {
  readonly hero: Hero = inject(MAT_DIALOG_DATA);
}
