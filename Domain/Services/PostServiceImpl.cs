using LoboVaz.Domain.DAO;
using LoboVaz.Models;
using MongoDB.Bson;
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

        public List<Post> Load(ObjectId userID,int page,string filter)
        {
            User user = UserService.FindBy(userID);
            return PostDAO.load(user,page,filter);
        }

        public Post FindBy(ObjectId id)
        {
            return PostDAO.FindBy(id);
        }

        public void Save(Post post)
        {
            post.LastWrite = DateTime.Now;
            if (post._ID.Equals("000000000000000000000000"))
            {
                PostDAO.Save(post);
            }
            else
            {
                PostDAO.Update(post);
            }

        }

        public void Toggle(ObjectId objectId)
        {
            Post post = FindBy(objectId);
            post.IsEnable = !post.IsEnable;
            Save(post);
        }
    }
}