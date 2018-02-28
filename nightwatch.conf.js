require('dotenv').load();

module.exports = (function(settings) {
  settings.selenium.server_path = process.env.SELENIUM_SERVER_JAR_PATH;
  settings.selenium.cli_args["webdriver.chrome.driver"] = process.env.CHROMEDRIVER_PATH;
  settings.selenium.cli_args["webdriver.gecko.driver"] = process.env.GECKODRIVER_PATH;
  return settings;
})(require('./nightwatch.json'));
