using System.ComponentModel.DataAnnotations;

namespace Midis.Entities
{
    public class RegisterData
    {
        [Required(ErrorMessage = "Field is required")]
        public string? Username { get; set; }

        [Required(ErrorMessage = "Field is required")]
        public string? Password { get; set; }

        [Required(ErrorMessage = "Field is required")]
        public string? PasswordConfirm { get; set; }
    }
}
