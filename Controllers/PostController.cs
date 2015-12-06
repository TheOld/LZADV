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

    public class PostController : Controller
    {

        public IPostService PostService { get; set; }

        public PostController(IPostService PostService)
        {
            this.PostService = PostService;
        }


        [HttpGet]
        public JsonResult get(String id)
        {
            return Json(PostService.FindBy(ObjectId.Parse(id)), JsonRequestBehavior.AllowGet);
        }


        [HttpGet]
        public JsonResult list(String filter, int page, String userID)
        {
            return Json(PostService.Load(new ObjectId(userID), page, filter), JsonRequestBehavior.AllowGet);
        }




        [HttpPost]
        public JsonResult save(String _ID, Post post)
        {
            post.Id = ObjectId.Parse(_ID);
            PostService.Save(post);
            return Json("", JsonRequestBehavior.AllowGet);
        }








    }
}