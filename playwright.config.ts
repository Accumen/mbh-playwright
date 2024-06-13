import type { PlaywrightTestConfig} from '@playwright/test';
import { devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
    projects: [{
        name: "chrome",
        use: {
            ...devices['Desktop Chrome']
        }
    }, 
   
    ],
//testMatch: ["mbhpatientschvisit.mbhpages.ts"] ,//file name we are running
use: {
    //baseURL: "qa.mybloodhealth.com",
    headless: true, //another way to make sure it runs with a UI
    screenshot: "on", // takes a screenshot (options are "on", "off", "only-on-failure")
    video:"on", // takes a video  (options are "on", "on first retry", "retain-on-failure", "retry-with-video")
    launchOptions: { // tells it to perform the steps in a slow manner
        slowMo: 1000
    }
    /*
    launchPersistentContext:{
        userDataDir: '/need data directory path',
        args:[
            '--disable-extensions-except=${path.join(_dirname, './my-extension')}',
            '--load-extension=$path.joi(_dirname, './my-extension')}'
        ]
    }*/
},
//workers: ,
retries: 0, //this will retry to run the test automatically 2x if the test fails the first time
reporter: [["dot"], ["json", { //This tells it to run reports
    ouputFile: "jsonReports/jsonFile.json" // where to put the output
}],["html", {
    open: "always" // tells when to open the html report (options are "always", "never", and "on-failure")
}]]

};

export default config;
