using Midis.Entities;
using System.Collections.Generic;

namespace Midis.Models
{
    public class UserModel
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string PasswordHash { get; set; }
        public string[] Roles { get; set; }

        public UserData ToUserData()
        {
            return new UserData
            {
                Id = Id,
                Username = Username,
                Roles = new List<string>(Roles),
            };
        }
    }
}
