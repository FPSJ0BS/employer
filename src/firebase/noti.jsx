import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import ReactNotificationComponent from "./firebaseCall";
import { onMessageListener } from "./firebaseinit";

const FirebaseNoti = () => {

    const [show, setShow] = useState(false);
    const [notification, setNotification] = useState({ title: "", body: "" });

    onMessageListener().then((payload) => {
        setShow(true);
        setNotification({
            title: payload.notification.title,
            body: payload.notification.body,
        });
        setShow(false);
    }).catch((error) => console.log(error));

    return (
        <>
            {
                show ? (
                    <ReactNotificationComponent
                        title={notification.title}
                        body={notification.body}
                    />
                ) : (
                    <></>
                )
            }
        </>
    )
}

export default FirebaseNoti;
