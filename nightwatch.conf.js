
//require("nightwatch/bin/runner.js");
require('env2')('.env'); // optionally store your Evironment Variables in .env
const seleniumServer = require("selenium-server");
const chromedriver = require("chromedriver");
//const firefoxdriver = require("iedriver");
const edgedriver = require("edgedriver");
const PKG = require('./package.json'); // so we can get the version of the project
const SCREENSHOT_PATH = "./reports";
//System.setProperty("webdriver.chrome.driver","D:/List_of_Jar/chromedriver.exe");
// we use a nightwatch.conf.js file so we can include comments and helper functions
const config = {
  "src_folders": [
    "./test/e2e" // Where you are storing your Nightwatch e2e tests
  ],
  "output_folder": "../node_modules/nightwatch/reports", // reports (test outcome) output by nightwatch
  "custom_commands_path" : "",
  "custom_assertions_path" : "",
  "page_objects_path" : "",
  "globals_path" : "",

  "test_runner" : {
    "type" : "mocha",
    "options" : {
      "ui" : "bdd",
      "reporter" : "list"
    }
  },    
  "selenium": {
    "start_process": true, // tells nightwatch to start/stop the selenium process
    "server_path": "C:/Users/46767so/vscode/market-opportunities-app/selenium-server-standalone-2.53.1.jar",
    "host": "http://autotestgrid-temp.yell-devqaugc-aws.co.uk:4444/",
    "port": 4444, // standard selenium port

    "cli_args": {
      "webdriver.chrome.driver": "C:/Users/46767so/vscode/learn-nightwatch/node_modules/chromedriver/lib/chromedriver/chromedriver.exe",
      //"webdriver.firefox.driver":  "C:/Users/46767so/vscode/market-opportunities-app/node_modules/IEDriverServer_x64_3.4.0/IEDriverServer.exe",
      "webdriver.edge.driver": "C:/Users/46767so/vscode/learn-nightwatch/node_modules/edgedriver/lib/edgedriver/MicrosoftWebDriver.exe",
    }
  },

  "test_workers": {
    "enabled": true,
    "workers": "auto"
  }, // perform tests in parallel where possible
  "test_settings": {
    "default": {
      "launch_url": "http://ukdevgrads01:9000", // we're testing a Public or "staging" site on Saucelabs
      "selenium_port": 4444,
      "selenium_host": "http://autotestgrid-temp.yell-devqaugc-aws.co.uk:4444/",
      "silent": true,
      "screenshots": {
        "enabled": true, // if you want to keep screenshots
        "path": "./reports" // save screenshots here
      },

      // "username" : process.env.sophieket,     // if you want to use Saucelabs remember to
      // "access_key" : process.env.$0phisticatedg13l,

      "globals": {
        "waitForConditionTimeout": 10000 // sometimes internet is slow so wait.
      },
      // "desiredCapabilities": {
			// 	"tunnel-identifier": process.env.TRAVIS_JOB_NUMBER, // needed for sauce-connect, i.e for testing localhost on saucelabs
			//   build: `build-${process.env.TRAVIS_JOB_NUMBER}` // needed for sauce-connect
      // }
    },
      "desiredCapabilities": { // use Chrome as the default browser for tests
        "browserName": "chrome",
        "chromeOptions": {
          "args": [
            `Mozilla/5.0 (iPhone; CPU iPhone OS 5_0 like Mac OS X) AppleWebKit/534.46
            (KHTML, like Gecko) Version/5.1 Mobile/9A334 Safari/7534.48.3`,
            "--window-size=640,1136" // iphone 5
          ]
        },
        "javascriptEnabled": true,
        "acceptSslCerts": true
      }
    },
    "chrome": {
      "desiredCapabilities": {
        "browserName": "chrome",
        "javascriptEnabled": true,
        "acceptSslCerts": true
      }
    },
    
   "edge": {
    "desiredCapabilities": {
      platform: "Windows 10",
      browserName: "MicrosoftEdge",
      javascriptEnabled: true
    }
  },
    "chromemac": { // browsers used on saucelabs:
      "desiredCapabilities": {
        "browserName": "chrome",
        "platform": "OS X 10.11",
        "version": "47"
      }
    },
    "ie11": {
      "desiredCapabilities": {
        "browserName": "internet explorer",
        "platform": "Windows 10",
        "version": "11.0"
      }
    },
    "firefox": {
      "desiredCapabilities": {
        "platform": "XP",
        "browserName": "firefox",
        "version": "33"
      }
    },
    "internet_explorer_10": {
      "desiredCapabilities": {
        "platform": "Windows 7",
        "browserName": "internet explorer",
        "version": "10"
      }
    },
    "android_s4_emulator": {
      "desiredCapabilities": {
        "browserName": "android",
        "deviceOrientation": "portrait",
        "deviceName": "Samsung Galaxy S4 Emulator",
        "version": "4.4"
      }
    },
    "iphone_6_simulator": {
      "desiredCapabilities": {
        "browserName": "iPhone",
        "deviceOrientation": "portrait",
        "deviceName": "iPhone 6",
        "platform": "OSX 10.10",
        "version": "8.4"
      }
    }
  }
  
  module.exports = config;


function padLeft(count) { // theregister.co.uk/2016/03/23/npm_left_pad_chaos/
  return count < 10 ? '0' + count : count.toString();
}

var FILECOUNT = 0; // "global" screenshot file count
/**
 * The default is to save screenshots to the root of your project even though
 * there is a screenshots path in the config object above! ... so we need a
 * function that returns the correct path for storing our screenshots.
 * While we're at it, we are adding some meta-data to the filename, specifically
 * the Platform/Browser where the test was run and the test (file) name.
 */
function imgpath(browser) {
  var a = browser.options.desiredCapabilities;
  var meta = [a.platform];
  meta.push(a.browserName ? a.browserName : 'any');
  meta.push(a.version ? a.version : 'any');
  meta.push(a.name); // this is the test filename so always exists.
  var metadata = meta.join('~').toLowerCase().replace(/ /g, '');
  return SCREENSHOT_PATH + metadata + '_' + padLeft(FILECOUNT++) + '_';
}

module.exports.imgpath = imgpath;
module.exports.SCREENSHOT_PATH = SCREENSHOT_PATH;