const { MongoClient } = require('mongodb');

// Connection URL
const url = `mongodb+srv://isma:Ismadaw1358@cluster0.tsjxr.mongodb.net/Node_test?retryWrites=true&w=majority`
const client = new MongoClient(url);

// Database Name
const dbName = 'Node_test';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const blogs = db.collection('blogs');

  const findResult = await blogs.find({}).toArray();
  console.log('Found documents =>', findResult);
  

  // the following code examples can be pasted here...

  return 'done.';
}



main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());