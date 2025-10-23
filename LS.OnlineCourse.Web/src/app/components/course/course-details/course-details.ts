import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../../services/course.service';
import { Course, CourseDetail } from '../../../models/course';

@Component({
  selector: 'app-course-details',
  imports: [],
  templateUrl: './course-details.html',
  styleUrl: './course-details.css'
})
export class CourseDetails implements OnInit{
  courseId!: number;
  courseDetails: CourseDetail | null = null;

  constructor(private route: ActivatedRoute, private courseService: CourseService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.courseId = Number(params['courseId']);
    });
    this.getCourseById();
  }

  getCourseById() {
    this.courseService.getCourseDetails(this.courseId).subscribe((data) => {
      // debugger;
      this.courseDetails = data;
    });
  }

  
}
