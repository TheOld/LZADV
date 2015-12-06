using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using LoboVaz.Models;
using LoboVaz.Infra.DAO;
using MongoDB.Driver;
using MongoDB.Bson;

namespace LoboVaz.Domain.DAO
{
    public class PostDAOImpl : GenericDAOImpl, IPostDAO
    {

        public PostDAOImpl(IContext _Context) : base(_Context) { }

        public Post FindBy(ObjectId id)
        {
            return base.Context().GetCollection<Post>(Post.COLLECTION_NAME).AsQueryable().Where(x => x.Id.Equals(id)).FirstOrDefault();
        }

        public List<Post> load(User user,int page, String filter)
        {
            try
            {
                return base.Context().GetCollection<Post>(Post.COLLECTION_NAME).AsQueryable().ToList();
            }catch(Exception e)
            {
                return null;
            }
        }

        public void Save(Post post)
        {
            base.Context().GetCollection<Post>(Post.COLLECTION_NAME).InsertOneAsync(post);
        }

        public void Update(Post post)
        {
            var filter = Builders<Post>.Filter.Eq("_id", post.Id);
            var update = Builders<Post>.Update.Set(s => s.Title, post.Title).Set(x => x.Content, post.Content);
            base.Context().GetCollection<Post>(Post.COLLECTION_NAME).UpdateOneAsync(filter, update);
        }
    }
}