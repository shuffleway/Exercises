"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  checkForRememberedUser();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */
function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  $allStoriesList.hide();
  $loginForm.show();
  $signupForm.show();
}
$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */
function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $navbarMenu.show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}

//Update Nav menu on logout
function updateNavOnLogOut() {
  console.debug("updateNavOnLogin");
  $navLogOut.hide();
  $navbarMenu.hide();
  $navLogin.show();
  $navUserProfile.text("");
}

//Update when submit menu is clicked
function navSubmitStory(evt) {
  hidePageComponents();
  $submitStoryForm.show();
  putStoriesOnPage();
}
$("#nav-submit").on("click", navSubmitStory);

//Update when favorite menu is clicked
function navFavorites(evt) {
  hidePageComponents();
  getAndShowFavoriteStories();
}
$("#nav-favorite").on("click", navFavorites);

//Update when My stories menu is clicked
function navMyStories() {
  hidePageComponents();
  $allStoriesList.hide();
  $myStoriesList.show();
  getAndShowMyStories();
}

$("#nav-myStories").on("click", navMyStories);

//Show user profile 
function navUserProfile() {
  hidePageComponents();
  $allStoriesList.hide();
  $userProfile.show();
  displayUserProfile();
}
$navUserProfile.on("click", navUserProfile);
