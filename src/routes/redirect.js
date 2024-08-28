const isMobile = window.innerWidth < 768;

const mobileURL = "m.조선타자기.com";
const desktopURL = "www.조선타자기.com";

if (isMobile) {
    if (window.location.hostname === mobileURL) {
        window.location.href = "http://" + mobileURL + window.location.pathname;
    }
} else {
    if(window.location.hostname === desktopURL) {
        window.location.href = "http://" + desktopURL + window.location.pathname;
    }
}