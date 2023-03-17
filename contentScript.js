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
        var bookmarkBtn = document.getElementById("bookmark-btn");

        if (!bookmarkBtn) {
            bookmarkBtn = document.createElement("button");
            bookmarkBtn.id = "bookmark-btn";
            bookmarkBtn.className = "ytp-button";
            bookmarkBtn.title = "Bookmark current timestamp";

            bookmarkBtn.style.height = "48px"
            bookmarkBtn.style.width = "48px"
            bookmarkBtn.style.padding = "12px"
            bookmarkBtn.style.display = "flex"
            bookmarkBtn.style.justifyContent = "center"
            bookmarkBtn.style.alignItems = "center"
            bookmarkBtn.innerHTML = bookmarkSVG

            bookmarkBtn.addEventListener("click", addNewBookmarkEventHandler);

        }
        
        youtubeLeftControls = document.getElementsByClassName("ytp-left-controls")[0];
        youtubePlayer = document.getElementsByClassName("video-stream")[0];

        youtubeLeftControls.append(bookmarkBtn);
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
