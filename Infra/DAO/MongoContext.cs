
using LoboVaz.Models;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Linq;
using System;

namespace LoboVaz.Infra.DAO
{

    public class MongoContext : IContext
    {
        private MongoClient Client { get; set; }
        private IMongoDatabase Database { get; set; }

        public MongoContext()
        {
            Connect();
        }

        private void Connect()
        {

            Client = new MongoClient("mongodb://localhost:27017");
             Database = Client.GetDatabase("blog");
            //var collection = Database.GetCollection<Post>(Post.COLLECTION_NAME);


            //var list =  collection.Find(new BsonDocument("Name", "Jack"))
            //    .ToListAsync();

            //foreach (var document in collection.AsQueryable<Post>().ToList())
            //{
            //    Console.WriteLine("Denner");
            //}

            //var client = new MongoClient();

            //IMongoDatabase databease = client.GetDatabase("blog");

            //var collection = databease.GetCollection<BsonDocument>("posts");

            ////var documents = collection.Find(new BsonDocument()).ToListAsync();
            //await collection.Find(new BsonDocument()).ForEachAsync(d => Console.WriteLine(d));

            // or use a connection string
            //var client = new MongoClient("mongodb://localhost:27017");

            // or, to connect to a replica set, with auto-discovery of the primary, supply a seed list of members
            //var client = new MongoClient("mongodb://localhost:27017,localhost:27018,localhost:27019");

        }

        public   IMongoCollection<T> GetCollection<T>(String name)
        {

            if(Database == null) { Connect(); }

            return Database.GetCollection<T>(name);
        }





    }
}