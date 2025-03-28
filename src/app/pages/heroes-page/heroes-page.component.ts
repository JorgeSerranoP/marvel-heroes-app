import { Component } from '@angular/core';
import { HeroTableComponent } from "../../components/hero-table/hero-table.component";

@Component({
  selector: 'app-heroes-page',
  imports: [HeroTableComponent],
  templateUrl: './heroes-page.component.html',
  styleUrl: './heroes-page.component.scss'
})
export class HeroesPageComponent {

}
