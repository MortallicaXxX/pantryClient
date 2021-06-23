class pantry{

  pantryClient = function(PANTRY_ID){
    // https://getpantry.cloud/apiv1/pantry/YOUR_PANTRY_ID

    if(!PANTRY_ID)throw "PANTRY_ID manquant";
    this.__proto__.Basket = null;
    this.__proto__.PANTRY_ID = PANTRY_ID;
    this.__proto__.connect = function(callBack){
      var self = this;
      fetch(`https://getpantry.cloud/apiv1/pantry/${self.__proto__.PANTRY_ID}`,{method:'get'})
      .then(async function(result){
        self.pantry = await result.json();
        callBack(null,self);
      })
      .catch(function(err){
        callBack(err,null);
      })
    }
    this.__proto__.basket = function(basketName){
      try{
        if(!basketName)throw {err:0,msg:"basketName manquant"};
        this.__proto__.Basket = basketName;
        return this;
      }catch(err){
        console.error(err);
      }
    }
    this.__proto__.content = function(callBack){
      var self = this;
      fetch(`https://getpantry.cloud/apiv1/pantry/${self.__proto__.PANTRY_ID}/basket/${self.__proto__.Basket}`,{method:'get'})
      .then(async function(result){
        callBack(null,await result.json());
      })
      .catch(function(err){
        callBack(err,null);
      })
    },
    this.__proto__.insert = function(data){

    },
    this.__proto__.update = function(data){

    },
    this.__proto__.getErrors = function(){
      try{
        if(!this.pantry.errors)throw {err:0,msg:"pantry est manquant"}
        return this.pantry.errors;
      }catch(err){
        return err;
      }

    }

    return this;
  }

}

pantry.prototype.a_Internet = function () {
  return document.location ? {r:1,msg:`connecter à internet`} : {r:0,msg:`il semblerait qu'il manque internet`}
};

  // ----------------------- //
  // -----Partie de test-----//
  // ----------------------- //

// const pantryClient = (new pantry()).pantryClient;
// const client = new pantryClient("");
//
// client.connect(function(err) {
//   console.log(`PantryClient est prêt.`);
//   console.log(client);
//   // const db = client.db(dbName);
//   // client.close();
//   client.basket('').content(function(err,result){
//     console.log(err,result);
//   });
// });
