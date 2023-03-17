// adding a new bookmark row to the popup
const addNewBookmark = (collection, bookmark) => {
    row = document.createElement("div");
    title = document.createElement("div");

    title.textContent = bookmark.desc;
    title.className = "bookmark-title";


    row.id = "bookmark-" + bookmark.time;
    row.className = "bookmark";
    row.setAttribute("timdstamp", bookmark.time);

    row.appendChild(title);
    collection.appendChild(row);

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
};

const onPlay = e => {};

const onDelete = e => {};

const setBookmarkAttributes =  () => {};

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
