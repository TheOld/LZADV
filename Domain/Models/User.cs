using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LoboVaz.Models
{
    public class User
    {

        public static String COLLECTION_NAME = "users";

        [BsonId]
        public ObjectId ID { get; set; }

        public String Email { get; set; }

        public String Name { get; set; }
        public String Password { get; set; }
    }

}