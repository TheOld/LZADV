using LoboVaz.Mailers;
using LoboVaz.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net.Configuration;
using System.Web;
using System.Web.Mvc;

namespace LoboVaz.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult IndexEN()
        {
            return View();
        }
        public ActionResult IndexFR()
        {
            return View();
        }

        [HttpPost]
        public JsonResult SendContactMail(string email, string name, string messageContact, string phone)
        {
            JsonResponse response = new JsonResponse();

            try
            {
                SmtpSection smtp = (SmtpSection)ConfigurationManager.GetSection("system.net/mailSettings/smtp");

                MailerModel m = new MailerModel();
                m.Name = name;
                m.Phone = phone;
                m.FromEmail = email;
                m.Message = messageContact;
                m.ToEmail = "contato@lzadv.com.br";

                Mailer psr = new Mailer();
                psr.PrepareMailForm(m, false).Send();

                response.Success = true;
                response.Message = "Seu email foi enviado com sucesso.";
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Messages = new System.Collections.Generic.List<ResponseItem>();
                response.Messages.Add(new ResponseItem() { Message = ex.StackTrace });
                response.Message = ex.Message;
            }

            return Json(response);
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        
        public ActionResult BlogAdmin()
        {
            return View();
        }

    }
}