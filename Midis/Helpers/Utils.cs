using System.Security.Cryptography;
using System.Text;

namespace Midis.Helpers
{
    public static class Utils
    {
        public static string GetSHA256(string value)
        {
            var bytes = SHA256.Create().ComputeHash(Encoding.UTF8.GetBytes(value));
            var stringBuilder = new StringBuilder();
            for (var n = 0; n < bytes.Length; n++)
                stringBuilder.Append(bytes[n].ToString("x2"));
            return stringBuilder.ToString();
        }
    }
}
