using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using LoboVaz.Models;
using LoboVaz.Infra.DAO;
using MongoDB.Driver;
using MongoDB.Bson;
using MongoDB.Driver.Linq;

namespace LoboVaz.Domain.DAO
{
    public class PostDAOImpl : GenericDAOImpl, IPostDAO
    {

        public PostDAOImpl(IContext _Context) : base(_Context) { }

        public Post FindBy(ObjectId id)
        {
            return base.Context().GetCollection<Post>(Post.COLLECTION_NAME).AsQueryable().Where(x => x.Id.Equals(id)).FirstOrDefault();
        }

        public List<Post> load(User user, int page, String filter)
        {
            try
            {
                IMongoQueryable<Post> query = base.Context().GetCollection<Post>(Post.COLLECTION_NAME).AsQueryable();

                if (!String.IsNullOrEmpty(filter))
                {
                    filter = filter.ToLower();
                    query = query.Where(x => x.Title.ToLower().Contains(filter) || x.Content.ToLower().Contains(filter));

                }

                return query.Where(x => x.IsEnable == true && user.Id.Equals(x.Author)).Skip(page * 10).Take(10).ToList();
            }
            catch (Exception e)
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
            var update = Builders<Post>.Update
                .Set(s => s.Title, post.Title)
                .Set(x => x.IsEnable, post.IsEnable)
                .Set(x => x.Content, post.Content)
                .Set(x => x.LastWrite, post.LastWrite)
                .Set(x => x.Author, post.Author);
            base.Context().GetCollection<Post>(Post.COLLECTION_NAME).UpdateOneAsync(filter, update);
        }
    }
}