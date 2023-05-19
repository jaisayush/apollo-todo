import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'apollo-todo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Todo';
  isDataLoading = false;
  private serverURL = 'http://localhost:5000';
  // private readonly graphQLURL: string = 'http://localhost:3000';
  todos: { _id: string; task: string; createdAt: Date }[] = [];

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.getTodo();
  }

  getTodo() {
    this.isDataLoading = true;
    this.httpClient.get(this.serverURL + '/todos').subscribe((data: any) => {
      this.todos = data;
      this.isDataLoading = false;
    });
  }

  deleteTodo(id: string): void {
    this.isDataLoading = true;
    this.httpClient
      .post(this.serverURL + '/deleteTodos/' + id, {})
      .subscribe((data: any) => {
        this.isDataLoading = false;
        this.getTodo();
      });
  }

  createTodo(task: string) {
    const payload = {
      task: task,
    };
    this.isDataLoading = true;
    this.httpClient
      .post(this.serverURL + '/createTodo', payload, {})
      .subscribe((data: any) => {
        if (data.isSuccess) {
          this.isDataLoading = false;
          this.getTodo();
        }
      });
  }
}
