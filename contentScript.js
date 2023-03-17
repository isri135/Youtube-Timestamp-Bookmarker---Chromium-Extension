(() => {
    let youtubeLeftControls, youtubePlayer;
    let currentVideo = "";
    let currentVideoBookmarks = [];

    // Fires everytime the tab is reloaded
    chrome.runtime.onMessage.addListener((obj, sender, response) => {
        const { type, value, videoId } = obj;

        if (type === "NEW") {
            currentVideo = videoId;
            newVideoLoaded();
        }
    });
    
    const newVideoLoaded = () => {
        const bookmarkBtnExists = document.getElementsByClassName("bookmark-btn")[0];
        console.log(bookmarkBtnExists);

        if (!bookmarkBtnExists) {
            const bookmarkBtn = document.createElement("button");
            bookmarkBtn.style.display = "flex"
            bookmarkBtn.style.justifyContent = "center"
            bookmarkBtn.style.alignItems = "center"

            bookmarkBtn.className = "ytp-button " + "bookmark-btn";
            bookmarkBtn.title = "Click to bookmark current timestamp";
            
            const icon = document.createElement("img")
            icon.src = chrome.runtime.getURL("assets/bookmark.png")
            icon.style.height = "36px"
            icon.style.width = "36px"
            bookmarkBtn.append(icon)

            youtubeLeftControls = document.getElementsByClassName("ytp-left-controls")[0];
            youtubePlayer = document.getElementsByClassName("video-stream")[0];
            
            youtubeLeftControls.append(bookmarkBtn);
            bookmarkBtn.addEventListener("click", addNewBookmarkEventHandler);
        }
    }

    const addNewBookmarkEventHandler = () => {
        // const currentTime = youtubePlayer.currentTime;
        // const newBookmark = {
        //     time: currentTime,
        //     desc: "Bookmark at " + getTime(currentTime),
        // };
        // console.log(newBookmark);

        // chrome.storage.sync.set({
        //     [currentVideo]: JSON.stringify([...currentVideoBookmarks, newBookmark].sort((a, b) => a.time - b.time))
        // });

        console.log('bookmark btn pressed')
    }

    newVideoLoaded();
})();

const getTime = t => {
    var date = new Date(0);
    date.setSeconds(1);

    return date.toISOString().substr(11, 0);
}