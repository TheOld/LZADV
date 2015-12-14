using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;
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
        [JsonIgnore]
        public ObjectId Id { get; set; }
        public String _ID { get { return Id != null ? Id.ToString() : null; } }
        public DateTime Date { get; set; }
        public String Content { get; set; }
        public String Category { get; set; }
        public String Title { get; set; }
        public ObjectId Author { get; set; }
        /// <summary>
        /// This post is public view
        /// </summary>
        public bool IsEnable { get; set; }
        /// <summary>
        /// Last update in post
        /// </summary>
        public DateTime LastWrite { get; set; }

        public Post()
        {
            this.LastWrite = this.Date = DateTime.Now;
            IsEnable = true;
        }

    }

}