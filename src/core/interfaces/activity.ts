export interface Activity {
  id: string;
  name: string;
  description: string | null;
  concludedAt: Date | null;
}

export interface ActivityData {
  id: string;
  name: string;
  description: string | null;
}
