using LoboVaz.Models;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LoboVaz.Domain.DAO
{
    public interface IUserDAO : IGenericDAO
    {
        User FindBy(string login);

        User FindBy(ObjectId userID);
        void Save(User user);
    }
}