using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LoboVaz.Models
{
    public class Post
    {
        public int ID { get; set; }
        public DateTime Date { get; set; }
        public String Content { get; set; }
        public String Category { get; set; }
        public String Title { get; set; }


        public Post(String title,String category,String content)
        {
            this.Category = category;
            this.Title = title;
            this.Content = content;
            this.Date = DateTime.Now;
        }


    }

}