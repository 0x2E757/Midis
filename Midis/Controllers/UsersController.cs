using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Midis.Constants;
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
        private readonly IMapper _mapper;

        public UsersController(IOptions<AppSettings> appSettings, MidisContext midisContext, IMapper mapper)
        {
            _appSettings = appSettings.Value;
            _midisContext = midisContext;
            _mapper = mapper;
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDTO registerDto)
        {
            var userModel = await _midisContext.Users.SingleOrDefaultAsync(user => user.Username == registerDto.Username);

            if (userModel != null)
                return BadRequest(new { Errors = new { Username = "Username is taken." } });

            if (registerDto.PasswordConfirm != registerDto.Password)
                return BadRequest(new { Errors = new { Password_Confirm = "Passwords do not match." } });

            userModel = new UserModel
            {
                Username = registerDto.Username!,
                PasswordHash = Utils.GetSHA256(registerDto.Password + registerDto.Username),
                Roles = new string[] { Role.User },
            };

            _midisContext.Users.Add(userModel);
            await _midisContext.SaveChangesAsync();

            var userDto = _mapper.Map<UserDTO>(userModel);
            userDto.Token = JwtHelpers.GetBearerToken(userDto, _appSettings.Secret);

            return Ok(userDto);
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] AuthenticateDTO authenticateDto)
        {
            var userModel = await _midisContext.Users.SingleOrDefaultAsync(user => user.Username == authenticateDto.Username);

            if (userModel == null)
                return BadRequest(new { Errors = new { Username = "User not found." } });

            if (userModel.PasswordHash != Utils.GetSHA256(authenticateDto.Password + authenticateDto.Username))
                return BadRequest(new { Errors = new { Password = "Password is incorrect." } });

            var userDto =  _mapper.Map<UserDTO>(userModel);
            userDto.Token = JwtHelpers.GetBearerToken(userDto, _appSettings.Secret);

            return Ok(userDto);
        }
    }
}
