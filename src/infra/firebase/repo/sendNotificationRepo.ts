import { firebaseApp } from "../firebaseApp";

export class SendNotificationRepo {
  send() {
    let message = {
      android: {
        notification: {
          title: "title",
          body: "body",
        },
      },
      token: "",
    };

    firebaseApp.send(message, function (err: any, resp: any) {
      if (err) {
        throw err;
      } else {
        console.log("Successfully sent notification");
      }
    });
  }
}
