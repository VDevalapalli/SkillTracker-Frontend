import { SkillProfileStorageService } from './../../services/skill-profile-storage.service';
import { Skillprofile } from './../../model/skillprofile.model';
import { SkillProfileService } from '../../services/skill-profile.service';
import { Skill } from './../../model/skill.model';
import { Observable, of } from 'rxjs';
import { startWith} from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'search-profile-input',
  templateUrl: './search-profile-input.component.html',
  styleUrls: ['./search-profile-input.component.css']
})
export class SearchProfileInputComponent implements OnInit {
  searchFormGroup: FormGroup;
  skills$!: Observable<Skill[]>
  criteria$!: Observable<string>;

  constructor(private fb: FormBuilder, private searchProfileService: SkillProfileService, private skillProfileStorageService: SkillProfileStorageService ) {
    this.searchFormGroup = this.build()
  }

  ngOnInit(): void {
    const {searchFormGroup} = this;
    const criteria = searchFormGroup.controls['criteria'];

    this.criteria$ = criteria.valueChanges.pipe(startWith(criteria.value));

    this.skills$ = this.skills();
  }

  build(): FormGroup {
    return new FormGroup({
      criteria: new FormControl('NAME', [Validators.required]),
      criteriaValue: new FormControl('', [Validators.required])
    });
  }

  skills(): Observable<Skill[]> {
    const skillsObj: Skill[] = [
      {skillId: '1', skillName: 'HTML-CSS-JAVASCRIPT'},
      {skillId: '2', skillName: 'ANGULAR'},
      {skillId: '3', skillName: 'REACT'},
      {skillId: '4', skillName: 'SPRING'},
      {skillId: '5', skillName: 'RESTFUL'},
      {skillId: '6', skillName: 'HIBERNATE'},
      {skillId: '7', skillName: 'GIT'},
      {skillId: '8', skillName: 'DOCKER'},
      {skillId: '9', skillName: 'JENKINS'},
      {skillId: '10', skillName: 'AWS'},
      {skillId: '11', skillName: 'SPOKEN'},
      {skillId: '12', skillName: 'COMMUNICATION'},
      {skillId: '13', skillName: 'APTITUDE'}
    ]

    //return this.http.get<Skill[]>(skillsApi);
    return of(skillsObj);
  }

  searchClick(): void {
    const {searchFormGroup} = this;
    console.log('search click');
    console.log(searchFormGroup.value);

    const criteria: string = this.searchFormGroup.controls['criteria'].value;
    console.log("criteria const: " + criteria);

    if(criteria === 'ASSOCIATE_ID') {

    }

    this.searchProfileService.searchProfiles(searchFormGroup.value).subscribe(
      (response: any) => {
        console.log("Response: " + response['profiles'].length);
        this.skillProfileStorageService.setSkillProfiles(response['profiles']);
      },
      (error) => {
        console.log(error);
      }
    )
  }

  resetForm(): void {
    const criteria: string = this.searchFormGroup.controls['criteria'].value;
    if(criteria === 'ASSOCIATE_ID') {
      this.searchFormGroup.controls['criteriaValue'].setValidators([Validators.required, Validators.pattern('^CTS[0-9]{5}$')]);
    } else if(criteria === 'NAME' || criteria === 'SKILL') {
      this.searchFormGroup.controls['criteriaValue'].setValidators([Validators.required]);
    } else {
      this.searchFormGroup.controls['licenseNo'].clearValidators();
    }
    this.searchFormGroup.controls['criteriaValue'].updateValueAndValidity();

    this.searchFormGroup.controls['criteriaValue'].reset();
    this.skillProfileStorageService.resetSkillProfiles();
  }

  get f() {
    return this.searchFormGroup.controls;
  }
}
