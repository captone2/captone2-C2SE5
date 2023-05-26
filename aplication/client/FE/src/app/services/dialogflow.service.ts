import { Injectable } from '@angular/core';
import * as dialogflow from 'dialogflow';

@Injectable({
  providedIn: 'root'
})
export class DialogflowService {
  private sessionClient: any;
  private projectId: string;
  private credentials: any;

  constructor() {}

  initialize(projectId: string, credentialsPath: string) {
    this.projectId = projectId;
    this.credentials = require(credentialsPath);
    this.sessionClient = new dialogflow.SessionsClient({ projectId: this.projectId, credentials: this.credentials });
  }

  async sendMessage(message: string): Promise<string> {
    const sessionPath = this.sessionClient.sessionPath(this.projectId, 'your-session-id');
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: message,
          languageCode: 'en-US'
        }
      }
    };

    const responses = await this.sessionClient.detectIntent(request);
    const result = responses[0].queryResult;
    return result.fulfillmentText;
  }
}
