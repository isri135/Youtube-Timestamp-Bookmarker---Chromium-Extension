// adding a new bookmark row to the popup
const addNewBookmark = (collection, bookmark) => {
    const row = document.createElement("div");
    const title = document.createElement("div");
    const controlParentElement = document.createElement("div");

    title.textContent = bookmark.desc;
    title.className = "bookmark-title";
    controlParentElement.className = "bookmark-controls";

    setBookmarkAttributes("play", onPlay, controlParentElement);
    setBookmarkAttributes("delete", onDelete, controlParentElement);

    row.id = "bookmark-" + bookmark.time;
    row.className = "bookmark";
    row.setAttribute("timestamp", bookmark.time);

    row.appendChild(title);
    row.appendChild(controlParentElement);
    collection.appendChild(row);

    console.log('here')
};

const viewBookmarks = (currentVideoBookmarks=[]) => {
    const bookmarkCollection = document.getElementById("bookmarks");
    bookmarkCollection.innerHTML = "";

    if (currentVideoBookmarks.length > 0) {
        // Producing the elements in currentVideoBookmarks in order
        for (let i = 0; i < currentVideoBookmarks.length; i++) {
            const bookmark = currentVideoBookmarks[i];
            addNewBookmark(bookmarkCollection, bookmark)
        }
    } else {
        bookmarkCollection.innerHTML = '<i class="row">No bookmarks to display</i>'
    }

    return;
};

const onPlay = async e => {
    const bookmarkTime = e.target.parentNode.parentNode.getAttribute("timestamp");
    const activeTab = await getActiveTabURL();

    chrome.tabs.sendMessage(activeTab.id, {
        type:  "PLAY",
        value: bookmarkTime,
    })
};

const onDelete = async e => {
    const activeTab = await getActiveTabURL();
    const bookmarkTime = e.target.parentNode.parentNode.getAttribute("timestamp");
    const bookmarkElementToDelete = document.getElementById("bookmark-" + bookmarkTime);

    bookmarkElementToDelete.parentNode.removeChild(bookmarkElementToDelete);

    chrome.tabs.sendMessage(activeTab.id, {
        type: "DELETE",
        value: bookmarkTime,
    }, viewBookmarks);
};


const setBookmarkAttributes = (src, eventListener, controlParentElement) => {
    const controlElement = document.createElement("button");
    controlElement.src = "assets/" + src + ".png"
    controlElement.title = src;
    controlElement.addEventListener("click", eventListener);
    controlParentElement.appendChild(controlElement);

};

async function getActiveTabURL() {
    let queryOptions = { active: true, currentWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
  }


document.addEventListener("DOMContentLoaded", async () => {
    const activeTab = await getActiveTabURL();
    const queryParameters = activeTab.url.split("?")[1];
    const urlParameters = new URLSearchParams(queryParameters);

    const currentVideo = urlParameters.get("v");

    if (activeTab.url.includes("youtube.com/watch") && currentVideo) {
        chrome.storage.sync.get([currentVideo], (data) => {
            const currentVideoBookmarks = data[currentVideo] ? JSON.parse(data[currentVideo]): [];
            viewBookmarks(currentVideoBookmarks)
        })
    } else {
        const container = document.getElementsByClassName("container")[0];

        container.innerHTML = '<div class="title">This is not a youtube video page.</div>';
    }
});
