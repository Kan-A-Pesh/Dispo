(() => {
    const getMobileOperatingSystem = () => {
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;
        if (/windows phone/i.test(userAgent)) { return "Windows Phone"; }
        if (/android/i.test(userAgent)) { return "Android"; }
        if (/iPad|iPhone|iPod/.test(userAgent)) { return "iOS"; }
        return "unknown";
    }

    let os = getMobileOperatingSystem();
    if (os == "iOS") document.querySelectorAll("#androidDownloadBtn").forEach(e => {e.style.display = "none";});
    if (os == "Android") document.querySelectorAll("#iosDownloadBtn").forEach(e => {e.style.display = "none";});

})();