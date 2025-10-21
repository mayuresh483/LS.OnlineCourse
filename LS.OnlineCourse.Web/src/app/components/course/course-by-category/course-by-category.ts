import { Component, OnInit, Output, OutputEmitterRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BrowseCourse } from '../browse-course/browse-course';

@Component({
  selector: 'app-course-by-category',
  imports: [BrowseCourse],
  templateUrl: './course-by-category.html',
  styleUrl: './course-by-category.css'
})
export class CourseByCategory implements OnInit {
  categoryId!: number;

  constructor(private router: ActivatedRoute) {
  //  OutputEmitterRef(this, 'categoryId');
  }
  ngOnInit(): void {
     this.router.params.subscribe(params => {
      this.categoryId =  Number(params['categoryId']);
    });
  }
}
