export class Skillprofile {
  profileId!: number;

  profileName!: string;

  associateId!: string;

  mobile!: string;

  email!: string;

  technicalSkills: TechnicalSkill[] = [];

  nonTechnicalSkills: NonTechnicalSkill[] = [];
}

export class TechnicalSkill {
  skillName!: string;

  expertiseLevel!: number;
}

export class NonTechnicalSkill {
  skillName!: string;

  expertiseLevel!: number;
}
