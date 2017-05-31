(function(ext) {
    var token = 'EZHSAUWDGL4QBPPGA65EIA6MHT5SLN5J';
    var proxy_address = 'http://localhost:3000/'
    var app_name = 'TestApp';
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    /*ext.create_app = function(name, lang, private){
        //creates a new wit app -- DOESN'T WORK
        
        if (name == app_name){
            console.log("Already exists!")
        }
        else{ 
            $.ajax({
              url: 'https://api.wit.ai/apps?v=20170506',
              data: {
                'name': name,
                'lang': lang,
                'private': private,
                'access_token' : token
              },
              dataType: 'jsonp',
              method: 'POST',
              success: function(response) {
                  console.log("success!", response);
                  app_name = name;
                  token = response['access_token'];
              }
            });
        }
    };*/

    ext.get_response = function(target, query, callback){
        //get one of the entities from wit's interpretation of your sentance
        $.ajax({
          url: 'https://api.wit.ai/message?v=20170506&q=',
          data: {
            'q': query,
            'access_token' : token
          },
          dataType: 'jsonp',
          method: 'GET',
          success: function(response) {
              console.log("success!", response);
              try{
                intention = response['entities'][target]['0']['value'];
              }
              catch(err){
                intention = 'None'
              }
              callback(intention);
          }
        });
    };

    ext.get_number_of_values = function(target, callback){
        //get all the possible values for an entity

        //set url (part of the url is the target entity)
        var url_t = 'https://api.wit.ai/entities/';
        url_t += target;
        url_t += '?v=20170307';

        $.ajax({
          url: url_t,
          data: {
            'access_token' : token
          },
          dataType: 'jsonp',
          method: 'GET',
          success: function(response) {
              console.log("success!", response);
              output = [];
              for (i = 0; i < response['values'].length;i++){
                output.push(response['values'][i]['value'])
              }
              callback(output.length);
          }
        });
    };

    ext.get_number_of_entities = function(callback){
        //get all entities associated with the chatbot

        $.ajax({
          url: 'https://api.wit.ai/entities?v=20170506',
          data: {
            'access_token' : token
          },
          dataType: 'jsonp',
          method: 'GET',
          success: function(response) {
              console.log("success!", response);
              output = response.length
              callback(output);
          }
        });
    };

    ext.get_value_from_number = function(target, n, callback){
        //get the value associated with a number

        //set url (part of the url is the target entity)
        var url_t = 'https://api.wit.ai/entities/';
        url_t += target;
        url_t += '?v=20170307';

        $.ajax({
          url: url_t,
          data: {
            'access_token' : token
          },
          dataType: 'jsonp',
          method: 'GET',
          success: function(response) {
              console.log("success!", response);
              output = response['values'][n]['value'];
              callback(output);
          }
        });
    };

    ext.get_entity_from_number = function(n, callback){
        //get all entities associated with the chatbot

        $.ajax({
          url: 'https://api.wit.ai/entities?v=20170506',
          data: {
            'access_token' : token
          },
          dataType: 'jsonp',
          method: 'GET',
          success: function(response) {
              console.log("success!", response);
              output = response[n];
              callback(output);
          }
        });
    };

    ext.get_all_entities = function(callback){
        //get all entities associated with the chatbot
        $.ajax({
          url: 'https://api.wit.ai/entities?v=20170506',
          data: {
            'access_token' : token
          },
          dataType: 'jsonp',
          method: 'GET',
          success: function(response) {
              console.log("success!", response);
              output = response;
              callback(output);
          }
        });
    };

    ext.get_all_values = function(target, callback){
        //get all the possible values for an entity

        //set url (part of the url is the target entity)
        var url_t = 'https://api.wit.ai/entities/';
        url_t += target;
        url_t += '?v=20170307';

        $.ajax({
          url: url_t,
          data: {
            'access_token' : token
          },
          dataType: 'jsonp',
          method: 'GET',
          success: function(response) {
              console.log("success!", response);
              output = [];
              for (i = 0; i < response['values'].length;i++){
                output.push(response['values'][i]['value'])
              }
              callback(output);
          }
        });
    };

    ext.set_token = function(new_token){
        token = new_token;
    };

    ext.validate = function(text,entities,values,callback){
        //validate an example sentance
        var url_t = ''

        //get all entities associated with the chatbot
        all_entities = ext.get_all_entities(function(inp){
          console.log('getting entities')
          return inp
        });
        //var all_values = [];

        //if entities/values are lists, make them lists (they default to being strings)
        entities = entities.split(' ');
        values = values.split(' ');
        var entities_sorted = []
        if (typeof(entities) == 'string'){
          entities = [entities]
        }
        if (typeof(values) == 'string'){
          values = [values]
        }
          for (i=0;i<entities.length;i++){
            //create entities if they do not exist
            if (all_entities.indexOf(entities[i]) == -1){
              ext.make_entity(entities[i],function(){
                console.log('making entity')
                return 'test'
              })
            }

            /*//get all the possible values for the entity
            url_t = 'https://api.wit.ai/entities/';
            url_t += entities[i];
            url_t += '?v=20170307';
            $.ajax({
              url: url_t,
              data: {
                'access_token' : token
              },
              dataType: 'jsonp',
              method: 'GET',
              success: function(response) {
                  console.log("all values:", response);
                  output = [];
                  for (i = 0; i < response['values'].length;i++){
                    output.push(response['values'][i]['value'])
                    all_values = output;
                  }
              }
            });

            if (all_values.indexOf(values[i]) == -1){
              url_t = proxy_address + 'entityval/';
              url_t += token;
              url_t += '/';
              url_t += entities[i];
              url_t += '/';
              url_t += values[i];

              url_t = encodeURI(url_t);

                $.ajax({
                  url: url_t,
                  method: 'POST',
                  success: function(response) {
                      console.log("success!", response);
                      callback();
                  }
                });
            }*/

            //add values and entities to input
            if (text.includes(values[i]) == true){
              start = text.indexOf(values[i]);
              end = text.indexOf(values[i]) + values[i].length - 1;
              entities_sorted.push({'entity':entities[i],'value':values[i], 'start':start, 'end':end})
            }
            else{
              entities_sorted.push({'entity':entities[i],'value':values[i]})
            }
          }
        /*catch(err){
          entities_sorted = [{"entity":entities,"value":values}]
        }*/
        entities_sorted = encodeURI(JSON.stringify(entities_sorted))

        //encode URI
        var message = encodeURI(text);
        message = message.replace('?', '%3F')

        //make the URL for the proxy server
        url_t = proxy_address + 'validate/';
        url_t += token;
        url_t += '/';
        url_t += message;
        url_t += '/';
        url_t += entities_sorted;

        $.ajax({
          url: url_t,
          method: 'POST',
          success: function(response) {
              console.log("success!", response);
              callback();
          }
        });
    };

    ext.make_entity = function(entity, callback){
      console.log('is this thing on?')
      var url_t = proxy_address + 'entity/';
      url_t += token;
      url_t += '/';
      url_t += entity;
        $.ajax({
          url: url_t,
          method: 'POST',
          success: function(response) {
              console.log("success!", response);
              callback();
          }
        });
    };

    ext.make_value = function(entity, value, callback){
      var url_t = proxy_address + 'entityval/';
      url_t += token;
      url_t += '/';
      url_t += entity;
      url_t += '/';
      url_t += value;

      url_t = encodeURI(url_t);

        $.ajax({
          url: url_t,
          method: 'POST',
          success: function(response) {
              console.log("success!", response);
              callback();
          }
        });
    };


    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            /*['w', 'create new chatbot with name %s language %s and privacy %m.privacy', 'create_app','NewApp','en','false'],*/
            ['w', 'validate %s with entities %s for values %s','validate','Where are you?','intent','location_get'],
            /*['w', 'create entity named %s','make_entity','favorite_food'],
            ['w', 'for %s create value named %s','make_value','favorite_food', 'cake'],*/
            [' ', 'set token to %s','set_token','EZHSAUWDGL4QBPPGA65EIA6MHT5SLN5J'],
            ['R','number of entities','get_number_of_entities'],
            ['R', 'get %s for %s','get_response','intent','What is your name?'],
            ['R','get number of values for %s','get_number_of_values','intent'],
            ['R','for %s get value number %n','get_value_from_number','intent','0'],
            ['R','get entity number %n','get_entity_from_number','0']

        ],
        menus: {
            privacy: ['true','false']
        },
    };

    // Register the extension
    ScratchExtensions.register('Wit Chatbot', descriptor, ext);
})({});