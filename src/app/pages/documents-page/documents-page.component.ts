import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import { NotificationsService } from '../../core/services/notifications.service';
import { Notification } from '../../core/models/notification.model';

declare let jQuery: any;

@Component({
  selector: 'app-documents-page',
  templateUrl: './documents-page.component.html',
  styleUrls: ['./documents-page.component.less']
})
export class DocumentsPageComponent implements OnInit {
  isSuccess: boolean;
  file: any;
  fileUrl: any;

  constructor(private activatedRoute: ActivatedRoute,
              private http: HttpClient,
              private notes: NotificationsService) { }

  closeTab() {
    const closeDocument = document.createElement('a');
    closeDocument.href = 'javascript:close();';
    closeDocument.click();
  }
  _base64ToArrayBuffer(base64) {
    const binaryString = window.atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
}

  ngOnInit() {
      // ParamMap parameters = {
        // download - will file be download of not
        // api_url - url for download file
        // filename - filename of result file
        // extension - extension of result file
        // type - type of blob object (usually 'application/pdf')
      // }

    this.activatedRoute.queryParamMap.subscribe(
        (data: ParamMap) => {
          let request: any;

          if(data.get('data')) {
            request = this.http.post(data.get('api_url'), data.get('data'), {responseType: 'blob'});
          } else {
            request = this.http.get(data.get('api_url'), {responseType: 'blob'})
          }

          if (data.get('download') === 'true') {
              request.subscribe(response => {
                this.file = new Blob([response], { type: data.get('type') });
                if (response) {
                  if (typeof(window.navigator.msSaveBlob) === 'function') {
                    window.navigator.msSaveBlob(this.file, data.get('filename') + data.get('extension'));
                  } else {
                    const a = document.createElement('a');
                    a.href = URL.createObjectURL(this.file);
                    a.download = data.get('filename') + data.get('extension');
                    a.click();
                    this.closeTab();
                  }
                } else {
                  this.notes.add(new Notification('Уважаемый клиент!', `Произошла ошибка. В данный момент файл недоступен.`));
                  this.closeTab();
                }
              }, error => {
                  this.notes.add(new Notification('Уважаемый клиент!', `Произошла ошибка. В данный момент файл недоступен.`));
                  this.closeTab();
              });
          } else {
            request.subscribe(response => {
              this.isSuccess = true;
              if (response) {
                  this.file = new Blob([response], { type: data.get('type') });
                  const reader = new FileReader();
                  reader.readAsDataURL(this.file); // конвертирует Blob в base64 и вызывает onload
                  reader.onload = () => {
                    const base64 = (reader.result as string).split(',')[1];
                    this.fileUrl = this._base64ToArrayBuffer(base64);
                  };
              } else {
                  this.notes.add(new Notification('Уважаемый клиент!', `Произошла ошибка. В данный момент файл недоступен.`));
                  this.closeTab();
              }
            },
            error => {
                this.notes.add(new Notification('Уважаемый клиент!', `Произошла ошибка. В данный момент файл недоступен.`));
                this.closeTab();
            });
          }
        }
    );
  }
}
