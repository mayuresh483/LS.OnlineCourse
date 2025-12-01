using LS.OnlineCourse.Service.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Web.Resource;

namespace LS.OnlineCourse.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserAdminController : ControllerBase

    {
        private readonly ICourseService courseService;
        public UserAdminController(ICourseService courseService)
        {
            this.courseService = courseService;
        }

        [HttpGet]
        [RequiredScope(RequiredScopesConfigurationKey = "AzureAdB2C:Scopes:Read")]
        public async Task<IActionResult> GetAllUsers()
        {
            var courses = await courseService.GetAllCourseAsync();
            return Ok(courses);
        }
    }
}
