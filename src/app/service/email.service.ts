import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private apiUrl = 'https://dhrrx5mfy2.execute-api.ap-east-1.amazonaws.com/default/api/v1/email/send';

  constructor(private http: HttpClient) {}

  sendEmail(formData: any): Observable<any> {
    const emailData = {
      path: "/api/v1/email/send",
  httpMethod: "POST",
  multiValueHeaders: {
    "Content-Type": ["application/json"]
  },
  requestContext: {
    identity: {
      user: null
    }
  },
  body: "{\"name\":\""+formData.fullName+"\",\"email\":\""+formData.emailAddress+"\",\"message\":\""+formData.message+"\"}"
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4200'
    });

    return this.http.post(this.apiUrl, emailData, {headers});
  }
}
