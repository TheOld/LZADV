using LoboVaz.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MongoDB.Bson;

namespace LoboVaz.Domain.DAO
{
    public interface IPostDAO : IGenericDAO
    {
        
        List<Post> load(User user, int page, string filter);
        Post FindBy(ObjectId id);
        void Update(Post post);
        void Save(Post post);
    }
}