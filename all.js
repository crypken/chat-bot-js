//==============================================================//
const chatSettingsJson = localStorage.getItem('chatSettings');
let settingsData = chatSettingsJson !== null ? JSON.parse(chatSettingsJson) : {};
//==============================================================//
{/* <script type="text/javascript"> */}
(function(d, m){
    var chatbotConfig = 
        {"appId":"64508c2c6cd2f54d5ea50a35","popupWidget":true,"automaticChatOpenOnNavigation":true};
    var s = document.createElement("script"); s.type = "text/javascript"; s.async = true;
    // s.src = "https://djk7sae3przs1.cloudfront.net/cdn-js/chat.js";
    s.src = "./chat.js";
    var h = document.getElementsByTagName("head")[0]; h.appendChild(s);
    window.crypken = m; m._globals = chatbotConfig;
})(document, window.crypken || {});
{/* </script> */}
//==============================================================//
//==============================================================//
//==============================================================//
//==============================================================//
//==============================================================//
//==============================================================//
//==============================================================//