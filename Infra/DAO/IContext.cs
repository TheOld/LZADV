using LoboVaz.Services;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace LoboVaz.Infra.DAO
{

    public interface IContext 
    {


        IMongoCollection<T> GetCollection<T>(String name);


    }
}