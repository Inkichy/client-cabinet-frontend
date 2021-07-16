
console.log("Service Worker Loaded...");

self.addEventListener("push", e => {
  const data = JSON.stringify(e.data);
  console.log("Push Recieved...", data);
  self.registration.showNotification(data.title, {
    body: data.body,
    icon: "/src/assets/images/main/logo_qbf.jpg",
    click_action: data.click_action,
    openURL: data.click_action
  });
});

