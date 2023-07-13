import { TestBed } from '@angular/core/testing';

import { SkillProfileStorageService } from './skill-profile-storage.service';

describe('SkillProfileStorageService', () => {
  let service: SkillProfileStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SkillProfileStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
