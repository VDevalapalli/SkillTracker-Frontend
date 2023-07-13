import { SkillProfileStorageService } from './../../services/skill-profile-storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'search-profile-result',
  templateUrl: './search-profile-result.component.html',
  styleUrls: ['./search-profile-result.component.css']
})
export class SearchProfileResultComponent implements OnInit {

  constructor(public skillProfileStorageService: SkillProfileStorageService) { }

  ngOnInit(): void {
  }

}
