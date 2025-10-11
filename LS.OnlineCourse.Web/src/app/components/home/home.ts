import { Component } from '@angular/core';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { PlansAndPricing } from '../core/plans-and-pricing/plans-and-pricing';

@Component({
  selector: 'app-home',
  imports: [CarouselModule, PlansAndPricing],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
