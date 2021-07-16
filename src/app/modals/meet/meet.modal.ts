import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from 'src/app/core/services/api/profile.service';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
    selector: 'meet-modal',
    templateUrl: 'meet.modal.html',
    styleUrls: ['meet.modal.less'],
    providers: [DatePipe]
})
export class MeetModal implements OnInit {
    public data: any;
    public timesArr = [
        { name: '09:00' },
        { name: '10:00' },
        { name: '11:00' },
        { name: '12:00' },
        { name: '13:00' },
        { name: '14:00' },
        { name: '15:00' },
        { name: '16:00' },
        { name: '17:00' },
        { name: '18:00' },
        { name: '19:00' }];
    public ru: any;
    public meetGroup: FormGroup;
    constructor(
        private datePipe: DatePipe,
        private fb: FormBuilder,
        private profileService: ProfileService,
        private messageService: MessageService) {
    }
    ngOnInit() {
        this.data = JSON.parse(localStorage.getItem('client'));
        this.ru = {
            firstDayOfWeek: 1,
            dayNames: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
            dayNamesShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
            dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
            monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август',
                'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
            monthNamesShort: ['Янв', 'Фев', 'Март', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
            today: 'Сегодня',
            clear: 'Clear',
            dateFormat: 'dd.mm.yy',
            weekHeader: 'Wk'
        };
        this._setValidation();
    }

    private _setValidation() {
        this.meetGroup = this.fb.group({
            phone: [null, Validators.required],
            date: [null, Validators.required],
            time: [null, Validators.required],
        });
        this._setValue();
    }
    private _setValue() {
        if (this.data && this.data.client) {
            this.meetGroup.patchValue({
                phone: this.data.client.phone
            });
        }
    }
    private _showSuccess(): void {
        this.messageService.add({ key: 'success', severity: '', detail: 'Спасибо за обращение, мы свяжемся с вами в ближайшее время' });
    }
    public makeMeet() {
        if (this.meetGroup.valid) {
            this.meetGroup.value.date = this.datePipe.transform(this.meetGroup.value.date, 'dd.MM.yyyy');
            this.profileService.askQuestion({
                type: 'set_meetup',
                phone: this.meetGroup.value.phone,
                date: this.meetGroup.value.date,
                time: this.meetGroup.value.time.name
            }).subscribe(() => {
                this.meetGroup.reset();
                this._setValue();
                this._showSuccess();
            });
        }
    }

    public closeModal() {
        if (this.meetGroup.touched) {
            setTimeout(() => {
                this.meetGroup.reset();
                this._setValue();
            }, 500);
        }
    }
}
