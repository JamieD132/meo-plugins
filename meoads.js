javascript:(function() {
  var a = document.createElement("div");
    a.innerHTML = `
<div style="position: fixed;bottom:0;left:0;right:0;display: flex;justify-content: center;align-items: center;">
    <iframe id="BetterAd" src="https://adservice.bettermeower.app/generate" style="border: medium; width: 728px; height: 90px; overflow: hidden;" scrolling="no"></iframe>
    <iframe id="BetterAd" src="https://adservice.bettermeower.app/generate" style="border: medium; width: 728px; height: 90px; overflow: hidden;" scrolling="no"></iframe>
</div>
    `
  document.body.appendChild(a);
})();

