(() => {
    let youtubeLeftControls, youtubePlayer;
    let currentVideo = "";
    let currentVideoBookmarks = [];

    const fetchBookmarks = () => {
        return new Promise((resolve) => {
            chrome.storage.sync.get(currentVideo, (obj) => {
                resolve(obj[currentVideo] ? JSON.parse(obj[currentVideo]): []);
            });
        });
    }
    
    const newVideoLoaded = async () => { // Added async
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

        currentVideoBookmarks = await fetchBookmarks(); // Added
    }

    const addNewBookmarkEventHandler = async () => {
        const currentTime = youtubePlayer.currentTime;
        const newBookmark = {
            time: currentTime,
            desc: "Bookmark at " + getTime(currentTime),
        };

        currentVideoBookmarks = await fetchBookmarks();

        chrome.storage.sync.set({
            [currentVideo]: JSON.stringify([...currentVideoBookmarks, newBookmark].sort((a, b) => a.time - b.time))
        });

        console.log([...currentVideoBookmarks, newBookmark])
    }

    // Fires everytime the tab is reloaded
    chrome.runtime.onMessage.addListener((obj, sender, response) => {
        const { type, value, videoId } = obj;

        if (type === "NEW") {
            currentVideo = videoId;
            newVideoLoaded();
        }
    });

    newVideoLoaded();
})();

const getTime = t => {
    var date = new Date(0);
    date.setSeconds(t);
    return date.toISOString().substr(11, 8);
}