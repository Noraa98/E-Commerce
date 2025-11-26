import { Component, OnInit } from '@angular/core';
import { CategoryService } from './services/category.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categories',
  imports: [CommonModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {

  categories: any[] = [];
  isLoading: boolean = false;
  errorMsg: string = '';

  constructor(private _CategoryService: CategoryService) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.isLoading = true;
    this._CategoryService.getAllCategories().subscribe({
      next: (res) => {
        this.categories = res.data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMsg = 'Error loading categories!';
        this.isLoading = false;
      }
    });
  }

}