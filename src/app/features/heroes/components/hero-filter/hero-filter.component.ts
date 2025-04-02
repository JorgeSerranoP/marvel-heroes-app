import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, computed, inject, model, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { HeroService } from '../../../../core/services/hero.service';

@Component({
  selector: 'app-hero-filter',
  standalone: true,
  imports: [
    FormsModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
  ],
  templateUrl: './hero-filter.component.html',
  styleUrls: ['./hero-filter.component.scss']
})
export class HeroFilterComponent {
  readonly heroService = inject(HeroService);

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  readonly chipInputValue = model('');
  readonly availableHeroNames = computed(() => this.heroService.heroes().map(hero => hero.nameLabel));
  readonly matchingHeroNames = computed(() => {
    const chipInputValue = this.chipInputValue().toLowerCase();
    return chipInputValue
      ? this.availableHeroNames().filter(hero => hero.toLowerCase().includes(chipInputValue))
      : this.availableHeroNames().slice();
  });

  readonly filtersChanged = output<string[]>();

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.heroService.activeHeroFilters.update(heroes => [...heroes, value]);
    }

    this.chipInputValue.set('');
  }

  remove(hero: string): void {
    this.heroService.activeHeroFilters.update(heroes => {
      const index = heroes.indexOf(hero);
      if (index < 0) {
        return heroes;
      }

      heroes.splice(index, 1);
      return [...heroes];
    });
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.heroService.activeHeroFilters.update(heroes => [...heroes, event.option.viewValue]);
    this.chipInputValue.set('');
    event.option.deselect();
  }
}
