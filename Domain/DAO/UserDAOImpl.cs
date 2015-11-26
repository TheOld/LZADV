using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using LoboVaz.Models;

namespace LoboVaz.Domain.DAO
{
    public class UserDAOImpl : GenericDAOImpl,IUserDAO
    {
        public List<Post> load()
        {
            List<Post> posts = new List<Post>();
            posts.Add(new Post("Title 1", "Category 1", "www.guiamuonline.com/loren-deep  Traduzir esta página 19 de mai de 2010 - Evento Loren Deep en Mu Online. ...La Invasion se produce en el Sector A de Valle of loren y Sale el Mutant(Hero).Objetivo Matar todos los... Não encontrados: bla ‎bla"));
            posts.Add(new Post("Title 2", "Category 2", "www.guiamuonline.com/loren-deep  Traduzir esta página 19 de mai de 2010 - Evento Loren Deep en Mu Online. ...La Invasion se produce en el Sector A de Valle of loren y Sale el Mutant(Hero).Objetivo Matar todos los... Não encontrados: bla ‎bla"));
            posts.Add(new Post("Title 3", "Category 3", "www.guiamuonline.com/loren-deep  Traduzir esta página 19 de mai de 2010 - Evento Loren Deep en Mu Online. ...La Invasion se produce en el Sector A de Valle of loren y Sale el Mutant(Hero).Objetivo Matar todos los... Não encontrados: bla ‎bla"));
            posts.Add(new Post("Title 4", "Category 4", "www.guiamuonline.com/loren-deep  Traduzir esta página 19 de mai de 2010 - Evento Loren Deep en Mu Online. ...La Invasion se produce en el Sector A de Valle of loren y Sale el Mutant(Hero).Objetivo Matar todos los... Não encontrados: bla ‎bla"));
            posts.Add(new Post("Title 5", "Category 5", "www.guiamuonline.com/loren-deep  Traduzir esta página 19 de mai de 2010 - Evento Loren Deep en Mu Online. ...La Invasion se produce en el Sector A de Valle of loren y Sale el Mutant(Hero).Objetivo Matar todos los... Não encontrados: bla ‎bla"));
            posts.Add(new Post("Title 6", "Category 6", "www.guiamuonline.com/loren-deep  Traduzir esta página 19 de mai de 2010 - Evento Loren Deep en Mu Online. ...La Invasion se produce en el Sector A de Valle of loren y Sale el Mutant(Hero).Objetivo Matar todos los... Não encontrados: bla ‎bla"));
            posts.Add(new Post("Title 7", "Category 7", "www.guiamuonline.com/loren-deep  Traduzir esta página 19 de mai de 2010 - Evento Loren Deep en Mu Online. ...La Invasion se produce en el Sector A de Valle of loren y Sale el Mutant(Hero).Objetivo Matar todos los... Não encontrados: bla ‎bla"));
            posts.Add(new Post("Title 8", "Category 8", "www.guiamuonline.com/loren-deep  Traduzir esta página 19 de mai de 2010 - Evento Loren Deep en Mu Online. ...La Invasion se produce en el Sector A de Valle of loren y Sale el Mutant(Hero).Objetivo Matar todos los... Não encontrados: bla ‎bla"));

            return posts;
        }
    }
}