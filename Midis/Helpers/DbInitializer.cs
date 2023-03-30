using Midis.Constants;
using Midis.Models;
using System.Linq;

namespace Midis.Helpers
{
    public static class DbInitializer
    {
        public static void Initialize(MidisContext midisContext)
        {
            if (midisContext.Settings.Any())
            {
                return;
            }

            var settings = new SettingModel[]
            {
                new() { Name = Setting.MaximumFileSize, Type = Type.Number, IntegerValue = 1024 },
                new() { Name = Setting.MinimumImageWidth, Type = Type.Number, IntegerValue = 200 },
                new() { Name = Setting.MinimumImageHeight, Type = Type.Number, IntegerValue = 200 },
                new() { Name = Setting.MaximumImageWidth, Type = Type.Number, IntegerValue = 500 },
                new() { Name = Setting.MaximumImageHeight, Type = Type.Number, IntegerValue = 500 },
                new() { Name = Setting.AllowedExtensions, Type = Type.String, StringValue = "jpg,png,bmp" },
            };

            midisContext.Settings.AddRange(settings);
            midisContext.SaveChanges();

            var users = new UserModel[]
            {
                new() { Username = "admin", PasswordHash = Utils.GetSHA256("admin" + "admin"), Roles = new[] { Role.User, Role.Admin } },
                new() { Username = "user", PasswordHash = Utils.GetSHA256("user" + "user"), Roles = new[] { Role.User } },
            };

            midisContext.Users.AddRange(users);
            midisContext.SaveChanges();
        }
    }
}
