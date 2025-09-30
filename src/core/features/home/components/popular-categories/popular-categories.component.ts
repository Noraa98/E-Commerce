import { Component, inject, OnInit,PLATFORM_ID } from '@angular/core';
import { CategoriesService } from '../../../../services/categories/categories.service';
import { Category } from '../../../../models/category.interface';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';

import { CommonModule,isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-popular-categories',
  imports: [CarouselModule, CommonModule],
  templateUrl: './popular-categories.component.html',
  styleUrl: './popular-categories.component.css',
})
export class PopularCategoriesComponent implements OnInit {
  
 categoriesList: Category[] = [];
  showCarousel: boolean = false;
  private readonly categoriesService = inject(CategoriesService);
  private readonly platformId = inject(PLATFORM_ID);
  
  categoriesOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    autoplay: true,
    autoplayHoverPause: true,
    autoplayTimeout: 3500,
    margin: 10,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: { items: 1 },
    576: { items: 2 },
    768: { items: 3 },
    992: { items: 4 },
    1200: { items: 6 }
    },
    nav: false
  };

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.getAllCategories();
    }
  }

  getAllCategories(): void {
    this.categoriesService.getAllCategories().subscribe({
      next: (res) => {
        console.log(res.data);
        this.categoriesList = res.data;
        
       
        setTimeout(() => {
          this.showCarousel = true;
        }, 100);
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
      }
    });
  }
}