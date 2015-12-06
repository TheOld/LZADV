using LoboVaz.Domain.DAO;
using LoboVaz.Models;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LoboVaz.Services
{
    public interface IPostService
    {
        List<Post> Load(ObjectId userID,int page, String filter);
        void Save(Post post);
        Post FindBy(ObjectId objectId);
    }
}