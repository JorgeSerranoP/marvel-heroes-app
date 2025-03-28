import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroFilterComponent } from './hero-filter.component';

describe('HeroFilterComponent', () => {
  let component: HeroFilterComponent;
  let fixture: ComponentFixture<HeroFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
