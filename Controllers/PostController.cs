using LoboVaz.Services;
using Ninject;
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
        public JsonResult list(String filter,int page)
        {

            return Json(PostService.load(page,filter), JsonRequestBehavior.AllowGet);
        }







    }
}