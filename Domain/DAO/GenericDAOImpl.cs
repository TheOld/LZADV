using LoboVaz.Infra.DAO;
using LoboVaz.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LoboVaz.Domain.DAO
{
    public class GenericDAOImpl : IGenericDAO
    {


        public IContext _Context { get; set; }

        public GenericDAOImpl(IContext Context)
        {
            this._Context = Context;
        }

        public IContext Context()
        {
            return _Context;
        }
    }
}