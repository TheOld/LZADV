using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LoboVaz.Models
{
    public class Post
    {
        public static String COLLECTION_NAME = "posts";

        [BsonId]
        public ObjectId Id { get; set; }
        public DateTime Date { get; set; }
        public String Content { get; set; }
        public String Category { get; set; }
        public String Title { get; set; }
        public User Author { get; set; }


        public Post(String title, String category, String content, User author)
        {
            this.Category = category;
            this.Title = title;
            this.Content = content;
            this.Date = DateTime.Now;
            this.Author = author;
        }


    }

}