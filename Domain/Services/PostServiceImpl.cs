using LoboVaz.Domain.DAO;
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

        public PostServiceImpl(IPostDAO PostDAO) {
            this.PostDAO = PostDAO;
        }

        public List<Post> load(int page,string filter)
        {
            return PostDAO.load(page,filter);
        }

    }
}