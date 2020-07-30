import { Collegue } from '../models/Collegue';

export function creation(): Collegue[] {

  const tab: Collegue[] = [];
  const col1 = new Collegue('17471658426595', 'Chat', 'Tropchou', new Date('2015-05-08'), 'chat@email.com');
  col1.photoUrl = './assets/chat-trop-chou.jpg';
  // const col2 = new Collegue('paul', 'pierre');
  // const col3 = new Collegue('nomTest', 'prenomTest');

  tab.push(col1);
  // tab.push(col2);
  // tab.push(col3);

  return tab;
}
