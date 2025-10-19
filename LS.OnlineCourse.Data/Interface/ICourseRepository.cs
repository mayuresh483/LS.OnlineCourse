using LS.OnlineCourse.Core.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LS.OnlineCourse.Data.Interface
{
    public interface ICourseRepository
    {
        Task<List<CourseModel>> GetAllCourseAsync(int? categoryId = null);
        Task<CourseDetailModel> GetCourseDetailAsync(int id);
    }
}
