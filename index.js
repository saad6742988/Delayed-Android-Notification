const express = require('express')
const app = express()
const axios = require('axios');



app.post('/sendTimedNotification', async (req, res) => {

    const event = req.query.event
    const delay = req.query.delay
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
        const serverKey = 'AAAAQBhZjV0:APA91bHgDgXhzUXN16FUE5AFX2lE7HSe0qKk9BGiUOV2PlDhEEvAJvdeqVTVLkiQV_wFd2bs13pkkAe_gGHOcxa5WSZao_UzxYhLwiu6TlzoRPkTogPs7KOS8snBzAspKdpvJxHUKd9M';
        const notification = {
            title: event,
            body: 'This Event is going to Start in 10 minutes',
        };
        var body = {
            to: "/topics/All",
            notification: notification
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



app.listen(process.env.PORT || 8000, () => { console.log('listening express server from heroku') })