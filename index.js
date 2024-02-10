const express = require('express')
const app = express()
const axios = require('axios');



app.post('/sendTimedNotification', async (req, res) => {

    //const title = req.query.title  // it will be used when you passed the title in my case I am passing Event
    //const msg = req.query.msg    // it will be used when passed the message
    const event = req.query.event
    const delay = req.query.delay
    console.log(delay)
    setTimeout(() => {

        if (sendNotification(event)) {
            res.status(200).json({ message: ' send notification' });
        }
        else {
            res.status(500).json({ error: 'Failed to send notification' });
        }

    }, delay)

});

app.get('/', async (req, res) => {
    res.send("<h1>It is Server to send Timed FCM Notification</h1>")
});

const sendNotification = async (event) => {
    try {
        const serverKey = 'YOUR_SERVER_KEY_FROM_FCM';
        const notification = {
            title: event,
            body: 'This Event is going to Start Soon',
        };
        var body = {
            to: "/topics/All",
            notification: notification,
            "data":
            {
                "activity_name": "MainActivity",
                "channel_id": "Timed Notification"
            }
        };
        const topic = 'All';

        const response = await axios.post(
            'https://fcm.googleapis.com/fcm/send', body,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `key=${serverKey}`,
                }
            }
        );

        console.log('Notification sent successfully');
        console.log('Response:', response.data);
        return true;


    } catch (error) {
        console.error('Error sending notification:', error.data);
        return false;

    }
};



app.listen(process.env.PORT || 8000, () => { console.log('Started Listening') })
