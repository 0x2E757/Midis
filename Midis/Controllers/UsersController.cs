using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Midis.Entities;
using Midis.Helpers;
using Midis.Models;
using System.Threading.Tasks;

namespace Midis.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly AppSettings _appSettings;
        private readonly MidisContext _midisContext;

        public UsersController(IOptions<AppSettings> appSettings, MidisContext midisContext)
        {
            _appSettings = appSettings.Value;
            _midisContext = midisContext;
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterData registerData)
        {
            var userModel = await _midisContext.Users.SingleOrDefaultAsync(user => user.Username == registerData.Username);

            if (userModel != null)
                return BadRequest(new { Errors = new { Username = "Username is taken." } });

            if (registerData.PasswordConfirm != registerData.Password)
                return BadRequest(new { Errors = new { Password_Confirm = "Passwords do not match." } });

            userModel = new UserModel
            {
                Username = registerData.Username!,
                PasswordHash = Utils.GetSHA256(registerData.Password + registerData.Username),
                Roles = new string[] { Role.User },
            };

            _midisContext.Users.Add(userModel);
            await _midisContext.SaveChangesAsync();

            var userData = userModel.ToUserData();
            userData.Token = JwtHelpers.GetBearerToken(userData, _appSettings.Secret);

            return Ok(userData);
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] AuthenticateData authenticateData)
        {
            var userModel = await _midisContext.Users.SingleOrDefaultAsync(user => user.Username == authenticateData.Username);

            if (userModel == null)
                return BadRequest(new { Errors = new { Username = "User not found." } });

            if (userModel.PasswordHash != Utils.GetSHA256(authenticateData.Password + authenticateData.Username))
                return BadRequest(new { Errors = new { Password = "Password is incorrect." } });

            var userData = userModel.ToUserData();
            userData.Token = JwtHelpers.GetBearerToken(userData, _appSettings.Secret);

            return Ok(userData);
        }
    }
}
