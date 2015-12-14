using LoboVaz.Infra.DAO;
using LoboVaz.Models;
using LoboVaz.Services;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace LoboVaz.Controllers
{

    public class PostController : BaseController
    {

        public IPostService PostService { get; set; }

        public PostController(IPostService PostService,IUserService UserService) :base(UserService)
        {
            this.PostService = PostService;
        }


        [HttpGet]
        public JsonResult get(String id)
        {
            Object result = null;
            try
            {
                result = PostService.FindBy(ObjectId.Parse(id));
            }
            catch (Exception e)
            {
                result = new { error = "error", cause = e.Message };
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }


        [HttpGet]
        public JsonResult list(String filter, int page, String userID)
        {
            return Json(PostService.Load(ObjectId.Parse(userID), page, filter), JsonRequestBehavior.AllowGet);
        }




        [HttpPost]
        public JsonResult save(String _ID, Post post)
        {
            User user = getUser();

            Object result = null;
            try
            {
                post.Author = user.Id;
                post.Id = ObjectId.Parse(_ID);
                PostService.Save(post);
                result = "OK";
            }
            catch(Exception e)
            {
                result = new { error = "error", cause = e.Message };
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }



        [HttpPost]
        public JsonResult toggle(String _ID)
        {
            PostService.Toggle(ObjectId.Parse(_ID));
            return Json("ok", JsonRequestBehavior.AllowGet);
        }







    }
}