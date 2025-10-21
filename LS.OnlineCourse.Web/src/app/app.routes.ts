import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { CourseByCategory } from './components/course/course-by-category/course-by-category';
import { BrowseCourse } from './components/course/browse-course/browse-course';
import { PlansAndPricing } from './components/core/plans-and-pricing/plans-and-pricing';
import { Category } from './components/course/category/category';
import { AboutUs } from './components/core/about-us/about-us';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: Home},
    {path: 'about-us', component: AboutUs},
    {path: 'plans-pricing', component: PlansAndPricing},
    {path: 'course/browse', component: BrowseCourse },
    {path: 'course/category/:categoryId', component: CourseByCategory },
    {path: 'course/category', component: Category}
];
