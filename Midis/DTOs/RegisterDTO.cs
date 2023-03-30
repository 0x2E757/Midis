using System.ComponentModel.DataAnnotations;

namespace Midis.DTOs
{
    public class RegisterDTO
    {
        [Required(ErrorMessage = "Field is required")]
        public string? Username { get; set; }

        [Required(ErrorMessage = "Field is required")]
        public string? Password { get; set; }

        [Required(ErrorMessage = "Field is required")]
        public string? PasswordConfirm { get; set; }
    }
}
