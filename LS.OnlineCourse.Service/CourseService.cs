using LS.OnlineCourse.Core.Model;
using LS.OnlineCourse.Data;
using LS.OnlineCourse.Data.Entities;
using LS.OnlineCourse.Data.Interface;
using LS.OnlineCourse.Service.Interface;

namespace LS.OnlineCourse.Service
{
    public class CourseService : ICourseService
    {
        ICourseRepository _courseRepository;
        public CourseService(ICourseRepository courseRepository)
        {
            _courseRepository = courseRepository;  
        }

        public Task<List<CourseModel>> GetAllCourseAsync()
        {
            return _courseRepository.GetAllCourseAsync();
        }

        public Task<List<CourseModel>> GetAllCourseAsync(int? categoryid)
        {
            return _courseRepository.GetAllCourseAsync(categoryid);
        }

        public async Task<CourseDetailModel?> GetCourseByIdAsync(int id)
        {
            return await _courseRepository.GetCourseDetailAsync(id);
        }
    }
}
