using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using LoboVaz.Models;
using LoboVaz.Infra.DAO;
using MongoDB.Bson;
using MongoDB.Driver;

namespace LoboVaz.Domain.DAO
{
    public class UserDAOImpl : GenericDAOImpl, IUserDAO
    {


        public UserDAOImpl(IContext Context) : base(Context) { }

        public User FindBy(ObjectId userID)
        {
            return base.Context().GetCollection<User>(User.COLLECTION_NAME).AsQueryable().Where(x => x.ID.Equals(userID)).First();
        }

        public User FindBy(string login)
        {
            try
            {
                return base.Context().GetCollection<User>(User.COLLECTION_NAME).AsQueryable().Where(x => x.Email.Equals(login)).First();
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public void Save(User user)
        {
            base.Context().GetCollection<User>(User.COLLECTION_NAME).InsertOneAsync(user);
        }
    }
}