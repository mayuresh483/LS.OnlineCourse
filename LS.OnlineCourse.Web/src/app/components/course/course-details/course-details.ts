import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../../services/course.service';
import { Course, CourseDetail, InstructorModel } from '../../../models/course';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-course-details',
  imports: [CommonModule],
  templateUrl: './course-details.html',
  styleUrl: './course-details.css'
})
export class CourseDetails implements OnInit{
  courseId!: number;
  courseDetails: CourseDetail | null = null;
  videoUrl: string = '';
  instructorInfo: InstructorModel | null = null;  
  isLoggedIn: boolean = false;
  // noReviews: string = 'No reviews available for this course.';
  
  constructor(private route: ActivatedRoute, private courseService: CourseService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.courseId = Number(params['courseId']);
    });
    this.getCourseById();
  }

  getCourseById() {
    this.courseService.getCourseDetails(this.courseId).subscribe((data) => {
      debugger;
      this.courseDetails = data;;
    });
  }

  
}
