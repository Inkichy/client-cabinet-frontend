import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ProfileService } from 'src/app/core/services/api/profile.service';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
    selector: 'asked-question',
    templateUrl: 'asked-question.modal.html',
    styleUrls: ['asked-question.modal.less'],
    providers: [DatePipe]
})
export class AskedQuestionModal implements OnInit {
    @Input() public type;
    public data: any;
    public timesArr = [
        { name: '09:00' },
        { name: '19:00' },
        { name: '20:00' },
        { name: '21:00' },
        { name: '19:00' }];

    public questionGroup: FormGroup;

    constructor(private fb: FormBuilder,
                private profileService: ProfileService,
                private messageService: MessageService,
                private datePipe: DatePipe) {
    }

    ngOnInit() {
        this.data = JSON.parse(localStorage.getItem('client'));
        this._setValidation();
    }

    private _setValidation() {
        this.questionGroup = this.fb.group({
            phone: [null, Validators.required],
            email: [null, Validators.required],
            time: [null, Validators.required],
            question: [null, Validators.required]
        });
        this._setValue();
    }

    private _setValue() {
        if (this.data && this.data.client) {
            this.questionGroup.patchValue({
                email: this.data.client.email,
                phone: this.data.client.phone
            });
        }
    }

    private _showSuccess() {
        this.messageService.add({
            key: 'success',
            severity: '',
            detail: 'Спасибо за обращение, мы свяжемся с вами в ближайшее время'
        });
    }

    public sendQuestion() {
        if (this.questionGroup.valid) {
            this.questionGroup.value.time = this.datePipe.transform(this.questionGroup.value.time, 'HH:mm');
            this.profileService.askQuestion({
                type: this.type === 'support' ? 'support_question' : 'fin_advisor_question',
                phone: this.questionGroup.value.phone,
                time: this.questionGroup.value.time,
                email: this.questionGroup.value.email,
                question: this.questionGroup.value.question
            }).subscribe(() => {
                this.questionGroup.reset();
                this._setValue();
                this._showSuccess();
            });
        }
    }

    public closeModal() {
        if (this.questionGroup.touched) {
            setTimeout(() => {
                this.questionGroup.reset();
                this._setValue();
            }, 500);
        }
    }
}
