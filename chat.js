// GETTING ICON 
var imported = document.createElement('script');
imported.src = 'https://kit.fontawesome.com/a076d05399.js';
document.head.appendChild(imported);
// INITILISE CATBOT ICONs
let chabot_icon_integration = () => {
    const template = document.createElement('div');
    template.innerHTML = `<div style='position: fixed;bottom: 10px;right: 10px;z-index:9999;background:rgb(11 162 246);border-radius: 50%; padding: 13px;'>   
                            <i id='close-chatbot-iocn' class='fas fa-comment' style='font-size:26px;color: white;'></i>
                            <i id='open-chatbot-iocn' class="fas fa-times aaaqqq" style='font-size:26px;color: white;padding: 0px 4px !important;display:none;'></i>    
                        </div>`;
    document.body.appendChild(template);
}
chabot_icon_integration();

// INTAGRATING CHAT APPLICATION
let chatAppTemplateIntegration = () => {
    const chatAppTemplate = document.createElement('div');
    chatAppTemplate.innerHTML = `<div style='position: fixed;bottom: 51px;right: 0px;z-index:9999;'>
                                    <iframe src='https://chatbot-client-sigma.vercel.app/' frameBorder='0' id="abcd" style="display:none"/>
                                </div>`;
    document.body.appendChild(chatAppTemplate);
}
chatAppTemplateIntegration()

//ACTION OPEN CLOSE ICONs
document.getElementById("close-chatbot-iocn").onclick = function () {
    document.getElementById('abcd').style.cssText = 'display: block;height: 520px;    margin: 0 18px 18px 0;';
    document.getElementById('close-chatbot-iocn').style.cssText = 'display: none;color: white;font-size:26px;';
    document.getElementById('open-chatbot-iocn').style.cssText = 'display: block;color: white;font-size:26px;padding: 0px 4px !important;';
}
document.getElementById("open-chatbot-iocn").onclick = function () {
    document.getElementById('abcd').style.cssText = 'display:none';
    document.getElementById('open-chatbot-iocn').style.cssText = 'display: none;color: white;font-size:26px;padding: 0px 4px !important;';
    document.getElementById('close-chatbot-iocn').style.cssText = 'display: block;color: white;font-size:26px;';
}

//FETCH DYNAMIC DATAs
// let logJSONData = async () => {
//     console.log('==============================================');
//     console.log('V10N', 1111111111111);
//     console.log('==============================================');
//     const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
//     const jsonData = await response.json();
//     console.log(jsonData);
// }
// logJSONData()