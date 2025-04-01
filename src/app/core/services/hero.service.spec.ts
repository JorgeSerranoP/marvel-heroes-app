import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Hero } from '../models/hero';
import { HeroService } from './hero.service';

describe('HeroService', () => {
  let service: HeroService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HeroService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(HeroService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should add a hero', () => {
    const newHero: Hero = {
      nameLabel: 'Spider-Man',
      tempId: '',
      genderLabel: 'male',
      citizenshipLabel: '',
      skillsLabel: '',
      occupationLabel: '',
      memberOfLabel: '',
      creatorLabel: ''
    };
    service.addHero(newHero);

    const heroes = service.heroes();
    expect(heroes.length).toBe(1);
    expect(heroes[0].nameLabel).toBe('Spider-Man');
    expect(heroes[0].tempId).toContain('Spider-Man-');
  });

  it('should update a hero', () => {
    const existingHero: Hero = {
      nameLabel: 'Iron Man',
      tempId: 'iron-man-123',
      genderLabel: 'male',
      citizenshipLabel: '',
      skillsLabel: '',
      occupationLabel: '',
      memberOfLabel: '',
      creatorLabel: ''
    };
    service.heroes.set([existingHero]);

    const updatedHero: Hero = { ...existingHero, nameLabel: 'Iron Man Updated' };
    service.updateHero(updatedHero);

    const heroes = service.heroes();
    expect(heroes.length).toBe(1);
    expect(heroes[0].nameLabel).toBe('Iron Man Updated');
  });

  it('should remove a hero', () => {
    const heroToRemove: Hero = {
      nameLabel: 'Thor',
      tempId: 'thor-123',
      genderLabel: 'male',
      citizenshipLabel: '',
      skillsLabel: '',
      occupationLabel: '',
      memberOfLabel: '',
      creatorLabel: ''
    };
    service.heroes.set([heroToRemove]);

    service.removeHero(heroToRemove);

    const heroes = service.heroes();
    expect(heroes.length).toBe(0);
  });

  it('should save heroes to IndexedDB when adding a hero', async () => {
    const newHero: Hero = {
      nameLabel: 'Hulk',
      tempId: '',
      genderLabel: 'male',
      citizenshipLabel: '',
      skillsLabel: '',
      occupationLabel: '',
      memberOfLabel: '',
      creatorLabel: ''
    };
    spyOn(service as any, 'saveToIndexedDB').and.callThrough();

    service.addHero(newHero);

    expect((service as any).saveToIndexedDB).toHaveBeenCalled();
  });

  it('should save heroes to IndexedDB when updating a hero', async () => {
    const existingHero: Hero = {
      nameLabel: 'Black Widow', tempId: 'black-widow-123',
      genderLabel: 'male',
      citizenshipLabel: '',
      skillsLabel: '',
      occupationLabel: '',
      memberOfLabel: '',
      creatorLabel: ''
    };
    service.heroes.set([existingHero]);
    spyOn(service as any, 'saveToIndexedDB').and.callThrough();

    const updatedHero: Hero = { ...existingHero, nameLabel: 'Black Widow Updated' };
    service.updateHero(updatedHero);

    expect((service as any).saveToIndexedDB).toHaveBeenCalled();
  });

  it('should save heroes to IndexedDB when removing a hero', async () => {
    const heroToRemove: Hero = {
      nameLabel: 'Captain America',
      tempId: 'captain-america-123',
      genderLabel: 'male',
      citizenshipLabel: '',
      skillsLabel: '',
      occupationLabel: '',
      memberOfLabel: '',
      creatorLabel: ''
    };
    service.heroes.set([heroToRemove]);
    spyOn(service as any, 'saveToIndexedDB').and.callThrough();

    service.removeHero(heroToRemove);

    expect((service as any).saveToIndexedDB).toHaveBeenCalled();
  });
});
