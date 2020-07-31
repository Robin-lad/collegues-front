import { Collegue } from '../models/Collegue';

export function creationCol(): Collegue {

  const col1: Collegue = {
    matricule: '17471658426595',
    nom: 'Chat',
    prenoms: 'Tropchou',
    email: 'chat@email.com',
    dateDeNaissance: new Date('2015-05-08'),
    photoUrl: './assets/chat-trop-chou.jpg'
  };
  return col1;
}
