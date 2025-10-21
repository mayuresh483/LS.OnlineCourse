import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseByCategory } from './course-by-category';

describe('CourseByCategory', () => {
  let component: CourseByCategory;
  let fixture: ComponentFixture<CourseByCategory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseByCategory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseByCategory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
