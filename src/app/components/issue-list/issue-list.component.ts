import { Component, OnInit } from '@angular/core';
import { Issue } from '../issue/issue';
import { IssueService } from 'src/app/services/issue.service';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.css']
})
export class IssueListComponent implements OnInit {
  title: string;
  issueEntries: Issue[] = [];
  totalRecords: number | undefined;
  page: string | number | undefined = 1;
  filters: string[] = ['', 'open', 'closed'];
  filter: number = 0;

  constructor(private issueService: IssueService) {
    this.title = "Expense Issue List";
    this.getIssues();
    this.totalRecords = this.issueEntries.length;
  }

  ngOnInit() {
  }

  togleFilter() {
    this.filter++;
    this.filter = this.filter > 2 ? 0 : this.filter;
    this.getIssues();
  }

  // get issue and apply selected filter
  getIssues() {
    this.issueService.getIssues().subscribe( data => this.issueEntries = data.filter(s => s.state.includes(this.filters[this.filter])) );
  }

  sortData(sort: Sort) {
    const data = this.issueEntries.slice();

    this.issueEntries = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'Title':
          return this.compare(a.title, b.title, isAsc);
        case 'Comments':
          return this.compare(a.comments, b.comments, isAsc);
        case 'Number':
          return this.compare(a.issueNumber, b.issueNumber, isAsc);
        default:
          return 0;
      }
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

}
