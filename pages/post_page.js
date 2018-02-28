module.exports = {
  elements: {
    postTitleInput: {
      selector: ".//div[@id='upload-global']" +
                "//div[@class='post-title-container']" +
                "//h1[contains(@class, 'post-contenteditable')]",
      locateStrategy: 'xpath'
    },
    postUrl: '.copy-input',
    publishPost: '.post-options-publish',
  }
}
