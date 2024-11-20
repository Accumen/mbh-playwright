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
use: {
    //baseURL: "qa.mybloodhealth.com",
    headless: true, //"false" runs with a visible UI
    screenshot: "on", // takes a screenshot (options are "on", "off", "only-on-failure")
    video:"on", // takes a video  (options are "on", "on first retry", "retain-on-failure", "retry-with-video")
    launchOptions: { // tells it to perform the steps in a slow manner
        slowMo: 1000
    }
},
//workers: ,
retries: 0, //this will retry to run the test automatically 2x if the test fails the first time
reporter: [["dot"], ["json", { //This tells it to run reports
    outputFolder:'test-results',
    outputFile: "test-results.json" // where to put the output
}],["html"]]
};

export default config;
