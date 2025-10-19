using LS.OnlineCourse.Core.Model;
using System;

namespace LS.OnlineCourse.Service.Interface
{
    public interface ICourseService
    {
        Task<CourseDetailModel?> GetCourseByIdAsync(int id);
        Task<List<CourseModel>> GetAllCourseAsync(int? categoryid = null);
    }
}
