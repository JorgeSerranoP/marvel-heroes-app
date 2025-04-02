import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatOption } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Hero } from '../../../../core/models/hero';
import { HeroService } from '../../../../core/services/hero.service';

@Component({
  selector: 'app-hero-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    MatOption
  ],
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.scss']
})
export class HeroFormComponent {
  readonly heroService = inject(HeroService);
  readonly hero: Hero = inject(MAT_DIALOG_DATA);
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<HeroFormComponent>
  ) {
    this.form = this.fb.group({
      nameLabel: [this.hero?.nameLabel ?? '', Validators.required],
      genderLabel: [this.hero?.genderLabel ?? '', Validators.required],
      citizenshipLabel: [this.hero?.citizenshipLabel ?? '', Validators.required],
      skillsLabel: [this.hero?.skillsLabel ?? '', Validators.required],
      occupationLabel: [this.hero?.occupationLabel ?? '', Validators.required],
      memberOfLabel: [this.hero?.memberOfLabel ?? '', Validators.required],
      creatorLabel: [this.hero?.creatorLabel ?? '', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const formHero: Hero = {
        ...this.form.value,
        tempId: this.hero.tempId
      };
      if(this.hero) {
        this.heroService.updateHero(formHero);
      } else{
        this.heroService.addHero(formHero);
      }
      this.form.reset();
      this.dialogRef.close();
    }
  }
}
