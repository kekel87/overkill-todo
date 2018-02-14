import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const todos = [
      {
        'id': '1',
        'state': false,
        'title': 'Do something with mock todos',
        'description': ''
      },
      {
        'id': '2',
        'state': true,
        'title': 'Super todos mock n°2',
        'description': ''
      },
      {
        'id': '3',
        'state': false,
        'title': 'Another todo',
        'description': ''
      }
    ];
    return { todos };
  }
}
