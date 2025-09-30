import { Component, Input, input } from '@angular/core';
import { Product } from '../../../models/product.interface';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-card',
   standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input({required : true}) product : Product = {} as Product ;

}
