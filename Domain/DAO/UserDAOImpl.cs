using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using LoboVaz.Models;
using LoboVaz.Infra.DAO;

namespace LoboVaz.Domain.DAO
{
    public class UserDAOImpl : GenericDAOImpl, IUserDAO
    {


        public UserDAOImpl(IContext Context) : base(Context) { }
      
    }
}