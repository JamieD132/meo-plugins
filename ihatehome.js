setInterval(() => {
  meoHome = document.getElementById("main");
  messages = meoHome.getElementsByClassName("posts")[0];
  messages.innerHTML = "<h1>You have home off</h1>";
}, 2000);
