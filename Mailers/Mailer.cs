using Mvc.Mailer;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using LoboVaz.Models;

namespace LoboVaz.Mailers
{
    public class Mailer : MailerBase
    {
        public Mailer()
        {
            MasterName = "_Layout";
        }

        public virtual MvcMailMessage PrepareMailForm(MailerModel model, bool isCopy)
        {
            ViewBag.Name = model.Name;
            ViewBag.From = model.FromEmail;
            ViewBag.Phone = model.Phone;
            ViewBag.Message = model.Message;
            ViewBag.Quantity = model.Quantity;
            ViewBag.GrassType = model.GrassType;
            ViewBag.Sale = model.Sale;

            
                return Populate(x =>
                {
                    x.Subject = "Formulário de contato - Lobo & Vaz Advogados";
                    x.ViewName = "PrepareMailForm";
                    x.To.Add(model.ToEmail);
                    x.IsBodyHtml = true;
                });
        }
    }
}