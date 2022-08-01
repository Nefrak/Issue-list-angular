import { Component, OnInit } from '@angular/core';
import { Issue } from './issue';
import { IssueService } from 'src/app/services/issue.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.css']
})
export class IssueComponent implements OnInit {
  title: string;
  issue$: Observable<Issue>;
  issue: Issue = {} as Issue;
  selectedId?: number;

  constructor(private restService : IssueService, private router : Router, private route : ActivatedRoute) {
    this.title = "Expense Entry";
    this.issue$ = this.route.paramMap.pipe(
      switchMap(params => {
         this.selectedId = Number(params.get('id'));
         return this.restService.getIssue(this.selectedId); }));
    this.issue$.subscribe( (data) => this.issue = data );
  }

  ngOnInit(): void {
  }

  goToList() {
    this.router.navigate(['/expenses']);
 }

}
