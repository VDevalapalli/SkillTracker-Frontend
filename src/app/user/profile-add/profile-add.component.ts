import { AuthStorageService } from './../../services/auth-storage.service';
import { SkillProfileStorageService } from './../../services/skill-profile-storage.service';
import { Skillprofile } from './../../model/skillprofile.model';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-add',
  templateUrl: './profile-add.component.html',
  styleUrls: ['./profile-add.component.css']
})
export class ProfileAddComponent implements OnInit {

  personalDetailsFormGroup!: FormGroup;

  technicalSkillsFormGroup = this._formBuilder.group({
    skillName: ['', Validators.required],
    expertiseLevel: ['', Validators.required]
  });
  nonTechnicalSkillsFormGroup = this._formBuilder.group({
    skillName: ['', Validators.required],
    expertiseLevel: ['', Validators.required]
  });
  isLinear = false;

  constructor(private _formBuilder: FormBuilder, public skillProfileStorageService: SkillProfileStorageService, private authStorage: AuthStorageService) { }

  ngOnInit(): void {
    let userInfo = this.authStorage.getAuthenticatedUser();
    const associateId = 'CTS' + userInfo.userInfoId;

    this.personalDetailsFormGroup = this._formBuilder.group({
      profileName: [userInfo.firstName + ' ' + userInfo.lastName, [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
      email: [userInfo.emailId, [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]]
    });
  }

  fetchTechnicalSkills() {
    console.log(this.personalDetailsFormGroup.value)
    console.log(this.skillProfileStorageService.technicalSkills);
    console.log(this.skillProfileStorageService.nonTechnicalSkills);
  }

  get pd() {
    return this.personalDetailsFormGroup.controls;
  }

  get ts() {
    return this.technicalSkillsFormGroup.controls;
  }

  get nts() {
    return this.nonTechnicalSkillsFormGroup.controls;
  }
}
