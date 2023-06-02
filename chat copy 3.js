//"https://chatbot-client-three.vercel.app?omegaOrgId="+window.crypken._globals.appId
//'http://localhost:3000?omegaOrgId='+window.crypken._globals.appId
let CPK_APP_BASE_URL = 'http://localhost:9090/graphql'
let CPK_APP_IFRAME_URL = 'http://localhost:3000?omegaOrgId=' + window.crypken._globals.appId
// let CPK_APP_IFRAME_URL = "https://chatbot-client-three.vercel.app?omegaOrgId="+window.crypken._globals.appId
var settings = {}

async function initial() {
    async function getCustomizationByIdData() {
        await fetch(CPK_APP_BASE_URL, {
            method: 'POST', headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify({
                "variables": { "input": { "_id": window.crypken._globals.appId } },
                "query": "query ($input: GetChatSettingsRequest) {\n  getChatSettings(input: $input) {\n    responseCode\n    data\n    __typename\n  }\n}"
            }),
        })
            .then((res) => res.json())
            .then((result) => {
                let response = result?.data?.getChatSettings;
                if (response.responseCode == '1') {
                    // localStorage.setItem("chatSettings", JSON.stringify(response.data));
                    settings = response.data
                } else {
                    // localStorage.setItem("chatSettings", '');
                    alert("Error: Please contact Admin");
                }
            })
            .catch(error => {
                // localStorage.setItem("chatSettings", '');
                alert("Error: Please contact Admin");
            });
    }
    await getCustomizationByIdData()

    console.log('==============================================');
    console.log('settings', settings);
    console.log('==============================================');
    var imported = document.createElement('link');
    imported.src = 'https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css',
        // imported.src = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
        imported.rel = "stylesheet",
        document.head.appendChild(imported);
    let chabot_icon_integration = () => {
        const t = document.createElement("div");
        // t.innerHTML = `<div style='position: fixed;bottom: 10px;right: 0px;z-index:99999;background:rgb(11 162 246);border-radius: 50%; padding: 0px;'>
        t.innerHTML = `<div style='z-index: 99999;
                            background:${settings.themeColor};
                            border-radius: 50%;
                            padding: 0px;
                            position: fixed;
                            width: 50px;
                            height: 50px;
                            display: grid;
                            place-items: center;
                            cursor: pointer;
                            transition: all 0.3s ease-in-out;
                           
                           
                            bottom: ${settings.chatButtonAlignment == 'cpk-widget-position-bottom-left' ? settings.chatButtonBottomSpacing*2 + 'px' : settings.chatButtonAlignment == 'cpk-widget-position-bottom-right' ? settings.chatButtonBottomSpacing*2 + 'px' : ''};
                            left: ${settings.chatButtonAlignment == 'cpk-widget-position-bottom-left' ? settings.chatButtonSideSpacing*2 + 'px' : ''};
                            right:${settings.chatButtonAlignment == 'cpk-widget-position-bottom-right' ? settings.chatButtonSideSpacing*2 + 'px' : ''};
                          
                        '>
                            <img id='close-chatbot-iocn' src="${settings.iconImage}" width="30px" height="30px"/>              
                            <img id='open-chatbot-iocn' src="https://c-chatbot-bucket.s3.ap-southeast-1.amazonaws.com/static-assets/icons/cpk-close-icon.svg" width="40px" height="40px" style='font-size:26px;color: white;padding: 0px 0px !important;display:none;'/>              
                       </div>`,
            document.body.appendChild(t)
    };
    chabot_icon_integration();
    let chatAppTemplateIntegration = () => {
        const t = document.createElement("div");
        t.innerHTML = `<div style='position: fixed;z-index:9999;
        bottom: ${settings.chatButtonAlignment == 'cpk-widget-position-bottom-left' ? settings.chatButtonBottomSpacing + 'px' : settings.chatButtonAlignment == 'cpk-widget-position-bottom-right' ? settings.chatButtonBottomSpacing + 'px' : ''};
        left: ${settings.chatButtonAlignment == 'cpk-widget-position-bottom-left' ? settings.chatButtonSideSpacing + 'px' : ''};
        right:${settings.chatButtonAlignment == 'cpk-widget-position-bottom-right' ? settings.chatButtonSideSpacing + 'px' : ''};
      
  
        '>
                            <iframe src='${CPK_APP_IFRAME_URL}' frameBorder='0' id=\"chatbot-iframe\" style="display: none;height: 570px;width: 500px;margin: 0 10px 0 0;;"/>
                     </div>`,
            document.body.appendChild(t)
    };
    chatAppTemplateIntegration(), document.getElementById("close-chatbot-iocn").onclick = function () {
        document.getElementById("chatbot-iframe").style.cssText = "display: block;height: 570px;width: 500px;margin: 0 10px 0 0;",
            document.getElementById("close-chatbot-iocn").style.cssText = "display: none;color: white;font-size:26px;",
            document.getElementById("open-chatbot-iocn").style.cssText = "display: block;color: white;font-size:26px;padding: 0px 4px !important;"
    }, document.getElementById("open-chatbot-iocn").onclick = function () {
        document.getElementById("chatbot-iframe").style.cssText = "display:none",
            document.getElementById("open-chatbot-iocn").style.cssText = "display: none;color: white;font-size:26px;padding: 0px 4px !important;",
            document.getElementById("close-chatbot-iocn").style.cssText = "display: block;color: white;font-size:26px;"
    };
}

initial()