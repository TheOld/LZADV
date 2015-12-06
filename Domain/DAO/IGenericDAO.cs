using LoboVaz.Infra.DAO;
using LoboVaz.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LoboVaz.Domain.DAO
{
    public interface IGenericDAO
    {


         IContext Context();
    }
}