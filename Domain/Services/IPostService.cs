using LoboVaz.Domain.DAO;
using LoboVaz.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LoboVaz.Services
{
    public interface IPostService
    {
        List<Post> load(int userID,int page, String filter);
    }
}