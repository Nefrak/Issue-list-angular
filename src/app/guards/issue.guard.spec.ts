import { TestBed } from '@angular/core/testing';

import { IssueGuard } from './issue.guard';

describe('IssueGuard', () => {
  let guard: IssueGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IssueGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
