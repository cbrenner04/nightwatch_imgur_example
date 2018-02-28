require('dotenv').load();

module.exports = {
  'post image': function(browser) {
    var homePage = browser.page.home_page();
    var signInPage = browser.page.sign_in_page();
    var uploadModal = homePage.section.uploadModal;
    var postPage = browser.page.post_page();

    homePage
      .navigate();

    // this is not strictly necessary; the test will pass without it
    if (process.env.IMGUR_USERNAME && process.env.IMGUR_PASSWORD) {
      homePage
        .click('@signInButton');
      signInPage
        .setValue('@username', process.env.IMGUR_USERNAME)
        .setValue('@password', process.env.IMGUR_PASSWORD)
        .click('@submit');
    }

    homePage
      .click('@uploadButton');

    // Firefox hack. Need to make the input visible to send the image path
    browser.execute(function(data) {
      document.getElementById('global-files-button').className='';
    });

    uploadModal
      .setValue('@fileUploadInput', process.env.IMAGE_PATH);

    postPage
      // wait for post to complete (this can take awhile for Firefox)
      .waitForElementVisible('@publishPost', 10000)
      // console.log url of post for later clean up
      .getValue('@postUrl', function(result) {
        console.log('You can find your image here: ' + result.value)
      });

    postPage.expect.element('@postTitleInput').to.be.visible;

    browser.end();
  },

  'search': function(browser) {
    var homePage = browser.page.home_page();
    var searchSection = homePage.section.searchContainer;
    var resultsPage = browser.page.results_page();

    homePage
      .navigate();

    searchSection
      .click('@searchIcon')
      .setValue(
        '@searchInput',
        ['Chewbacca getting groomed', browser.Keys.RETURN]
      );

    resultsPage
      .waitForElementVisible('@searchSentence', 1000);

    resultsPage.expect.element('@firstResult').to.be.visible;

    browser.end();
  },

  'random mode': function(browser) {
    var homePage = browser.page.home_page();
    var randomPage = browser.page.random_page();

    homePage
      .navigate()
      .click('@randomButton');

    randomPage.expect.element('@postContainer').to.be.visible;

    browser.end();
  }
};
