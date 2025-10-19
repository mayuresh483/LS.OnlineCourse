using LS.OnlineCourse.Core.Model;
using LS.OnlineCourse.Data.Entities;
using LS.OnlineCourse.Data.Interface;
using Microsoft.EntityFrameworkCore;

namespace LS.OnlineCourse.Data
{
    public class CourseRepository : ICourseRepository
    {
        private readonly OnlineCourseDbContext _dbContext;
        public CourseRepository(OnlineCourseDbContext onlineCourseDbContext) 
        {   
            _dbContext = onlineCourseDbContext;
        }
        public Task<List<CourseModel>> GetAllCourseAsync(int? categoryId = null)
        {
            var query = _dbContext.Courses
                .Include(c => c.Category)
                .AsQueryable();

            if (categoryId.HasValue)
            {
                query = query.Where(c => c.CategoryId == categoryId.Value);
            }

            var courses = query.Select(c => new CourseModel()
            {
                CourseId = c.CourseId,
                Title = c.Title,
                Description = c.Description,
                Price = c.Price,
                CourseType = c.CourseType,
                SeatsAvailable = c.SeatsAvailable,
                Duration = c.Duration,
                CategoryId = c.CategoryId,
                InstructorId = c.InstructorId,
                StartDate = c.StartDate,
                EndDate = c.EndDate,
                Category = new CourseCategoryModel()
                {
                    CategoryId = c.Category.CategoryId,
                    CategoryName = c.Category.CategoryName,
                    Description = c.Category.Description
                },
                UserRating = new UserRatingModel()
                {
                    CourseId = c.CourseId,
                    AverageRating = c.Reviews.Any() ? Convert.ToDecimal(c.Reviews.Average(r => r.Rating)) : 0,
                    TotalRatings = c.Reviews.Count()
                }
            }).ToListAsync();

            return courses;
        }

        public async Task<CourseDetailModel> GetCourseDetailAsync(int id)
        {
            var courseDetail = await _dbContext.Courses
                .Include(c => c.Category)
                .Include(c => c.Reviews)
                .Include(c => c.SessionDetails)
                .Where(c => c.CourseId == id)
                .Select(c=> new CourseDetailModel()
                {
                    CourseId = c.CourseId,
                    Title = c.Title,
                    Description = c.Description,
                    Price = c.Price,
                    CourseType = c.CourseType,
                    SeatsAvailable = c.SeatsAvailable,
                    Duration = c.Duration,
                    CategoryId = c.CategoryId,
                    InstructorId = c.InstructorId,
                    StartDate = c.StartDate,
                    EndDate = c.EndDate,
                    Category = new CourseCategoryModel()
                    {
                        CategoryId = c.Category.CategoryId,
                        CategoryName = c.Category.CategoryName,
                        Description = c.Category.Description
                    },
                    SessionDetails = c.SessionDetails.Select(s => new SessionDetailModel()
                    {
                        SessionId = s.SessionId,
                        CourseId = s.CourseId,
                        Title = s.Title,
                        Description = s.Description,
                        VideoUrl = s.VideoUrl,
                        VideoOrder = s.VideoOrder
                    }).OrderBy(o=>o.VideoOrder).ToList(),
                    Reviews = c.Reviews.Select(r => new UserReviewModel()
                    {
                        CourseId = r.CourseId,
                        UserName = r.User.DisplayName,
                        Rating = r.Rating,
                        Comments = r.Comments,
                        ReviewDate = r.ReviewDate
                    }).OrderByDescending(o=> o.Rating).Take(10).ToList(),
                    UserRating = new UserRatingModel()
                    {
                        CourseId = c.CourseId,
                        AverageRating = c.Reviews.Any() ? Convert.ToDecimal(c.Reviews.Average(r => r.Rating)) : 0,
                        TotalRatings = c.Reviews.Count()
                    }
                }).FirstOrDefaultAsync();

            return courseDetail;
        }
    }
}
