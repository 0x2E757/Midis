using System.Collections.Generic;

namespace Midis.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public List<string> Roles { get; set; }
        public string Token { get; set; }
    }
}
