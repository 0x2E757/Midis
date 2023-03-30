namespace Midis.Models
{
    public class UserModel
    {
        public int Id { get; set; }
        public required string Username { get; set; }
        public required string PasswordHash { get; set; }
        public required string[] Roles { get; set; }
    }
}
