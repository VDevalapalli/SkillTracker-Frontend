import { Observable, of } from 'rxjs';
import { Skillprofile, TechnicalSkill, NonTechnicalSkill } from './../model/skillprofile.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SkillProfileStorageService {

  skillprofiles: Skillprofile[] = [];
  result: boolean = true;

  technicalSkills: TechnicalSkill[] = [
    {skillName: 'HTML-CSS-JAVASCRIPT', expertiseLevel: 0},
    {skillName: 'ANGULAR', expertiseLevel: 0},
    {skillName: 'REACT', expertiseLevel: 0},
    {skillName: 'SPRING', expertiseLevel: 0},
    {skillName: 'RESTFUL', expertiseLevel: 0},
    {skillName: 'HIBERNATE', expertiseLevel: 0},
    {skillName: 'GIT', expertiseLevel: 0},
    {skillName: 'DOCKER', expertiseLevel: 0},
    {skillName: 'JENKINS', expertiseLevel: 0},
    {skillName: 'AWS', expertiseLevel: 0}

  ]

  nonTechnicalSkills: NonTechnicalSkill[] = [
    {skillName: 'SPOKEN', expertiseLevel: 0},
    {skillName: 'COMMUNICATION', expertiseLevel: 0},
    {skillName: 'APTITUDE', expertiseLevel: 0}
  ]

  constructor() { }


  public setSkillProfiles(skp: []) {

    if(this.skillprofiles.length > 0) {
      this.skillprofiles.splice(0);
    }

    if (skp.length === 0) {
      this.result = true;
    } else {
      this.result = false;
    }
    this.skillprofiles = skp;
  }

  public resetSkillProfiles() {
    if(this.skillprofiles.length > 0) {
      this.skillprofiles.splice(0);
      this.result = true;
    }
  }
}
