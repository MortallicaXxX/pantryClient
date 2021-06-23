class pantry{

  constructor(){
    this.test_validite();
  }

  pantryClient = function(PANTRY_ID){

    if(!PANTRY_ID)throw "PANTRY_ID manquant";
    this.__proto__.Basket = null;
    this.__proto__.PANTRY_ID = PANTRY_ID;
    this.__proto__.connect = function(callBack){
      var self = this;
      fetch(`https://getpantry.cloud/apiv1/pantry/${self.__proto__.PANTRY_ID}`,{method:'GET'})
      .then(async function(result){
        self.pantry = await result.json();
        if(callBack)callBack(null,self);
      })
      .catch(function(err){
        if(callBack)callBack(null,self);
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
      fetch(`https://getpantry.cloud/apiv1/pantry/${self.__proto__.PANTRY_ID}/basket/${self.__proto__.Basket}`,{method:'GET'})
      .then(async function(result){
        if(callBack)await callBack(null,await result.json());
        self.testError();
      })
      .catch(function(err){
        if(callBack)callBack(err,null);
      })
    },
    this.__proto__.insert = function(data,callBack){
      var self = this;
      fetch(`https://getpantry.cloud/apiv1/pantry/${self.__proto__.PANTRY_ID}/basket/${self.__proto__.Basket}`,{
        method : "POST",
        Accept: '*/*',
        'Accept-Encoding': 'gzip, deflate, br',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
      })
      .then(async function(result){
        if(callBack)await callBack(null,{result:await result.text()});
        self.testError();
      })
      .catch(function(err){
        if(callBack)callBack(err);
      })
    },
    this.__proto__.update = function(data,callBack){
      var self = this;
      fetch(`https://getpantry.cloud/apiv1/pantry/${self.__proto__.PANTRY_ID}/basket/${self.__proto__.Basket}`,{
        method : "PUT",
        Accept: '*/*',
        'Accept-Encoding': 'gzip, deflate, br',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        },
        body : JSON.stringify(data)
      })
      .then(async function(result){
        if(callBack)await callBack(null,{result:await result.json()});
        self.testError();
      })
      .catch(function(err){
        if(callBack)callBack(err);
      })
    },
    this.__proto__.delete = function(callBack){
      var self = this;
      fetch(`https://getpantry.cloud/apiv1/pantry/${self.__proto__.PANTRY_ID}/basket/${self.__proto__.Basket}`,{
        method : "DELETE",
        Accept: '*/*',
        'Accept-Encoding': 'gzip, deflate, br',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        },
      })
      .then(async function(result){
        if(callBack)callBack(null,await result.text());
        self.testError();
      })
      .catch(function(err){
        if(callBack)callBack(err);
      })
    }
    this.__proto__.testError = async function(){
      const self = this;
      fetch(`https://getpantry.cloud/apiv1/pantry/${self.__proto__.PANTRY_ID}`,{method:'GET'})
      .then(async function(result){
        result = await result.json();
        if(result.errors.length > self.getErrors().length){ // si une nouvelle erreur est détectée
          self.onError(result.errors[result.errors.length - 1]);
          self.pantry = result;
        }
      })
      .catch(function(err){
        console.error(err);
      })
    }
    this.__proto__.onError = function(err){
      var now = new Date;
      console.error({err : err , time : `${now.getUTCHours()}:${now.getUTCMinutes()}:${now.getUTCSeconds()}.${now.getUTCMilliseconds()}`});
    }
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

pantry.prototype.test_validite = function () {
  this.a_Internet();
};

pantry.prototype.a_Internet = function () {
  return window.navigator.onLine ? console.log({r:1,msg:`connecter à internet`}) : console.error({r:0,code:'errco',msg:`il semblerait qu'il manque internet`});
};
