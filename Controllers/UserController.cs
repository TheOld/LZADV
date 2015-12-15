using LoboVaz.Infra.DAO;
using LoboVaz.Models;
using LoboVaz.Services;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace LoboVaz.Controllers
{

    public class UserController : BaseController
    {

        public IUserService UserService { get; set; }

        public UserController(IUserService UserService)
        {
            this.UserService = UserService;
        }


        [HttpPost]
        public JsonResult create(User user)
        {
            UserService.Save(user);

            for (int i = 0; i < Request.Files.Count; i++)
            {
                HttpPostedFileBase arquivo = Request.Files[i];
                //Suas validações ......
                //Salva o arquivo 
                if (arquivo.ContentLength > 0)
                {
                    var uploadPath = Server.MapPath("~/Content/Uploads");
                    string caminhoArquivo = Path.Combine(@uploadPath, Path.GetFileName(user.Name + ".png"));
                    arquivo.SaveAs(caminhoArquivo);
                }
            }

            return Json(user, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult logOn(User user)
        {
            User logeduser = UserService.Logon(user.Email, user.Password);
            Session.Add("user", user);
            return Json(logeduser == null ? "fail" : logeduser.Id.ToString(), JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult logOff()
        {
            Session.Clear();
            return Json("ok", JsonRequestBehavior.AllowGet);
        }
    }
}