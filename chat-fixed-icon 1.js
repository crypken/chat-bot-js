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
                            gap: 10px;
                            z-index: 99999;
                            background:${settings.themeColor};
                            position: fixed;
                            place-items: center;
                            cursor: pointer;
                            transition: all 0.3s ease-in-out;  
                            bottom: ${settings.chatButtonAlignment == 'cpk-widget-position-bottom-left' ? settings.chatButtonBottomSpacing * 2 + 'px' : settings.chatButtonAlignment == 'cpk-widget-position-bottom-right' ? settings.chatButtonBottomSpacing * 2 + 'px' : ''};
                            left: ${settings.chatButtonAlignment == 'cpk-widget-position-bottom-left' ? settings.chatButtonSideSpacing * 2 + 'px' : ''};
                            right:${settings.chatButtonAlignment == 'cpk-widget-position-bottom-right' ? settings.chatButtonSideSpacing * 2 + 'px' : ''};
                            padding: 10px;
                            margin: 3px;
                            color: #ffff;
                            user-select: none;
                            ${settings.chatButton == "chat-button1" ?
                "border-radius: 34px"
                :
                settings.chatButton == "chat-button2" ?
                    "border-radius: 34px"
                    :
                    settings.chatButton == "chat-button3" ?
                        "border-radius: 8px;"
                        :
                        settings.chatButton == "chat-button4" ?
                            "border-radius: 8px;"
                            :
                            settings.chatButton == "chat-button5" ?
                                "border-top-left-radius: 20px; border-top-right-radius: 20px;border-bottom-left-radius: 20px;"
                                :
                                settings.chatButton == "chat-button6" ?
                                    "border-top-left-radius: 20px; border-top-right-radius: 20px;border-bottom-left-radius: 20px;"
                                    : ""
            }'>
            <span id='close-chatbot-iocn' style="font-size:16px; display: flex;flex-direction: row;align-items: center;gap: 10px; padding: 3px">
            ${settings.chatButton == "chat-button1" ? "" :
            settings.chatButton == "chat-button3" ? "" :
                settings.chatButton == "chat-button5" ? "" : settings.agentOnlineText
            }<span style="width:20px;">${settings.iconImage}</span>
            </span>
            <span id='open-chatbot-iocn' style="font-size:16px;color: white;padding: 3px;display:none; gap:10px">
             ${settings.chatButton == "chat-button1" ? "" :
                settings.chatButton == "chat-button3" ? "" :
                    settings.chatButton == "chat-button5" ? "" : settings.agentOnlineText  
                }<svg width="20px" viewBox="0 0 24 24" fill="#000000" stroke="#000000" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Menu / Close_LG"> <path id="Vector" d="M21 21L12 12M12 12L3 3M12 12L21.0001 3M12 12L3 21.0001" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g></svg>
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
                            <iframe src='${CPK_APP_IFRAME_URL}' frameBorder='0' id=\"chatbot-iframe\" style="display: none;width: 500px;margin: 0 10px 0 0;;"/>
                     </div>`,
            document.body.appendChild(t)
    };
    chatAppTemplateIntegration(), document.getElementById("close-chatbot-iocn").onclick = function () {
        document.getElementById("chatbot-iframe").style.cssText = "display: block;height: 580px;max-height:calc(100vh - 100px);width: 500px; max-width:calc(100vw - 40px);margin: 0 10px 0 0;",
            document.getElementById("close-chatbot-iocn").style.cssText = "display: none;color: white;font-size:16px;padding: 3px !important;",
            document.getElementById("open-chatbot-iocn").style.cssText = "display: flex;flex-direction: row;align-items: center;gap: 10px;color: white;font-size:16px;padding: 3px !important;"
    }, document.getElementById("open-chatbot-iocn").onclick = function () {
        document.getElementById("chatbot-iframe").style.cssText = "display:none",
            document.getElementById("open-chatbot-iocn").style.cssText = "display: none;color: white;font-size:16px;padding: 3px !important;",
            document.getElementById("close-chatbot-iocn").style.cssText = "display: flex;flex-direction: row;align-items: center;gap: 10px;color: white;font-size:16px;;padding: 3px !important;"
    };
}

initial()