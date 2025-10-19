using LS.OnlineCourse.Core.Model;
using LS.OnlineCourse.Service.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LS.OnlineCourse.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourseController : ControllerBase
    {
        private readonly ICourseService _courseService;
        public CourseController(ICourseService courseService)
        {
            _courseService = courseService;
        }

        // Get api/course
        [HttpGet]
        public async Task<ActionResult<List<CourseModel>>> GetAllCourse()
        {
            var categories = await _courseService.GetAllCourseAsync();
            return Ok(categories);
        }

        // Get api/course/category/{categoryId}
        [HttpGet("Category/{categoryId}")]
        public async Task<ActionResult<List<CourseModel>>> GetAllCourseByCategoryAsync([FromRoute] int categoryId)
        {
            var category = await _courseService.GetAllCourseAsync(categoryId);
            return Ok(category);
        }

        // Get api/course/detail/{courseId}
        [HttpGet("Detail/{courseId}")]
        public async Task<ActionResult<CourseDetailModel>> GetCourseDetail(int courseId)
        {
            var courseDetail = await _courseService.GetCourseByIdAsync(courseId);
            if (courseDetail == null)
            {
                return NotFound();
            }
            return Ok(courseDetail);
        }
    }
}
