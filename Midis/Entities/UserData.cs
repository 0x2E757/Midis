using System.Collections.Generic;

namespace Midis.Entities
{
    public class UserData
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public List<string> Roles { get; set; }
        public string Token { get; set; }
    }
}
