using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using LoboVaz.Models;
using LoboVaz.Infra.DAO;
using MongoDB.Driver;

namespace LoboVaz.Domain.DAO
{
    public class PostDAOImpl : GenericDAOImpl, IPostDAO
    {

        public PostDAOImpl(IContext _Context) : base(_Context) { }


        public List<Post> load(User user, int page, String filter)
        {
            return base.Context().GetCollection<Post>(Post.COLLECTION_NAME).AsQueryable().ToList();
        }
    }
}