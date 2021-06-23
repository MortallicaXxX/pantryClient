const pantryClient = (new pantry()).pantryClient;
const client = new pantryClient("");

client.connect(function(err) {
  console.log(`PantryClient est prêt.`);
  console.log(client);
  // const db = client.db(dbName);
  // client.close();
  client.basket('carree').content(function(err,result){
    console.log(err,result);
  });
});
