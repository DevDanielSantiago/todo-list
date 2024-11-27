export interface Activity {
  id: string;
  listId: string;
  name: string;
  description: string | null;
  concludedAt: Date | null;
}

export interface ActivityData {
  id: string;
  name: string;
  description: string | null;
}
