using LoboVaz.Infra.DAO;
using LoboVaz.Models;
using LoboVaz.Services;
using MongoDB.Bson;
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

        [HttpGet]
        public JsonResult getUserData(string UserID)
        {
            var user = UserService.FindBy(MongoDB.Bson.ObjectId.Parse(UserID));

            return Json(user, JsonRequestBehavior.AllowGet);
        }

       

        [HttpPost]
        public JsonResult create(User user)
        {
            UserService.Save(user);

            //for (int i = 0; i < Request.Files.Count; i++)
            //{
            //    HttpPostedFileBase arquivo = Request.Files[i];
            //    //Suas validações ......
            //    //Salva o arquivo 
            //    if (arquivo.ContentLength > 0)
            //    {
            //        var uploadPath = Server.MapPath("~/App_Data/Uploads");
            //        string caminhoArquivo = Path.Combine(@uploadPath, Path.GetFileName(user.Name + ".png"));
            //        arquivo.SaveAs(caminhoArquivo);
            //    }
            //}

            return Json(user, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Update(String _ID, User user)
        {
            Object result = null;
            try
            {
                user.Id = ObjectId.Parse(_ID);
                UserService.Update(user);
                result = "OK";
            }
            catch (Exception e)
            {
                result = new { error = "error", cause = e.Message };
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult logOn(User user)
        {
            User logeduser = UserService.Logon(user.Email, user.Password);
            
            Session.Add("user", user);
            return Json(logeduser == null ? "fail" : logeduser.Id.ToString(), JsonRequestBehavior.AllowGet);
            
        }

        [HttpGet]
        public ActionResult logOff()
        {
            Session.Clear();

            return RedirectToAction("Index", "Home", new { area = "" });

            //return Json("ok", JsonRequestBehavior.AllowGet);
        }
    }
}