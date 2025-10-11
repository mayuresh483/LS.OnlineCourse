using LS.OnlineCourse.Core.Entities;
using LS.OnlineCourse.Data.Entities;
using LS.OnlineCourse.Data.Interface;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LS.OnlineCourse.Data
{
    public class CourseCategoryRepository : ICourseCategoryRepository
    {   
        private readonly OnlineCourseDbContext _dbContext;
        public CourseCategoryRepository(OnlineCourseDbContext dbContext) {
            _dbContext = dbContext;
        }
        public Task<List<CourseCategory>> GetAllAsync()
        {
           var data = _dbContext.CourseCategories.ToListAsync();
           return data;
        }

        public Task<CourseCategory?> GetByIdAsync(int id)
        {
            var data = _dbContext.CourseCategories.FindAsync(id).AsTask();
            return data;
        }
    }
}
