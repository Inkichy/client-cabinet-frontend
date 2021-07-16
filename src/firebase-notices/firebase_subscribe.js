
const publicVapidKey = 'BDqQEAmC7pbH0FsHQQY_R0R67FHTx2I7y7bFuNheUFgkvv3Yrc26ZD-gsAHsn5oYuaYqdgdwmtMltiSFiSfhJ6o';


  // Register SW, Register Push, Send Push
  export async function subscribeFCM() {
    // Register Service Worker
    console.log("Registering service worker...");
    const register = await navigator.serviceWorker.register("/firebase-messaging-sw.js", {
      scope: "/"
    });
    console.log("Service Worker Registered...");

    // Register Push
    console.log("Registering Push...");
    const subscription = await register.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    });

    sendTokenToServer(subscription);
    console.log("Push Registered...");

    // Send Push Notification
    console.log("Sending Push...");
    console.log("Push Sent...");
  }

  function sendTokenToServer(subscription) {
    if (!isTokenSentToServer(subscription)) {
        console.log('Sending token to server...');

        const tokenJSON = JSON.stringify({
          pushToken: subscription
        });

        // адрес скрипта на сервере который сохраняет ID устройства
        fetch('/api/cabinet/notices/subscribePush', {
          method: "POST",
          body: tokenJSON,
          headers: {
            "content-type": "application/json"
          }
        });
        setTokenSentToServer(JSON.stringify(subscription));
        console.log('Token sended successfully');
    } else {
        console.log('Token has been already sent to server');
    }
  }

  function setTokenSentToServer(currentToken) {
    window.localStorage.setItem(
        'sentFirebaseMessagingToken',
        currentToken ? currentToken : ''
    );
  }

  function isTokenSentToServer(subscription) {
    return JSON.parse(window.localStorage.getItem('sentFirebaseMessagingToken')) === subscription;
  }

  function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, "+")
      .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
