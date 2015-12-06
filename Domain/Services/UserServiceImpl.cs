using LoboVaz.Domain.DAO;
using LoboVaz.Models;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LoboVaz.Services
{
    public class UserServiceImpl : IUserService
    {


        public IUserDAO UserDAO { get; set; }

        public UserServiceImpl(IUserDAO UserDAO)
        {
            this.UserDAO = UserDAO;
        }



        public User FindBy(ObjectId userID)
        {
            return UserDAO.FindBy(userID);
        }


        public User Logon(string login, string password)
        {
            User user = UserDAO.FindBy(login);
            if (!user.Password.Equals(password))
            {
                return null;
            }
            return user;

        }

        public void Save(User user)
        {
            UserDAO.Save(user);

        }
    }
}