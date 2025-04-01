import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { get, set } from 'idb-keyval';
import { Hero } from '../models/hero';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private http = inject(HttpClient);

  heroes = signal<Hero[]>([]);
  isLoading = signal<boolean>(true);

  constructor() {
    this.loadHeroes();
  }

  private async loadHeroes() {
    try {
      const storedHeroes = await get<string>('heroes');
      if (storedHeroes) {
        this.heroes.set(JSON.parse(storedHeroes));
      } else {
        this.fetchHeroesFromApi();
      }
    } catch (error) {
      console.error('Error loading heroes from IndexedDB:', error);
      this.fetchHeroesFromApi();
    } finally {
      this.isLoading.set(false);
    }
  }

  private async fetchHeroesFromApi() {
    this.http.get<Hero[]>('/assets/wikipedia_marvel_data.json')
      .subscribe({
        next: (data) => {
          const heroesWithIds = data.map((hero, index) => ({
            ...hero,
            tempId: this.generateTempId(hero.nameLabel)
          }));
          this.heroes.set(heroesWithIds);
          this.saveToIndexedDB();
        },
        error: (err) => {
          console.error('Error loading heroes from API:', err);
        }
      });
  }

  private async saveToIndexedDB(): Promise<void> {
    try {
      await set('heroes', JSON.stringify(this.heroes()));
    } catch (error) {
      console.error('Error saving heroes to IndexedDB:', error);
    }
  }

  private generateTempId(name: string): string {
    return `${name}-${Date.now()}`;
  }

  addHero(hero: Hero): void {
    hero.tempId = this.generateTempId(hero.nameLabel);
    this.heroes.update(currentHeroes => [hero, ...currentHeroes]);
    this.saveToIndexedDB();

  }

  updateHero(updatedHero: Hero): void {
    this.heroes.update(currentHeroes =>
      currentHeroes.map(hero => {
        return hero.tempId === updatedHero.tempId ? updatedHero : hero;
      })
    );
    this.saveToIndexedDB();
  }

  removeHero(heroToRemove: Hero): void {
    this.heroes.update(currentHeroes =>
      currentHeroes.filter(hero => hero.tempId !== heroToRemove.tempId)
    );
    this.saveToIndexedDB();
  }
}
