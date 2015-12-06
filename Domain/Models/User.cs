using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;
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
        [JsonIgnore]
        public ObjectId Id { get; set; }
        public String _ID { get { return Id != null ? Id.ToString() : null; } }

        public String Email { get; set; }

        public String Name { get; set; }
        public String Password { get; set; }
    }

}