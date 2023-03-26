using System.ComponentModel.DataAnnotations;

namespace Midis.Entities
{
    public class RegisterData
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }

        [Required(ErrorMessage = "The Confirm Password field is required.")]
        public string Password_Confirm { get; set; }
    }
}
