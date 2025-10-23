import { Component, Input } from '@angular/core';
import { CourseCategory } from '../../../models/category';
import { MOCK_CATEGORIES } from '../../../mock-data/mock-categories';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {  RouterModule } from '@angular/router';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-category',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './category.html',
  styleUrl: './category.css'
})
export class Category {
  @Input() categories: CourseCategory[]= [];
  @Input() viewType: 'list' | 'tabs' = 'list';

  constructor(private categoryService: CategoryService) {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }
}
