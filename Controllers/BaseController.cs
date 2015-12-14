using LoboVaz.Models;
using LoboVaz.Services;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace LoboVaz.Controllers
{
    public class BaseController : Controller
    {

        public IUserService UserService { get; set; }

        public BaseController(IUserService UserService)
        {
            this.UserService = UserService;
        }
        public BaseController() { }

        protected User getUser()
        {
            String id = Request.Headers.Get("autentication-x");

            return UserService.FindBy(ObjectId.Parse(id));
        }
        
    }
}