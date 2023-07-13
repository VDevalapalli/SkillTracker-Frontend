import { catchError } from 'rxjs';
import { SkillProfileService } from './../../services/skill-profile.service';
import {
  TechnicalSkill,
  NonTechnicalSkill,
  Skillprofile,
} from './../../model/skillprofile.model';
import { AuthStorageService } from './../../services/auth-storage.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-skill-profile',
  templateUrl: './skill-profile.component.html',
  styleUrls: ['./skill-profile.component.css'],
})
export class SkillProfileComponent implements OnInit {
  skillProfileForm!: FormGroup;

  skillProfile!: Skillprofile;

  disableUser = '';
  disableSkill = '';
  success = false;
  update = false;

  techSkills: TechnicalSkill[] = [
    { skillName: 'HTML-CSS-JAVASCRIPT', expertiseLevel: 0 },
    { skillName: 'ANGULAR', expertiseLevel: 0 },
    { skillName: 'REACT', expertiseLevel: 0 },
    { skillName: 'SPRING', expertiseLevel: 0 },
    { skillName: 'RESTFUL', expertiseLevel: 0 },
    { skillName: 'HIBERNATE', expertiseLevel: 0 },
    { skillName: 'GIT', expertiseLevel: 0 },
    { skillName: 'DOCKER', expertiseLevel: 0 },
    { skillName: 'JENKINS', expertiseLevel: 0 },
    { skillName: 'AWS', expertiseLevel: 0 },
  ];

  nonTechSkills: NonTechnicalSkill[] = [
    { skillName: 'SPOKEN', expertiseLevel: 0 },
    { skillName: 'COMMUNICATION', expertiseLevel: 0 },
    { skillName: 'APTITUDE', expertiseLevel: 0 },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private authStorage: AuthStorageService,
    private skillProfileService: SkillProfileService,
    private snakBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const user = this.authStorage.getAuthenticatedUser();
    const associateId = 'CTS' + user.userInfoId;
    const userFullName = user.firstName + ', ' + user.lastName;

    //SkillProfile Form Initialization for Add
    this.skillProfileForm = this.formBuilder.group({
      profileId: this.formBuilder.control(''),
      profileName: this.formBuilder.control(userFullName, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(100),
      ]),
      associateId: this.formBuilder.control(associateId, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30),
        Validators.pattern('^CTS[0-9]{5}$'),
      ]),
      email: this.formBuilder.control(user.emailId, [
        Validators.required,
        Validators.email,
      ]),
      mobile: this.formBuilder.control('', [
        Validators.required,
        Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
      ]),
      technicalSkills: this.formBuilder.array(
        this.techSkills.map((obj) => this.formBuilder.group(obj))
      ),
      nonTechnicalSkills: this.formBuilder.array(
        this.nonTechSkills.map((obj) => this.formBuilder.group(obj))
      ),
    });

    //SkillProfile Form Initialization for Update
    this.skillProfileService.getSkillProfile(associateId).subscribe({
      next: (response) => {
        console.log(response);
        this.buildSkillProfileForm(response, user);
      },
      error: (e) => {
        console.log(e);
      },
      complete: () => {
        console.log(
          '******Loading Skill Profile Initialization Completed******'
        );
      },
    });
  }

  isProfileExists(response: any): boolean {
    let tempSkillProfiles: any[] = [];
    Object.assign(tempSkillProfiles, response['profiles']);
    return tempSkillProfiles.length > 0;
  }

  get technicalSkills() {
    return this.skillProfileForm.get('technicalSkills') as FormArray;
  }

  get nonTechnicalSkills() {
    return this.skillProfileForm.get('nonTechnicalSkills') as FormArray;
  }

  get f() {
    return this.skillProfileForm.controls;
  }

  buildSkillProfileForm(response: any, userInfo: any): any {
    let skillProfile: Skillprofile = new Skillprofile();
    let skillProfiles: any[] = [];
    Object.assign(skillProfiles, response['profiles']);
    console.log('skill profiles length: ' + skillProfiles.length);
    console.log('profileId:' + this.f['profileId'].value);
    let isProfileExist: boolean = skillProfiles.length > 0;

    if (isProfileExist) {
      Object.assign(skillProfiles, response['profiles']);
      skillProfile = skillProfiles[0];

      this.f['profileId'].setValue(skillProfile.profileId);
      this.f['profileName'].setValue(skillProfile.profileName);
      this.f['associateId'].setValue(skillProfile.associateId);
      this.f['email'].setValue(skillProfile.email);
      this.f['mobile'].setValue(skillProfile.mobile);
      this.f['technicalSkills'].setValue(skillProfile.technicalSkills);
      this.f['nonTechnicalSkills'].setValue(skillProfile.nonTechnicalSkills);
    }
  }

  saveSkillProfile() {
    console.log(this.skillProfileForm.invalid);
    console.log(this.skillProfileForm.value);

    const profId = this.f['profileId'].value;

    if (!profId && profId === '') {
      this.skillProfileService
        .addSkillProfile(this.skillProfileForm.value)
        .subscribe({
          next: (response) => {
            console.log(response);

            this.disableUser = 'disabled';
            this.disableSkill = 'disabled';
            this.success = true;
            this.openSnackBar('Skill Profile Added Successfully!', 'Close');
          },
          error: (e) => {
            console.error(e);
            this.openSnackBar(
              'There is a Problem in Saving Skill Profile',
              'Close'
            );
          },
          complete: () => console.info('complete'),
        });
    } else {
      this.skillProfileService
        .updateSkillProfile(this.skillProfileForm.value)
        .subscribe({
          next: (response) => {
            console.log('Skill Profile Updated Successfully');
            this.update = true;
            this.openSnackBar('Skill Profile Updated Successfully!', 'Close');
          },
          error: (e) => {
            console.log(e);
            this.openSnackBar(
              'There is a Problem in Updating Skill Profile',
              'Close'
            );
          },
        });

      this.disableUser = 'disabled';
      this.disableSkill = 'disabled';
    }
  }

  openSnackBar(message: string, action: string) {
    this.snakBar.open(message, action);
  }
}
