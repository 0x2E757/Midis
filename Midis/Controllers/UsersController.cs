using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Midis.Entities;
using Midis.Helpers;
using System.Collections.Generic;
using System.Linq;

namespace Midis.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly AppSettings _appSettings;

        private static List<User> _users = new List<User>
        {
            new User { Id = 1, Username = "admin", Password = "admin", Roles = new() { Role.User, Role.Admin } },
            new User { Id = 2, Username = "user", Password = "user", Roles = new() { Role.User } },
        };

        public UsersController(IOptions<AppSettings> appSettings)
        {
            _appSettings = appSettings.Value;
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public IActionResult Register([FromBody] RegisterData registerData)
        {
            var user = _users.SingleOrDefault(user => user.Username == registerData.Username);

            if (user != null)
                return BadRequest(new { Errors = new { Username = "Username is taken." } });

            if (registerData.Password_Confirm != registerData.Password)
                return BadRequest(new { Errors = new { Password_Confirm = "Passwords do not match." } });

            user = new User { Id = _users.Count + 1, Username = registerData.Username, Password = registerData.Password, Roles = new() { Role.User } };
            _users.Add(user);

            user.Token = JwtHelpers.GetBearerToken(user, _appSettings.Secret);

            return Ok(user);
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody] AuthenticateData authenticateData)
        {
            var user = _users.SingleOrDefault(user => user.Username == authenticateData.Username);

            if (user == null)
                return BadRequest(new { Errors = new { Username = "User not found." } });

            if (user.Password != authenticateData.Password)
                return BadRequest(new { Errors = new { Password = "Password is incorrect." } });

            user.Token = JwtHelpers.GetBearerToken(user, _appSettings.Secret);

            return Ok(user);
        }

        [AllowAnonymous]
        [HttpGet]
        public ActionResult Get()
        {
            return Ok("Mur:" + _appSettings.Secret);
        }

        [Authorize(Roles = Role.Admin)]
        [HttpGet("admin_only")]
        public ActionResult AdminOnly()
        {
            return Ok("Admins only here");
        }

        [Authorize(Roles = Role.User)]
        [HttpGet("user_only")]
        public ActionResult UserOnly()
        {
            return Ok("Users only here");
        }
    }
}
