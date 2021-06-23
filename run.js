const pantryClient = (new pantry()).pantryClient;
const client = new pantryClient("");

client.connect(async function(err) {
  console.log(`PantryClient est prêt.`);
  console.log(client);

  client.basket('').content(function(err,result){
    if(err)throw err;
    else console.log(result);
  });

  client.basket('').insert({test:"test"},function(err,result){
    if(err)throw err;
    else console.log(result);
  });

  client.basket('').update({test:"lol"},function(err,result){
    if(err)throw err;
    else console.log(result);
  });

  client.basket('').delete(function(err,result){
    if(err)throw err;
    else console.log(result);
  });

});
