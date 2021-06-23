const pantryClient = (new pantry()).pantryClient;
const client = new pantryClient("pantryID");

client.connect(async function(err) {
  console.log(`PantryClient est prêt.`);
  console.log(client);

  client.basket('basketName').content(function(err,result){
    if(err)throw err;
    else console.log(result);
  });

  client.basket('basketName').insert({test:"test"},function(err,result){
    if(err)throw err;
    else console.log(result);
  });

  client.basket('basketName').update({test:"lol"},function(err,result){
    if(err)throw err;
    else console.log(result);
  });

  client.basket('basketName').delete(function(err,result){
    if(err)throw err;
    else console.log(result);
  });

});
