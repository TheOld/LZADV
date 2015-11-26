using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LoboVaz.Models
{
    public class MailerModel
    {
        public bool Sale { get; set; }

        public string Name { get; set; }

        public string GrassType { get; set; }

        public string Phone { get; set; }

        public string FromEmail { get; set; }

        public string Message { get; set; }

        public string ToEmail { get; set; }
        public string Quantity { get; set; }
        
    }
}