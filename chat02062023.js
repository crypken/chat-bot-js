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
                if (response.responseCode == '1') { settings = response.data } else { alert("Error: Please contact Admin"); }
            }).catch(error => { alert("Error: Please contact Admin") });
    }
    await getCustomizationByIdData()
    let chabot_icon_integration = () => {
        const t = document.createElement("div");
        t.innerHTML = `<div style='
                            display:flex;
                            z-index: 99999;
                            background:${settings.themeColor};
                           position: fixed;
                            place-items: center;
                            cursor: pointer;
                            transition: all 0.3s ease-in-out;  
                            bottom: ${settings.chatButtonAlignment == 'cpk-widget-position-bottom-left' ? settings.chatButtonBottomSpacing * 2 + 'px' : settings.chatButtonAlignment == 'cpk-widget-position-bottom-right' ? settings.chatButtonBottomSpacing * 2 + 'px' : ''};
                            left: ${settings.chatButtonAlignment == 'cpk-widget-position-bottom-left' ? settings.chatButtonSideSpacing * 2 + 'px' : ''};
                            right:${settings.chatButtonAlignment == 'cpk-widget-position-bottom-right' ? settings.chatButtonSideSpacing * 2 + 'px' : ''};
                            padding: 6px;
                            margin: 3px;
                            color: #ffff;                      
                            ${settings.chatButton == "chat-button1" ?
                "border-radius: 34px;padding: 6px"
                :
                settings.chatButton == "chat-button2" ?
                    "border-radius: 34px;padding: 6px"
                    :
                    settings.chatButton == "chat-button3" ?
                        "border-radius: 8px; padding: 6px;"
                        :
                        settings.chatButton == "chat-button4" ?
                            "border-radius: 8px;padding: 6px;"
                            :
                            settings.chatButton == "chat-button5" ?
                                "border-top-left-radius: 20px; border-top-right-radius: 20px;border-bottom-left-radius: 20px;padding: 6px;"
                                :
                                settings.chatButton == "chat-button6" ?
                                    "border-top-left-radius: 20px; border-top-right-radius: 20px;border-bottom-left-radius: 20px;padding: 6px;"
                                    : ""
            }'>
            <span id='close-chatbot-iocn' style="font-size:26px;">
            ${settings.chatButton == "chat-button1" ? "" :
            settings.chatButton == "chat-button3" ? "" :
                settings.chatButton == "chat-button5" ? "" : settings.agentOnlineText
            }<img id='close-chatbot-iocn' src="${settings.iconImage}" width="30px" height="30px" style="margin:0px 0 -7px 0"/> 
            </span>
            <span id='open-chatbot-iocn' style="font-size:26px;color: white;padding: 0px 0px !important;display:none;">
             ${settings.chatButton == "chat-button1" ? "" :
                settings.chatButton == "chat-button3" ? "" :
                    settings.chatButton == "chat-button5" ? "" : settings.agentOnlineText  
                }<img id='open-chatbot-iocn' src="https://c-chatbot-bucket.s3.ap-southeast-1.amazonaws.com/static-assets/icons/cpk-close-icon.svg" width="30px" height="30px" style="margin:0px 0 -7px 0;"/>
            </span>
                                          
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
            document.getElementById("close-chatbot-iocn").style.cssText = "display: none;color: white;font-size:26px;padding: 0px 4px !important;",
            document.getElementById("open-chatbot-iocn").style.cssText = "display: block;color: white;font-size:26px;padding: 0px 4px !important;"
    }, document.getElementById("open-chatbot-iocn").onclick = function () {
        document.getElementById("chatbot-iframe").style.cssText = "display:none",
            document.getElementById("open-chatbot-iocn").style.cssText = "display: none;color: white;font-size:26px;padding: 0px 4px !important;",
            document.getElementById("close-chatbot-iocn").style.cssText = "display: block;color: white;font-size:26px;;padding: 0px 4px !important;"
    };
}

initial()