const { MongoClient } = require('mongodb');
const { Twilio } = require('twilio');

// Replace these with your Twilio credentials
const accountSid = 'AC27e180599c5826193cf81f65adc3fc3e';
const authToken = '0c17ae274217f78349f28c6580909d30';
const twilioPhoneNumber = '+12192688493';

// Replace these with your MongoDB connection string and database/collection names
const mongodbUri = 'mongodb+srv://rithin:rithin123@cluster0.rty1bg1.mongodb.net/website?retryWrites=true&w=majority';
const dbName = 'website';
const collectionName = 'users';

// Create a Twilio client
const twilioClient = new Twilio(accountSid, authToken);

// Function to send SMS
async function sendSMS(phoneNumber, message) {
  try {
    await twilioClient.messages.create({
      body: message,
      from: twilioPhoneNumber,
      to: phoneNumber,
    });
    console.log(`SMS sent to ${phoneNumber}`);
  } catch (error) {
    console.error(`Error sending SMS to ${phoneNumber}: ${error.message}`);
  }
}

// Connect to MongoDB and send SMS to each number in the collection
async function main() {
  const client = new MongoClient(mongodbUri);
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    console.log("connected");

    const phoneNumbers = await collection.distinct('number');
    for (const phoneNumber of phoneNumbers) {
      const message = 'Dear College Compass User, This message is to notify that " FIRST PHASE ALLOTMENT " has been published.';
      await sendSMS(phoneNumber, message);
    }
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  } finally {
    client.close();
  }
}

main();
