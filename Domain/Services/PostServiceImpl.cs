﻿using LoboVaz.Domain.DAO;
using LoboVaz.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LoboVaz.Services
{
    public class PostServiceImpl : IPostService
    {
        public IPostDAO PostDAO { get; set; }
        public IUserService UserService { get; set; }

        public PostServiceImpl(IPostDAO PostDAO, IUserService UserService) {
            this.PostDAO = PostDAO;
            this.UserService = UserService;
        }

        public List<Post> load(int userID,int page,string filter)
        {
            User user = UserService.findBy(userID);
            return PostDAO.load(user,page,filter);
        }

    }
}