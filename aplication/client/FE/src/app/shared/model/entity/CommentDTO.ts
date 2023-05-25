import { Account } from "./Account";

export class CommentDTO {
  id: number;
  content: string;
  rate: number;
  movieId: number;
  accountId: Account;
  createAt: string;
}
