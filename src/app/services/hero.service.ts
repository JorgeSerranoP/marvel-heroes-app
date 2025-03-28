import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Hero } from '../models/hero';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private http = inject(HttpClient);

  heroes = signal<Hero[]>([]);

  constructor() {
    this.loadHeroes();
  }

  private loadHeroes() {
    const storedHeroes = localStorage.getItem('heroes');
    if (storedHeroes) {
      this.heroes.set(JSON.parse(storedHeroes));
    } else {
      this.http.get<Hero[]>('/assets/wikipedia_marvel_data.json')
        .subscribe({
          next: (data) => {
            const heroesWithIds = data.map((hero, index) => ({
              ...hero,
              tempId: this.generateTempId(hero.nameLabel)
            }));
            this.heroes.set(heroesWithIds);
            this.saveToLocalStorage();
          },
          error: (err) => {
            console.error('Error loading heroes:', err);
          }
        });
      }
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('heroes', JSON.stringify(this.heroes()));
  }

  private generateTempId(name: string): string {
    return `${name}-${Date.now()}`;
  }

  addHero(hero: Hero): void {
    hero.tempId = this.generateTempId(hero.nameLabel);
    this.heroes.update(currentHeroes => [hero, ...currentHeroes]);
    this.saveToLocalStorage();

  }

  updateHero(updatedHero: Hero): void {
    this.heroes.update(currentHeroes =>
      currentHeroes.map(hero => {
        return hero.tempId === updatedHero.tempId ? updatedHero : hero;
      })
    );
    this.saveToLocalStorage();
  }

  removeHero(heroToRemove: Hero): void {
    this.heroes.update(currentHeroes =>
      currentHeroes.filter(hero => hero.tempId !== heroToRemove.tempId)
    );
    this.saveToLocalStorage();
  }
}
