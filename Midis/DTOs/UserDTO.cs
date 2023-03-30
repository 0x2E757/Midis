namespace Midis.DTOs
{
    public class UserDTO
    {
        public required int Id { get; set; }

        public required string Username { get; set; }

        public required string[] Roles { get; set; }

        public string? Token { get; set; }
    }
}
