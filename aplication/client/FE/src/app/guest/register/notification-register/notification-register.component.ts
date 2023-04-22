import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-notification-register',
  templateUrl: './notification-register.component.html',
  styleUrls: ['./notification-register.component.css']
})
export class NotificationRegisterComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

  }

  ngOnInit(): void {
  }

}
