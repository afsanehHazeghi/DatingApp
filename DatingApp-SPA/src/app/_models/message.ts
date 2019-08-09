export interface Message {
  id: number;
  senderId: number;
  senderKnownAs: string;
  senderPhotoUrl: string;
  recipientId: number;
  recepientKnownAs: string;
  recipientPhotoUrl: string;
  content: string;
  dateRead: Date;
  dateSent: Date;
  isRead: boolean;
}
