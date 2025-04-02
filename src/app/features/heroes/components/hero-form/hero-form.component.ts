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
  imports: [MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatSelectModule, MatButtonModule, MatDialogModule, MatOption],
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.scss']
})
export class HeroFormComponent {
  readonly heroService = inject(HeroService);
  readonly data = inject(MAT_DIALOG_DATA);
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<HeroFormComponent>
  ) {
    this.form = this.fb.group({
      nameLabel: [this.data.nameLabel ?? '', Validators.required],
      genderLabel: [this.data.genderLabel ?? '', Validators.required],
      citizenshipLabel: [this.data.citizenshipLabel ?? '', Validators.required],
      skillsLabel: [this.data.skillsLabel ?? '', Validators.required],
      occupationLabel: [this.data.occupationLabel ?? '', Validators.required],
      memberOfLabel: [this.data.memberOfLabel ?? '', Validators.required],
      creatorLabel: [this.data.creatorLabel ?? '', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const hero: Hero = {
        ...this.form.value,
        tempId: this.data.tempId
      };
      if(this.data.tempId) {
        this.heroService.updateHero(hero);
      } else{
        this.heroService.addHero(hero);
      }
      this.form.reset();
      this.dialogRef.close();
    }
  }
}
