import { InMemoryDbService, ResponseOptions } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const todos = [
      {
        'id': 1,
        'state': true,
        'title': '1 : List my TODOs',
        'description': 'As a user I would like to list my current todos'
      },
      {
        'id': 2,
        'state': true,
        'title': '2 : Change a TODO state',
        'description': 'As a user I would like to change a todo state by checking a "box"'
      },
      {
        'id': 3,
        'state': false,
        'title': '3 : Detail a TODO',
        'description': `As a user I would like to display one of my todo in a separate or dedicated view.
This todo will contain its title and a description (which is a new information not shown in the previous view).`
      },
      {
        'id': 4,
        'state': false,
        'title': '4 : Add a new TODO',
        'description': `As a user I would like to add a new todo in my list`
      }
    ];
    return { todos };
  }

  responseInterceptor(resOptions: ResponseOptions, reqInfo: RequestInfo) {
    console.log('[Mock API RequestInfo]', reqInfo);
    console.log('[Mock API response]', resOptions);
    return resOptions;
  }
}
