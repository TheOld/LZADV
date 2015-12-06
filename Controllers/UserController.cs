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

    public class UserController : Controller
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
                    string caminhoArquivo = Path.Combine(@uploadPath, Path.GetFileName(user.Name + ".jpg"));
                    arquivo.SaveAs(caminhoArquivo);
                }
            }

            return Json(user, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult logOn(String userName, String password)
        {
            User user = UserService.Logon(userName, password);
            Session.Add("user", user);
            return Json(user == null ? "fail" : user.ID.ToString(), JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult logOff()
        {
            Session.Clear();
            return Json("ok", JsonRequestBehavior.AllowGet);
        }
    }
}