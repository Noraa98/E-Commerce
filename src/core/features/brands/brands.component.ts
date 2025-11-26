import { Component, OnInit } from '@angular/core';
import { BrandsService } from './services/brands.service';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent implements OnInit {

  brands: any[] = [];
  isLoading = false;
  errorMsg = '';

  constructor(private _brandsService: BrandsService) { }

  ngOnInit(): void {
    this.loadBrands();
  }

  loadBrands(): void {
    this.isLoading = true;
    this._brandsService.getAllBrands().subscribe({
      next: (res) => {
        this.brands = res.data || [];
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMsg = 'Error loading brands!';
        this.isLoading = false;
        console.error('Brands Error:', err);
      }
    });
  }

}
