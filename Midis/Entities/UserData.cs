using System.Collections.Generic;

namespace Midis.Entities
{
    public class UserData
    {
        public required int Id { get; set; }

        public required string Username { get; set; }

        public required List<string> Roles { get; set; }

        public string? Token { get; set; }
    }
}
