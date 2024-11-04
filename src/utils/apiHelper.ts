import {JobPayloadType} from "../types/customTypes";
import {APIRequestContext} from "@playwright/test";
import {apiEndPoints} from "./constants.ts";
import credentials from "./credentials.ts";
import {UserData} from "./interfaces.ts";

class ApiHelper{
    private apiContext: APIRequestContext;
    private csrfToken: string = '';
    private sessionId: string = '';
    private token: string = '';

    constructor(apiContext: APIRequestContext) {
        this.apiContext = apiContext
    }

    private async setToken(){
        const response = await this.apiContext.post(
            `${credentials.baseUrl}${apiEndPoints.login}`,
            {
                data: {
                    "email": credentials.userName,
                    "password" : credentials.userPassword
                },
                headers: {
                    'Referrer-Policy': 'same-origin'
                }

            }
            )
        if (response.status() !== 200) {
            throw new Error(
                `Error creating new job. Endpoint ${apiEndPoints.createNewJob} returned: ${response.status()}`,
            );
        }

        const headers = response.headersArray();
        this.csrfToken = headers.find(header => header.name === 'Set-Cookie' && header.value.includes('csrftoken'))?.value.split(';')[0].split('=')[1]!;
        this.sessionId = headers.find(header => header.name === 'Set-Cookie' && header.value.includes('sessionid'))?.value.split(';')[0].split('=')[1]!;
        this.token = ((await response.json()) as UserData).access;

    }



    async createNewJob(payload: JobPayloadType){
       await this.setToken();

        const response = await this.apiContext.post(`${credentials.baseUrl}${apiEndPoints.createNewJob}`, {
            data: payload,
            headers: {
                'Authorization': `Bearer ${this.token}`,
                'Referrer-Policy': 'same-origin',
                'Cookie': `csrftoken=${this.csrfToken}; sessionid=${this.sessionId}`
            }
        });
        if (response.status() !== 201) {
            throw new Error(
                `Error creating new job. Endpoint ${apiEndPoints.createNewJob} returned: ${response.status()}`,
            );
        }
        console.log(`@@@@@@@@@@@@@@@@${await response.json()}`)
        return response.json();


    }

    async deleteJob(jobId: string) {
        const response = await this.apiContext.delete(`${credentials.baseUrl}/api/v1/jobs/${jobId}/?timezone=Asia%2FKarachi`,{
            headers: {
                'Authorization': `Bearer ${this.token}`,
                'Referrer-Policy': 'same-origin',
                'Cookie': `csrftoken=${this.csrfToken}; sessionid=${this.sessionId}`
            }
        });
        if (response.status() !== 200) {
            throw new Error(
                `Error deleting job. Endpoint ${apiEndPoints.createNewJob} returned: ${response.status()}`,
            );
        }
    }
}
export default ApiHelper;
