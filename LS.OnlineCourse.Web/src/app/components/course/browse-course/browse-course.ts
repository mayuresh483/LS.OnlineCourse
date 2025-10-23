import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Course } from '../../../models/course';
import { MOCK_COURSES } from '../../../mock-data/mock-courses';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../../services/course.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-browse-course',
  imports: [CommonModule,RouterModule],
  templateUrl: './browse-course.html',
  styleUrl: './browse-course.css'
})
export class BrowseCourse implements OnInit, OnChanges{
  courses: Course[] = [];
  @Input() categoryId!: number;

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.processCourses();
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    this.processCourses();
  }

  processCourses() {
    this.getCoursesByCategory(this.categoryId);
  }

  getCoursesByCategory(categoryId: number) {
    this.courseService.getCoursesByCategoryId(categoryId).subscribe((data) => {
      this.courses = data;
    });
    // this.courses = MOCK_COURSES.filter(c => c.categoryId === categoryId);
  }

  formatPrice(price: number): string {
    return `$${price.toFixed(2)}`;
  }
}
