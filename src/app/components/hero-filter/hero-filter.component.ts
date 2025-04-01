import { Component, EventEmitter, Output, computed, inject, model, signal } from '@angular/core';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { HeroService } from '../../services/hero.service';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

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
  readonly activeHeroFilters = signal<string[]>([]);
  readonly availableHeroNames = computed(() => this.heroService.heroes().map(hero => hero.nameLabel));
  readonly matchingHeroNames = computed(() => {
    const chipInputValue = this.chipInputValue().toLowerCase();
    return chipInputValue
      ? this.availableHeroNames().filter(hero => hero.toLowerCase().includes(chipInputValue))
      : this.availableHeroNames().slice();
  });

  @Output() filtersChanged = new EventEmitter<string[]>();

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.activeHeroFilters.update(heroes => [...heroes, value]);
      this.emitFilters();
    }

    this.chipInputValue.set('');
  }

  remove(hero: string): void {
    this.activeHeroFilters.update(heroes => {
      const index = heroes.indexOf(hero);
      if (index < 0) {
        return heroes;
      }

      heroes.splice(index, 1);
      return [...heroes];
    });
    this.emitFilters();
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.activeHeroFilters.update(heroes => [...heroes, event.option.viewValue]);
    this.chipInputValue.set('');
    event.option.deselect();
    this.emitFilters();
  }

  private emitFilters(): void {
    this.filtersChanged.emit(this.activeHeroFilters());
  }
}
