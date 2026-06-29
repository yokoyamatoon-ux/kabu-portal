let homepage = chrome.runtime.getManifest().homepage_url;
document.getElementById("drive").href = `${homepage}/drive-feature`;
document.getElementById("home").href = `${homepage}`;

const updateUrl = chrome.runtime.getManifest().update_url?.toLowerCase();
const id = chrome.runtime.id;

const storeUrl = (updateUrl && updateUrl.includes("microsoft")) ?
    `https://microsoftedge.microsoft.com/addons/detail/` + id :
    "https://chrome.google.com/webstore/detail/" + id;
document.getElementById("rate").href = storeUrl;