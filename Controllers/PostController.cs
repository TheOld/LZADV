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

        public IUserService UserService { get; set; }

        public PostController(IPostService PostService,IUserService UserService) :base(UserService)
        {
            this.PostService = PostService;
            this.UserService = UserService;
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

        public Post GetPostByID(String id)
        {
            Post post = new Post();

            try
            {
                post = PostService.FindBy(ObjectId.Parse(id));
                return post;
            }
            catch (Exception e)
            {
                return null;
            }
           
        }

        [HttpGet]
        public JsonResult list(String filter, int page, String userID)
        {
            return Json(PostService.Load(ObjectId.Parse(userID), page, filter).OrderBy(x=>x.Date), JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult listInactive(String filter, int page, String userID)
        {
            return Json(PostService.LoadInactive(ObjectId.Parse(userID), page, filter), JsonRequestBehavior.AllowGet);
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
        public JsonResult Update(Post post)
        {
            //User user = getUser();

            Object result = null;
            try
            {
                PostService.Save(post);
                result = "OK";
            }
            catch (Exception e)
            {
                result = new { error = "error", cause = e.Message };
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult toggle(String _ID)
        {
            bool result = PostService.Toggle(ObjectId.Parse(_ID));
            return Json(result, JsonRequestBehavior.AllowGet);
        }



        public ActionResult PostList(string userID)
        {
            try
            {
                ViewBag.UserID = userID;
                return View();
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public ActionResult PostView(String id)
        {
            try
            {
                

                Post post = GetPostByID(id);
                User user = GetuserByID(post.Author);
                ViewBag.Post = post;
                ViewBag.user = user;
                ViewBag.Avatar = "../img/" + user.Name + ".png";
                return View();
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public User GetuserByID(ObjectId userID)
        {
            var user = UserService.FindBy(userID);

            return user;
        }

    }
}