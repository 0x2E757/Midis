using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Midis.Constants;
using Midis.Entities;
using Midis.Helpers;
using System.Linq;
using System.Threading.Tasks;

namespace Midis.Controllers
{
    [Authorize(Roles = Role.Admin)]
    [ApiController]
    [Route("api/[controller]")]
    public class SettingsController : ControllerBase
    {
        private readonly MidisContext _midisContext;

        public SettingsController(MidisContext midisContext)
        {
            _midisContext = midisContext;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var settings = await _midisContext.Settings.ToListAsync();

            var settingsData = new SettingsDTO
            {
                MaximumFileSize = settings.Where(setting => setting.Name == Setting.MaximumFileSize).First()!.IntegerValue!.ToString(),
                MinimumImageHeight = settings.Where(setting => setting.Name == Setting.MinimumImageHeight).First()!.IntegerValue!.ToString(),
                MinimumImageWidth = settings.Where(setting => setting.Name == Setting.MinimumImageWidth).First()!.IntegerValue!.ToString(),
                MaximumImageHeight = settings.Where(setting => setting.Name == Setting.MaximumImageHeight).First()!.IntegerValue!.ToString(),
                MaximumImageWidth = settings.Where(setting => setting.Name == Setting.MaximumImageWidth).First()!.IntegerValue!.ToString(),
                AllowedExtensions = settings.Where(setting => setting.Name == Setting.AllowedExtensions).First()!.StringValue!.Split(",").ToList(),
            };

            return Ok(settingsData);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] SettingsDTO settingsDto)
        {
            settingsDto!.AllowedExtensions!.RemoveAll(string.IsNullOrWhiteSpace);

            var settings = await _midisContext.Settings.ToListAsync();

            var maximumFileSize = settings.Where(setting => setting.Name == Setting.MaximumFileSize).First()!;
            maximumFileSize.IntegerValue = int.Parse(settingsDto!.MaximumFileSize!);
            _midisContext.Settings.Update(maximumFileSize);

            var minimumImageHeight = settings.Where(setting => setting.Name == Setting.MinimumImageHeight).First()!;
            minimumImageHeight.IntegerValue = int.Parse(settingsDto!.MinimumImageHeight!);
            _midisContext.Settings.Update(minimumImageHeight);

            var minimumImageWidth = settings.Where(setting => setting.Name == Setting.MinimumImageWidth).First()!;
            minimumImageWidth.IntegerValue = int.Parse(settingsDto!.MinimumImageWidth!);
            _midisContext.Settings.Update(minimumImageWidth);

            var maximumImageHeight = settings.Where(setting => setting.Name == Setting.MaximumImageHeight).First()!;
            maximumImageHeight.IntegerValue = int.Parse(settingsDto!.MaximumImageHeight!);
            _midisContext.Settings.Update(maximumImageHeight);

            var maximumImageWidth = settings.Where(setting => setting.Name == Setting.MaximumImageWidth).First()!;
            maximumImageWidth.IntegerValue = int.Parse(settingsDto!.MaximumImageWidth!);
            _midisContext.Settings.Update(maximumImageWidth);

            var allowedExtensions = settings.Where(setting => setting.Name == Setting.AllowedExtensions).First()!;
            allowedExtensions.StringValue = string.Join(",", settingsDto!.AllowedExtensions!);
            _midisContext.Settings.Update(allowedExtensions);

            await _midisContext.SaveChangesAsync();

            return Ok(settingsDto);
        }
    }
}
