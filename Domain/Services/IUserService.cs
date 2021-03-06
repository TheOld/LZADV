﻿using LoboVaz.Domain.DAO;
using LoboVaz.Models;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LoboVaz.Services
{
    public interface IUserService
    {
        User FindBy(ObjectId userID);

        User Logon(String login, String password);

        void Save(User user);
        void Update(User user);
    }
}