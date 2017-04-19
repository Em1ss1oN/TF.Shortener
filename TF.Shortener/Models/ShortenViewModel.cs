using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace TF.Shortener.Models
{
    public class ShortenViewModel
    {
        [DataType(DataType.Url)]
        [Url]
        [Required]
        public Uri Link { get; set; }
    }
}