import { HttpErrorResponse } from '@angular/common/http';
import { Skillprofile } from './../model/skillprofile.model';
import { Observable, retry, throwError, catchError } from 'rxjs';
import { AuthStorageService } from './auth-storage.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { COMMAND_URLS, QUERY_URLS } from '../constants/api-url.const';

@Injectable({
  providedIn: 'root'
})
export class SkillProfileService {
  // QUERY_API = 'http://localhost:8082/skill-tracker/query';
  // COMMAND_API = 'http://localhost:8081/skill-tracker/api/v1/engineer';

  constructor(private router: Router, private httpClient: HttpClient, private authStorageService: AuthStorageService) { }

  public addSkillProfile(skillProfile: Skillprofile): Observable<any> {
    console.log(skillProfile)
    return this.httpClient.post(COMMAND_URLS.ADD_PROFILE, skillProfile);
  }

  public updateSkillProfile(skillProfile: Skillprofile): Observable<any> {
    console.log(skillProfile)
    console.log(skillProfile.profileId);
    let profileId = skillProfile.profileId;
    let updateProfileRequest = {
      technicalSkills: skillProfile.technicalSkills,
      nonTechnicalSkills: skillProfile.nonTechnicalSkills
    }

    console.log(updateProfileRequest);
    return this.httpClient.put(COMMAND_URLS.UPDATE_PROFILE + '/' + profileId, {updateProfileRequest});
  }

  getSkillProfile(associateId: any): Observable<any> {
    console.log(associateId);

    return this.httpClient.get(QUERY_URLS.SEARCH_SKILLS + '/ASSOCIATE_ID/' + associateId);
  }

  searchProfiles(searchCriteria: any): Observable<any> {
    console.log(searchCriteria);

    return this.httpClient.get(QUERY_URLS.SEARCH_SKILLS + '/'+ searchCriteria.criteria + '/' + searchCriteria.criteriaValue);
  }
}
