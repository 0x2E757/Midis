using System.ComponentModel.DataAnnotations;

namespace Midis.Entities
{
    public class AuthenticateData
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
