import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseCourse } from './browse-course';

describe('BrowseCourse', () => {
  let component: BrowseCourse;
  let fixture: ComponentFixture<BrowseCourse>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowseCourse]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrowseCourse);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
