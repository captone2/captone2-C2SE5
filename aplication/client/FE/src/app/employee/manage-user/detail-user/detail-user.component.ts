import { Component, OnInit } from '@angular/core';
import {Account} from '../../../shared/model/entity/Account';
import {ManagerUserService} from '../../../services/manager-user.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {AccountMemberDTO} from '../../../shared/model/dto/AccountMemberDTO';
import {JsogService} from 'jsog-typescript';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.css']
})
export class DetailUserComponent implements OnInit {

  idMembers: number;
  membersDetail: AccountMemberDTO;
  page: 1;

  constructor(private managerUserService: ManagerUserService, private jsogService: JsogService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      // tslint:disable-next-line:radix
      this.idMembers = parseInt(paramMap.get('id'));
      this.managerUserService.findByIdMember(this.idMembers).subscribe((data) => {
        // @ts-ignore
        this.membersDetail = this.jsogService.deserializeObject(data, Account);
      });
    });
  }
}
