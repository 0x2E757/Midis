using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Midis.Entities;

namespace Midis.Controllers
{
    [Authorize(Roles = Role.Admin)]
    [ApiController]
    [Route("api/[controller]")]
    public class SettingsController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            var settingsData = new SettingsData
            {
                MaximumFileSize = "1024",
                MinimumImageHeight = "200",
                MinimumImageWidth = "200",
                MaximumImageHeight = "500",
                MaximumImageWidth = "500",
                AllowedExtensions = new() { "jpg", "jpeg", "png", "bmp" },
            };
            return Ok(settingsData);
        }

        [HttpPost]
        public IActionResult Post([FromBody] SettingsData settingsData)
        {
            if (settingsData.AllowedExtensions != null)
                settingsData.AllowedExtensions.RemoveAll(string.IsNullOrWhiteSpace);
            else
                settingsData.AllowedExtensions = new();

            return Ok(settingsData);
        }
    }
}
