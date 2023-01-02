import { firebaseApp } from "../firebaseApp";

export class SendNotificationRepo {
  send(title: string, body: string, token: string) {
    let message = {
      android: {
        notification: { title, body },
      },
      token,
    };

    firebaseApp.send(message, (err: any) => {
      if (err) {
        console.log("Error sending notification: ", err)
      } else {
        console.log("Successfully sent notification");
      }
    });
  }
}
