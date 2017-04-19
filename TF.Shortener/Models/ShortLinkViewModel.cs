using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace TF.Shortener.Models
{
    public class ShortLinkViewModel
    {
        [DataType(DataType.Url)]
        public String ShortPath { get; set; }

        [DataType(DataType.DateTime)]
        public DateTime CreateDate { get; set; }

        public Int64 Count { get; set; }

        [DataType(DataType.Url)]
        public Uri Uri { get; set; }
    }
}