# scratchx_wit_extension
An extension for Scratch utilizing the wit.ai api.

DOCUMENTATION
Getting started -- Currently there is no way to create a wit app in the extension. Instead, one must be created using the wit.ai web interface. After this has been done, use the set token block and the access token from said interface to access the app.

Blocks
set token -- Used to connect to a wit app other than the default one. Token can be found under the setting page of the wit web interface
all entities -- Lists all entities currently being used by a chatbot. 
get ENTITY for STATEMENT -- Returns the value for an entity found by the wit app for a statement
get all values -- Lists all the values an entity can take
validate -- Used to train the wit chatbot. Entities can be supplied either as strings or lists. For lists, entities and values must be in matching order.
create entity -- creates an entity with the supplied name

QUESTIONS

PROGRESS
The main issue with creating this extension is that the wit api cannot be used directly from a website for commands other than GET due to cross-domain errors. This problem was circumvented by using a proxy server to execute said commands.
