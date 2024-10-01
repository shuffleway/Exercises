"use strict";

const BASE_URL = "https://hack-or-snooze-v3.herokuapp.com";

/******************************************************************************
 * Story: a single story in the system
 */

class Story {
  /** Make instance of Story from data object about story:
   *   - {title, author, url, username, storyId, createdAt}
   */

  constructor({ storyId, title, author, url, username, createdAt }) {
    this.storyId = storyId;
    this.title = title;
    this.author = author;
    this.url = url;
    this.username = username;
    this.createdAt = createdAt;
  }

  /** Parses hostname out of URL and returns it. */
  getHostName() {
    const url = new URL(this.url);
    return url.hostname;
  }
}

/******************************************************************************
 * List of Story instances: used by UI to show story lists in DOM.
 */

class StoryList {
  constructor(stories) {
    this.stories = stories;
  }

  /** Generate a new StoryList. It:
   *
   *  - calls the API
   *  - builds an array of Story instances
   *  - makes a single StoryList instance out of that
   *  - returns the StoryList instance.
   */

  static async getStories() {
    try {
      // Note presence of `static` keyword: this indicates that getStories is
      //  **not** an instance method. Rather, it is a method that is called on the
      //  class directly. Why doesn't it make sense for getStories to be an
      //  instance method?

      // query the /stories endpoint (no auth required)
      const {data} = await axios({
        url: `${BASE_URL}/stories`,
        method: "GET",
      });

     

      // build an instance of our own class using the new array of stories
      return new StoryList(data.stories.map((story) => new Story(story))).stories;
    } catch (error) {
      console.error("Error getting Stories", error.message)
      return null;
    }
  }

  /** Adds story data to API, makes a Story instance, adds it to story list.
   * - user - the current instance of User who will post the story
   * - obj of {title, author, url}
   *
   * Returns the new Story instance
   */

  /* user, newStory */

  static async addStory(user, newStory) {
    try {
      const token = user.loginToken;
      const story = {
        token,
        story: {
          author: newStory.author,
          title: newStory.title,
          url: newStory.storyUrl,
        },
      };
      const res = await axios.post(`${BASE_URL}/stories`, story);

      const storyInstance = new Story({
        storyId: res.data.story.storyId,
        title: res.data.story.title,
        author: res.data.story.author,
        url: res.data.story.url,
        username: res.data.story.username,
        createdAt: res.data.story.createdAt,
      });

      return storyInstance;
    } catch (error) {
      $("#error-submit-story").text("Error adding a new Story");
      console.error("Error: ", error);
      return null;
    }
  }

  static async addFavoriteStory(storyId) {
    try {
       if(currentUser){
        const {data} = await axios.post(
          `${BASE_URL}/users/${currentUser.username}/favorites/${storyId}`,
          { token: currentUser.loginToken }
        );  
        return new StoryList(data.user.favorites.map((story) => new Story(story))).stories;
       }
    } catch (error) {
      console.error("Error adding favorite story", error.message)
      return null;
    }
  }

  static async deleteFavoriteStory(storyId) {
    try {
      if(currentUser){
        const {data} = await axios.delete(
          `${BASE_URL}/users/${currentUser.username}/favorites/${storyId}`,
          { params: { token: currentUser.loginToken } }
        );
        return new StoryList(data.user.favorites.map((story) => new Story(story))).stories;
      }
    } catch (error) {
      console.error("Error deleting favorite story", error.message);
      return null;
    }
  }

  static async getFavoriteStories() {
    try {
      if(currentUser){
        const {data}= await axios.get(
          `${BASE_URL}/users/${currentUser.username}`,
          { params: { token: currentUser.loginToken } }
        );
        return new StoryList(data.user.favorites.map((story) => new Story(story))).stories;
      }
    } catch (error) {
      console.error("Error getting favorite Stories", error.message);
    }
  }

  static async getMyStories() {
    try {
      const {data} = await axios.get(
        `${BASE_URL}/users/${currentUser.username}`,
        { params: { token: currentUser.loginToken } }
      );
      return new StoryList(data.user.stories.map((story) => new Story(story))).stories;
    } catch (error) {
      console.error("Error getting user stories", error.message);
      return null;
    }
  }

  static async deleteMyStory(storyId) {
    try {
      const {data} = await axios.delete(`${BASE_URL}/stories/${storyId}`, {
        params: { token: currentUser.loginToken },
      });
      
      return new Story(data.story);

    } catch (error) {
      console.error("Error deleting story", error.message);
      return null;
    }
  }
}

/******************************************************************************
 * User: a user in the system (only used to represent the current user)
 */

class User {
  /** Make user instance from obj of user data and a token:
   *   - {username, name, createdAt, favorites[], ownStories[]}
   *   - token
   */

  constructor({ username, name, createdAt, favorites = [], ownStories = [] }, token) {

    this.username = username;
    this.name = name;
    this.createdAt = createdAt;

    // instantiate Story instances for the user's favorites and ownStories
    this.favorites = favorites.map((s) => new Story(s));
    this.ownStories = ownStories.map((s) => new Story(s));

    // store the login token on the user so it's easy to find for API calls.
    this.loginToken = token;
  }

  /** Register new user in API, make User instance & return it.
   *
   * - username: a new username
   * - password: a new password
   * - name: the user's full name
   */

  static async signup(username, password, name) {
    try {
      const {data} = await axios({
        url: `${BASE_URL}/signup`,
        method: "POST",
        data: { user: { username, password, name } },
      });

      let { user } = data;

      return new User(
        {
          username: user.username,
          name: user.name,
          createdAt: user.createdAt,
          favorites: user.favorites,
          ownStories: user.stories,
        },
        data.token
      );
    } catch (err) {
      $("#error-signup").text(`Error: ${err.response.data.error.message}`);
      return null;
    }
  }

  /** Login in user with API, make User instance & return it.

   * - username: an existing user's username
   * - password: an existing user's password
   */

  static async login(username, password) {
    try {
      const response = await axios({
        url: `${BASE_URL}/login`,
        method: "POST",
        data: { user: { username, password } },
      });

      let { user } = response.data;
      
      return new User(
        {
          username: user.username,
          name: user.name,
          createdAt: user.createdAt,
          favorites: user.favorites,
          ownStories: user.stories,
        },
        response.data.token
      );
    } catch (err) {
      $("#error-login").text(`Error: ${err.response.data.error.message}`);
      return null;
    }
  }

  /** When we already have credentials (token & username) for a user,
   *   we can log them in automatically. This function does that.
   */

  static async loginViaStoredCredentials(token, username) {
    try {
      const response = await axios({
        url: `${BASE_URL}/users/${username}`,
        method: "GET",
        params: { token },
      });

      let { user } = response.data;

      return new User(
        {
          username: user.username,
          name: user.name,
          createdAt: user.createdAt,
          favorites: user.favorites,
          ownStories: user.stories,
        },
        token
      );
    } catch (err) {
      console.error("loginViaStoredCredentials failed", err);
      return null;
    }
  }
}
