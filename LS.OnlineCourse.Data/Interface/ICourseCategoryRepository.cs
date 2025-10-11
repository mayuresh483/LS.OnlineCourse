using LS.OnlineCourse.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LS.OnlineCourse.Data.Interface
{
    public interface ICourseCategoryRepository
    {
        Task<CourseCategory?> GetByIdAsync(int id);
        Task<List<CourseCategory>> GetAllAsync();
    }
}
