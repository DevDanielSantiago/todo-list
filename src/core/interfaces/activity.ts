export interface Activity {
  id: string;
  name: string;
  description: string | null;
  deadline: Date | null;
  concludedAt: Date | null;
}
