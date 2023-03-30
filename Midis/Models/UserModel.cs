using Midis.Entities;
using System.Collections.Generic;

namespace Midis.Models
{
    public class UserModel
    {
        public int Id { get; set; }
        public required string Username { get; set; }
        public required string PasswordHash { get; set; }
        public required string[] Roles { get; set; }

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
