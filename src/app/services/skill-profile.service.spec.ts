import { TestBed } from '@angular/core/testing';

import { SkillProfileService } from './skill-profile.service';

describe('SkillProfileService', () => {
  let service: SkillProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SkillProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
