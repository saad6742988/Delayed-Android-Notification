const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.scheduleNotification = functions.pubsub
  .schedule('every day 09:00') // Schedule the function to trigger at the desired time
  .timeZone("UTC+5") // Set the time zone for scheduling
  .onRun(async (context) => {
    // Specify the topic to send the notification to
    const topic = 'your-topic';

    // Construct the FCM notification payload with the topic
    const payload = {
      notification: {
        title: 'Your Notification Title',
        body: 'Your Notification Body',
      },
      topic: topic,
    };

    // Send the notification using the Firebase Admin SDK
    await admin.messaging().send(payload);

    // Return a result or update a database if needed
    return null;
  });
