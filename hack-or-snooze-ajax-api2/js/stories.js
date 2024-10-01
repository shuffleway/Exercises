"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */
async function getAndShowStoriesOnStart() {
  $storiesLoadingMsg.remove();
  if (currentUser) {
    await putStoriesOnPage();
  }
}

async function putStoriesOnPage() {
  storyList = await StoryList.getStories();
  $allStoriesList.empty();

  const favoriteStory = currentUser?.favorites;
  for (let story of storyList) {
    const myStoryMarkup = generateStoryMarkup(story);
    myStoryMarkup.find(".fa-trash").hide();

    const isFavorite = favoriteStory?.some(
      (favStory) => favStory.storyId === story.storyId
    );
    if (isFavorite) {
      myStoryMarkup.find(".fa-star").toggleClass("checked");
      $allStoriesList.append(myStoryMarkup);
    } else {
      $allStoriesList.append(myStoryMarkup);
    }
  }
  $allStoriesList.show();
  await favoriteStories();
}

async function favoriteStories() {
  const favoriteStories = document.querySelectorAll("#all-stories-list li");
  favoriteStories.forEach((story) => {
    const star = story.querySelector(".fa-star");
    star?.addEventListener("click", async function (e) {
      const isStarChecked = star.classList.toggle("checked");
      const storyId = story.id;
      if (isStarChecked) {
        currentUser.favorites = await StoryList.addFavoriteStory(storyId);
      } else {
        currentUser.favorites = await StoryList.deleteFavoriteStory(storyId);
      }
    });
  });
}

/**Get and show favorite stories from the Server, generate their HTML table with star-active */
async function getAndShowFavoriteStories() {
  const favoriteStory = currentUser?.favorites;
  $allFavoriteList.empty();

  if (favoriteStory.length == 0) $allFavoriteList.text("No Favorite Stories");

  if (favoriteStory) {
    for (let story of favoriteStory) {
      const myStoryMarkup = generateStoryMarkup(story);
      myStoryMarkup.find(".fa-trash").hide();
      myStoryMarkup.find(".fa-star").toggleClass("checked");
      $allFavoriteList.append(myStoryMarkup);
    }
  }
  $allFavoriteList.show();
  await removeFavoriteStory();
}

/**Select from favorite story menu, add or delete favorite stories from the server */
async function removeFavoriteStory() {
  const favoriteStories = document.querySelectorAll("#all-favorite-list li");
  favoriteStories.forEach((story) => {
    const star = story.querySelector(".fa-star");
    star?.addEventListener("click", async function (e) {
      const isStarChecked = star.classList.toggle("checked");
      const storyId = story.id;
      if (isStarChecked) {
        currentUser.favorites = await StoryList.addFavoriteStory(storyId);
      } else {
        currentUser.favorites = await StoryList.deleteFavoriteStory(storyId);
      }
    });
  });
}

/** Handle submit Story */
async function submitStory(evt) {
  evt.preventDefault();

  const author = $("#author").val();
  const title = $("#story-title").val();
  const storyUrl = $("#story-url").val();

  const story = await StoryList.addStory(currentUser, {
    title: title,
    author: author,
    storyUrl: storyUrl,
  });

  if (story) {
    await putStoriesOnPage();
    $submitStoryForm.trigger("reset");
    $submitStoryForm.hide(500);
  }
}
$submitStoryForm.on("submit", submitStory);

async function getAndShowMyStories() {
  $myStoriesList.empty();
  const myStoryList = await StoryList.getMyStories();
  const favoriteStory = currentUser?.favorites;

  if (myStoryList.length == 0)
    $myStoriesList.text("No stories added by user yet!");

  if (myStoryList) {
    for (let story of myStoryList) {
      const myStoryMarkup = generateStoryMarkup(story);

      const isFavorite = favoriteStory.some(
        (favStory) => favStory.storyId === story.storyId
      );

      if (isFavorite) {
        myStoryMarkup.find(".fa-star").toggleClass("checked");
        $myStoriesList.append(myStoryMarkup);
      } else {
        $myStoriesList.append(myStoryMarkup);
      }
      $myStoriesList.show();
    }
  }

  await updateMyStories();
}

async function updateMyStories() {
  const myStories = document.querySelectorAll("#my-stories-list li");
  myStories.forEach((story) => {
    const star = story.querySelector(".fa-star");
    const trash = story.querySelector(".fa-trash");
    const storyId = story.id;

    trash.addEventListener("click", async function (e) {
      await StoryList.deleteMyStory(storyId);
      currentUser.favorites = await StoryList.getFavoriteStories(); //update favorite stories
      await getAndShowMyStories();
    });

    star.addEventListener("click", async function (e) {
      const isStarChecked = star.classList.toggle("checked");
      if (isStarChecked) {
        currentUser.favorites = await StoryList.addFavoriteStory(storyId);
      } else {
        currentUser.favorites = await StoryList.deleteFavoriteStory(storyId);
      }
    });
  });
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  const hostName = story.getHostName();
  // ternary operator => <true or false> ? when true : when false
  return $(`
      <li id="${story.storyId}">
      ${currentUser ? '<span id = "star" class="fa fa-trash"></span>' : ""}
      ${currentUser ? '<span id = "star" class="fa fa-star"></span>' : ""}
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
 `);
}
