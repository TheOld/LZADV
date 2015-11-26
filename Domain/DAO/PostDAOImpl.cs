﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using LoboVaz.Models;

namespace LoboVaz.Domain.DAO
{
    public class PostDAOImpl : GenericDAOImpl, IPostDAO
    {
        public List<Post> load(int page, String filter)
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
            posts.Add(new Post("Title 9", "Category 9", "www.guiamuonline.com/loren-deep  Traduzir esta página 19 de mai de 2010 - Evento Loren Deep en Mu Online. ...La Invasion se produce en el Sector A de Valle of loren y Sale el Mutant(Hero).Objetivo Matar todos los... Não encontrados: bla ‎bla"));

            posts.Add(new Post("Title 10", "Category 10", "www.guiamuonline.com/loren-deep  Traduzir esta página 19 de mai de 2010 - Evento Loren Deep en Mu Online. ...La Invasion se produce en el Sector A de Valle of loren y Sale el Mutant(Hero).Objetivo Matar todos los... Não encontrados: bla ‎bla"));
            posts.Add(new Post("Title 11", "Category 11", "www.guiamuonline.com/loren-deep  Traduzir esta página 19 de mai de 2010 - Evento Loren Deep en Mu Online. ...La Invasion se produce en el Sector A de Valle of loren y Sale el Mutant(Hero).Objetivo Matar todos los... Não encontrados: bla ‎bla"));
            posts.Add(new Post("Title 12", "Category 12", "www.guiamuonline.com/loren-deep  Traduzir esta página 19 de mai de 2010 - Evento Loren Deep en Mu Online. ...La Invasion se produce en el Sector A de Valle of loren y Sale el Mutant(Hero).Objetivo Matar todos los... Não encontrados: bla ‎bla"));
            posts.Add(new Post("Title 13", "Category 13", "www.guiamuonline.com/loren-deep  Traduzir esta página 19 de mai de 2010 - Evento Loren Deep en Mu Online. ...La Invasion se produce en el Sector A de Valle of loren y Sale el Mutant(Hero).Objetivo Matar todos los... Não encontrados: bla ‎bla"));
            posts.Add(new Post("Title 14", "Category 14", "www.guiamuonline.com/loren-deep  Traduzir esta página 19 de mai de 2010 - Evento Loren Deep en Mu Online. ...La Invasion se produce en el Sector A de Valle of loren y Sale el Mutant(Hero).Objetivo Matar todos los... Não encontrados: bla ‎bla"));
            posts.Add(new Post("Title 15", "Category 15", "www.guiamuonline.com/loren-deep  Traduzir esta página 19 de mai de 2010 - Evento Loren Deep en Mu Online. ...La Invasion se produce en el Sector A de Valle of loren y Sale el Mutant(Hero).Objetivo Matar todos los... Não encontrados: bla ‎bla"));
            posts.Add(new Post("Title 16", "Category 16", "www.guiamuonline.com/loren-deep  Traduzir esta página 19 de mai de 2010 - Evento Loren Deep en Mu Online. ...La Invasion se produce en el Sector A de Valle of loren y Sale el Mutant(Hero).Objetivo Matar todos los... Não encontrados: bla ‎bla"));
            posts.Add(new Post("Title 17", "Category 17", "www.guiamuonline.com/loren-deep  Traduzir esta página 19 de mai de 2010 - Evento Loren Deep en Mu Online. ...La Invasion se produce en el Sector A de Valle of loren y Sale el Mutant(Hero).Objetivo Matar todos los... Não encontrados: bla ‎bla"));
            posts.Add(new Post("Title 18", "Category 18", "www.guiamuonline.com/loren-deep  Traduzir esta página 19 de mai de 2010 - Evento Loren Deep en Mu Online. ...La Invasion se produce en el Sector A de Valle of loren y Sale el Mutant(Hero).Objetivo Matar todos los... Não encontrados: bla ‎bla"));
            posts.Add(new Post("Title 19", "Category 19", "www.guiamuonline.com/loren-deep  Traduzir esta página 19 de mai de 2010 - Evento Loren Deep en Mu Online. ...La Invasion se produce en el Sector A de Valle of loren y Sale el Mutant(Hero).Objetivo Matar todos los... Não encontrados: bla ‎bla"));

            posts.Add(new Post("Title 20", "Category 20", "www.guiamuonline.com/loren-deep  Traduzir esta página 19 de mai de 2010 - Evento Loren Deep en Mu Online. ...La Invasion se produce en el Sector A de Valle of loren y Sale el Mutant(Hero).Objetivo Matar todos los... Não encontrados: bla ‎bla"));
            posts.Add(new Post("Title 21", "Category 21", "www.guiamuonline.com/loren-deep  Traduzir esta página 19 de mai de 2010 - Evento Loren Deep en Mu Online. ...La Invasion se produce en el Sector A de Valle of loren y Sale el Mutant(Hero).Objetivo Matar todos los... Não encontrados: bla ‎bla"));
            posts.Add(new Post("Title 22", "Category 22", "www.guiamuonline.com/loren-deep  Traduzir esta página 19 de mai de 2010 - Evento Loren Deep en Mu Online. ...La Invasion se produce en el Sector A de Valle of loren y Sale el Mutant(Hero).Objetivo Matar todos los... Não encontrados: bla ‎bla"));
            posts.Add(new Post("Title 23", "Category 23", "www.guiamuonline.com/loren-deep  Traduzir esta página 19 de mai de 2010 - Evento Loren Deep en Mu Online. ...La Invasion se produce en el Sector A de Valle of loren y Sale el Mutant(Hero).Objetivo Matar todos los... Não encontrados: bla ‎bla"));
            posts.Add(new Post("Title 24", "Category 24", "www.guiamuonline.com/loren-deep  Traduzir esta página 19 de mai de 2010 - Evento Loren Deep en Mu Online. ...La Invasion se produce en el Sector A de Valle of loren y Sale el Mutant(Hero).Objetivo Matar todos los... Não encontrados: bla ‎bla"));
            posts.Add(new Post("Title 25", "Category 25", "www.guiamuonline.com/loren-deep  Traduzir esta página 19 de mai de 2010 - Evento Loren Deep en Mu Online. ...La Invasion se produce en el Sector A de Valle of loren y Sale el Mutant(Hero).Objetivo Matar todos los... Não encontrados: bla ‎bla"));
            posts.Add(new Post("Title 26", "Category 26", "www.guiamuonline.com/loren-deep  Traduzir esta página 19 de mai de 2010 - Evento Loren Deep en Mu Online. ...La Invasion se produce en el Sector A de Valle of loren y Sale el Mutant(Hero).Objetivo Matar todos los... Não encontrados: bla ‎bla"));
            posts.Add(new Post("Title 27", "Category 27", "www.guiamuonline.com/loren-deep  Traduzir esta página 19 de mai de 2010 - Evento Loren Deep en Mu Online. ...La Invasion se produce en el Sector A de Valle of loren y Sale el Mutant(Hero).Objetivo Matar todos los... Não encontrados: bla ‎bla"));
            posts.Add(new Post("Title 28", "Category 28", "www.guiamuonline.com/loren-deep  Traduzir esta página 19 de mai de 2010 - Evento Loren Deep en Mu Online. ...La Invasion se produce en el Sector A de Valle of loren y Sale el Mutant(Hero).Objetivo Matar todos los... Não encontrados: bla ‎bla"));
            posts.Add(new Post("Title 29", "Category 29", "www.guiamuonline.com/loren-deep  Traduzir esta página 19 de mai de 2010 - Evento Loren Deep en Mu Online. ...La Invasion se produce en el Sector A de Valle of loren y Sale el Mutant(Hero).Objetivo Matar todos los... Não encontrados: bla ‎bla"));

            posts.Add(new Post("Title 30", "Category 30", "www.guiamuonline.com/loren-deep  Traduzir esta página 19 de mai de 2010 - Evento Loren Deep en Mu Online. ...La Invasion se produce en el Sector A de Valle of loren y Sale el Mutant(Hero).Objetivo Matar todos los... Não encontrados: bla ‎bla"));
            posts.Add(new Post("Title 31", "Category 31", "www.guiamuonline.com/loren-deep  Traduzir esta página 19 de mai de 2010 - Evento Loren Deep en Mu Online. ...La Invasion se produce en el Sector A de Valle of loren y Sale el Mutant(Hero).Objetivo Matar todos los... Não encontrados: bla ‎bla"));
            posts.Add(new Post("Title 32", "Category 32", "www.guiamuonline.com/loren-deep  Traduzir esta página 19 de mai de 2010 - Evento Loren Deep en Mu Online. ...La Invasion se produce en el Sector A de Valle of loren y Sale el Mutant(Hero).Objetivo Matar todos los... Não encontrados: bla ‎bla"));
            posts.Add(new Post("Title 33", "Category 33", "www.guiamuonline.com/loren-deep  Traduzir esta página 19 de mai de 2010 - Evento Loren Deep en Mu Online. ...La Invasion se produce en el Sector A de Valle of loren y Sale el Mutant(Hero).Objetivo Matar todos los... Não encontrados: bla ‎bla"));
            posts.Add(new Post("Title 34", "Category 34", "www.guiamuonline.com/loren-deep  Traduzir esta página 19 de mai de 2010 - Evento Loren Deep en Mu Online. ...La Invasion se produce en el Sector A de Valle of loren y Sale el Mutant(Hero).Objetivo Matar todos los... Não encontrados: bla ‎bla"));
            posts.Add(new Post("Title 35", "Category 35", "www.guiamuonline.com/loren-deep  Traduzir esta página 19 de mai de 2010 - Evento Loren Deep en Mu Online. ...La Invasion se produce en el Sector A de Valle of loren y Sale el Mutant(Hero).Objetivo Matar todos los... Não encontrados: bla ‎bla"));
            posts.Add(new Post("Title 36", "Category 36", "www.guiamuonline.com/loren-deep  Traduzir esta página 19 de mai de 2010 - Evento Loren Deep en Mu Online. ...La Invasion se produce en el Sector A de Valle of loren y Sale el Mutant(Hero).Objetivo Matar todos los... Não encontrados: bla ‎bla"));
            posts.Add(new Post("Title 37", "Category 37", "www.guiamuonline.com/loren-deep  Traduzir esta página 19 de mai de 2010 - Evento Loren Deep en Mu Online. ...La Invasion se produce en el Sector A de Valle of loren y Sale el Mutant(Hero).Objetivo Matar todos los... Não encontrados: bla ‎bla"));
            posts.Add(new Post("Title 38", "Category 38", "www.guiamuonline.com/loren-deep  Traduzir esta página 19 de mai de 2010 - Evento Loren Deep en Mu Online. ...La Invasion se produce en el Sector A de Valle of loren y Sale el Mutant(Hero).Objetivo Matar todos los... Não encontrados: bla ‎bla"));
            posts.Add(new Post("Title 39", "Category 39", "www.guiamuonline.com/loren-deep  Traduzir esta página 19 de mai de 2010 - Evento Loren Deep en Mu Online. ...La Invasion se produce en el Sector A de Valle of loren y Sale el Mutant(Hero).Objetivo Matar todos los... Não encontrados: bla ‎bla"));


            return posts.GetRange(page * 10, 10);
        }
    }
}