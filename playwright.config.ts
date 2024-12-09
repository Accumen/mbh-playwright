import type { PlaywrightTestConfig} from '@playwright/test';
import { devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
    projects: [{
        name: "chrome",
        use: {
            ...devices['Desktop Chrome'],
            viewport: {width: 1920, height: 1080},
        }
    }, 
   
    ],
    testMatch: ["**/*.mbhpages.ts"] ,//file name we are running
    testDir: "./",
    fullyParallel: true,
use: {
    //baseURL: "qa.mybloodhealth.com",
    headless: false, //"false" runs with a visible UI
    screenshot: "on", // takes a screenshot (options are "on", "off", "only-on-failure")
    video:"on", // takes a video  (options are "on", "on first retry", "retain-on-failure", "retry-with-video")
    launchOptions: { // tells it to perform the steps in a slow manner
        slowMo: 1000
    }
},
workers: 2,
retries: 0, //this will retry to run the test automatically 2x if the test fails the first time
reporter: [["dot"], ["json", { //This tells it to run reports
}],["html"]]
    ouputFile: "jsonReports/jsonFile.json" // where to put the output
}],["html", {
    open: "never" // tells when to open the html report (options are "always", "never", and "on-failure")
}],
["junit", {outputFile: 'results.xml'}]]

};

export default config;
