import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course, CourseDetail, InstructorModel } from '../models/course';

@Injectable({providedIn: 'root'})
export class CourseService {
    private baseUrl = `${environment.apiUrl}/Course`;

    constructor(private http: HttpClient) { }
    
    getCoursesByCategoryId(categoryId: number) : Observable<Course[]> {
        return this.http.get<Course[]>(`${this.baseUrl}/Category/${categoryId}`);
    }

    getCourseDetails(courseId: number) : Observable<CourseDetail> {
        return this.http.get<CourseDetail>(`${this.baseUrl}/Detail/${courseId}`);
    }

    getAllCourses() : Observable<Course[]> {
        return this.http.get<Course[]>(`${this.baseUrl}`);
    }

    getInstructorCourses() : Observable<InstructorModel[]> {
        return this.http.get<InstructorModel[]>(`${this.baseUrl}/Instructors`);
    }
}   