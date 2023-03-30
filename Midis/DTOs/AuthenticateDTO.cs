using System.ComponentModel.DataAnnotations;

namespace Midis.DTOs
{
    public class AuthenticateDTO
    {
        [Required(ErrorMessage = "Field is required")]
        public string? Username { get; set; }

        [Required(ErrorMessage = "Field is required")]
        public string? Password { get; set; }
    }
}
