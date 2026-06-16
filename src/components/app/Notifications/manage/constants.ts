export const ALL_RECIPIENTS_KEY = "__all__";

export const isAllRecipientsSelected = (recipientIds: string[]): boolean =>
  recipientIds.includes(ALL_RECIPIENTS_KEY);

export const toApiRecipientIds = (recipientIds: string[]): string[] =>
  isAllRecipientsSelected(recipientIds) ? [] : recipientIds;
