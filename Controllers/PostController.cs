using LoboVaz.Infra.DAO;
using LoboVaz.Models;
using LoboVaz.Services;
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
        public JsonResult list(String filter, int page, int userID)
        {
            return Json(PostService.load(userID, page, filter), JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        public JsonResult add(Post post)
        {


            return Json("", JsonRequestBehavior.AllowGet);
        }








    }
}