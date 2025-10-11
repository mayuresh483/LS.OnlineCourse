using LS.OnlineCourse.Service.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LS.OnlineCourse.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourseCategoryController : ControllerBase
    {
        private readonly ICourseCategoryService _courseCategoryService;
        public CourseCategoryController(ICourseCategoryService courseCategoryService)
        {
            _courseCategoryService = courseCategoryService;
        }


    }
}
