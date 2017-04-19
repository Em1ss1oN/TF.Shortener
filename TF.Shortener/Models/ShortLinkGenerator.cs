using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Security.Cryptography;
using System.Text;

namespace TF.Shortener.Models
{
    public class ShortLinkGenerator : IShortLinkGenerator
    {
        public string GetNewShortLink()
        {
            var generator = RandomNumberGenerator.Create();
            var bytes = new Byte[8];
            generator.GetBytes(bytes);
            var sb = new StringBuilder();
            foreach (var b in bytes)
            {
                sb.Append(b.ToString("X"));
            }

            return sb.ToString().ToLowerInvariant();
        }
    }

    public interface IShortLinkGenerator
    {
        String GetNewShortLink();
    }
}