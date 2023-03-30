using System.ComponentModel.DataAnnotations;

namespace Midis.Entities
{
    public class AuthenticateDTO
    {
        [Required(ErrorMessage = "Field is required")]
        public string? Username { get; set; }

        [Required(ErrorMessage = "Field is required")]
        public string? Password { get; set; }
    }
}
