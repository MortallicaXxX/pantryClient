const pantryClient = (new pantry()).pantryClient;
const client = new pantryClient("0a1cffa5-c994-493a-a5a5-76bfd2d92023");

client.connect(function(err) {
  console.log(`PantryClient est prêt.`);
  console.log(client);
  // const db = client.db(dbName);
  // client.close();
  client.basket('carree').content(function(err,result){
    console.log(err,result);
  });
});
