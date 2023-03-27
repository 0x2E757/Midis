using Midis.Entities;
using Midis.Models;
using System.Linq;

namespace Midis.Helpers
{
    public static class DbInitializer
    {
        public static void Initialize(MidisContext midisContext)
        {
            if (midisContext.Users.Any())
            {
                return;
            }

            var users = new UserModel[]
            {
                new UserModel { Username = "admin", PasswordHash = Utils.GetSHA256("admin" + "admin"), Roles = new string[] { Role.User, Role.Admin } },
                new UserModel { Username = "user", PasswordHash = Utils.GetSHA256("user" + "user"), Roles = new string[] { Role.User } },
            };

            midisContext.Users.AddRange(users);
            midisContext.SaveChanges();
        }
    }
}
