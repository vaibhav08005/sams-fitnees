export interface NavItem {
  label: string;
  href: string;
}

export interface Discipline {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}
