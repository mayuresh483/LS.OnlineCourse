using LS.OnlineCourse.Core.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LS.OnlineCourse.Service.Interface
{
    public interface ICourseCategoryService
    {
        Task<CourseCategoryModel?> GetByIdAsync(int id);
        Task<List<CourseCategoryModel>> GetCourseCategoriesAsync();
    }
}
