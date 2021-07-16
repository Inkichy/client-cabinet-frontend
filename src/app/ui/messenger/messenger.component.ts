import {
  Component,
  OnInit,
  AfterViewInit,
  EventEmitter,
  ViewChild,
  ViewChildren,
  ElementRef,
  QueryList,
  Output,
} from '@angular/core';
import { MessagesService } from '../../core/services/api/messages.service';
import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { interval, Subscription, Observable } from 'rxjs';
import { exhaustMap } from 'rxjs/operators';

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.less'],
})
export class MessengerComponent implements OnInit, AfterViewInit {
  constructor(
    private messagesService: MessagesService,
    private scrollToService: ScrollToService
  ) {}

  @ViewChild('chat', { static: true }) chatRef: ElementRef;
  @ViewChild('formText', { static: false }) textRef: ElementRef;
  @ViewChild('chat_content', { static: false }) chatContentRef: ElementRef;
  @ViewChildren('listItems') listItems: QueryList<any>;

  @Output() setMessenger = new EventEmitter();
  messageContent: FormGroup;
  chatStatus = 'hidden';

  subscription: Subscription;
  newMessages: any = [];
  messageId = '0';
  date: string = moment().locale('ru').format('L');
  same = false;
  newMessage = false;
  messagesLength = 0;

  ngOnInit() {
    this.getNewMessages();
    this.messageContent = new FormGroup({
      // messageFile: new FormControl(null),
      text: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.pattern(/^[0-9a-zA-Zа-яА-ЯёЁ.-?!)(,:_+=@#$%&*><?]+/),
      ]),
    });
  }

  ngAfterViewInit() {
    this.listItems.changes.subscribe(() => {
      this.scrollChat();
    });
  }
  toggleChat(): void {
    this.chatRef.nativeElement.classList.toggle('active');
    this.scrollChat();
    this.chatStatus = 'shown';
  }

  getNewMessages() {
    this.subscription = interval(5000)
      .pipe(
        exhaustMap(() => this.messagesService.checkNewMessages(this.messageId))
      )
      .subscribe(
        (message) => {
          this.setMessenger.emit({ messenger: true });
          const messagesLengthCurrent = message.messages.length;
          if (messagesLengthCurrent) {
            this.messageId = message.messages[0].id;
            this.newMessages = message.messages.concat(this.newMessages);
          }
          this.newMessages.map((item: any) => {
            if (
              moment(item.dateCreate).locale('ru').format('L') === this.date
            ) {
              item.dateCreateStr = 'Сегодня';
              return item;
            }
            item.dateCreateStr = moment(item.dateCreate)
              .locale('ru')
              .format('dddd L');
            return item;
          });
          this.checkMessageDate();

          if (messagesLengthCurrent && message.messages[0].author === 'a') {
            this.newMessage = true;
          }
        },
        (error) => {
          return false;
        }
      );
  }
  checkMessageDate() {
    let previous = moment(
      this.newMessages[this.newMessages.length - 1].dateCreate
    ).format('L');
    for (let i = this.newMessages.length - 1; i >= 0; i--) {
      const current = moment(this.newMessages[i].dateCreate).format('L');

      if (i >= 0) {
        if (previous === current) {
          this.newMessages[i] = Object.assign(this.newMessages[i], {
            same: true,
          });
        } else {
          this.newMessages[i] = Object.assign(this.newMessages[i], {
            same: false,
          });
        }
      } else {
        this.newMessages[i] = Object.assign(this.newMessages[i], {
          same: false,
        });
      }

      previous = moment(this.newMessages[i].dateCreate).format('L');
    }
  }

  sendMessage() {
    const textValue = this.messageContent.get('text').value;

    if (this.messageContent.valid) {
      this.messageContent.patchValue({ text: textValue.trim() });

      this.messagesService
        .sendMessage({ ...this.messageContent.value })
        .subscribe(
          (response) => {
            this.getNewMessages();
          },
          (error) => {
            return false;
          }
        );
      this.messageContent.reset();
      this.newMessage = false;
    }
  }
  handleKeyupEnter(event) {
    if (event.code === 'Enter') {
      event.preventDefault();
      this.sendMessage();
    }
  }

  scrollChat(): void {
    this.chatContentRef.nativeElement.scrollTo({
      left: 0,
      top: this.chatContentRef.nativeElement.scrollHeight,
      behavior: 'smooth',
    });
  }
}
