import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-notification-member',
  templateUrl: './notification-member.component.html',
  styleUrls: ['./notification-member.component.css']
})
export class NotificationMemberComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

}
