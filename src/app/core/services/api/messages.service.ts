import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {ApiService} from './api.service';
import { TimeInterval } from 'rxjs/internal/operators/timeInterval';


@Injectable({
  providedIn: 'root',
})
export class MessagesService extends ApiService {

    private years: Observable<number[]>;
    private allMessages: [] = [];
    newMEssages =  new BehaviorSubject(null);
    isNewMessagesSubject: BehaviorSubject<boolean> = new BehaviorSubject(null);

    constructor(protected http: HttpClient) {
        super(http);
    }

    // getMessagesYears(): Observable<number[]> {
    //     if (!this.years) {
    //         this.years =  this.http.get<number[]>(this.getSwaggerUrl('cabinet/messages-years'));
    //     }

    //     return this.years;
    // }


    // getMessages(id: string): Observable<Array<any>> {
    //     this.isNewMessagesSubject.next(false);
    //     if (!this.allMessages.hasOwnProperty(year)) {
    //         this.allMessages[year] = this.http.post<any>(this.getApiUrl('cabinet/messages/checkNewMessages'), {id});
    //     }
    //     return this.allMessages[year];
    // }


    sendMessage(text: object) {
      return this.http.post<any>(this.getApiUrl('cabinet/messages/sendMessage'), text);
    }

    checkNewMessages(id: string) {
      return this.http.post<any>(this.getApiUrl('cabinet/messages/checkNewMessages'), {id});
    }



}
