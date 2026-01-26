import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  'profile.formcontrols.who.can.see': {
    id: 'profile.formcontrols.who.can.see',
    defaultMessage: 'Who can see this:',
    description: 'What users can see this area?',
  },
  'profile.formcontrols.button.cancel': {
    id: 'profile.formcontrols.button.cancel',
    defaultMessage: 'Cancel',
    description: 'A button label',
  },
  'profile.formcontrols.button.save': {
    id: 'profile.formcontrols.button.save',
    defaultMessage: 'Save',
    description: 'A button label',
  },
  'profile.formcontrols.button.saving': {
    id: 'profile.formcontrols.button.saving',
    defaultMessage: 'Saving',
    description: 'A button label',
  },
  'profile.formcontrols.button.saved': {
    id: 'profile.formcontrols.button.saved',
    defaultMessage: 'Saved',
    description: 'A button label',
  },
  'profile.formcontrols.error.min_length': {
    id: 'profile.formcontrols.error.min_length',
    defaultMessage: 'This field must be at least {minLength} characters long.',
    description: 'Error message when the field is too short',
  },
  'profile.formcontrols.error.max_length': {
    id: 'profile.formcontrols.error.max_length',
    defaultMessage: 'This field must be at most {maxLength} characters long.',
    description: 'Error message when the field is too long',
  },
  'account.settings.editable.field.action.edit': {
    id: 'account.settings.editable.field.action.edit',
    defaultMessage: 'Edit',
    description: 'A button label',
  },
  'account.settings.editable.field.action.add': {
    id: 'account.settings.editable.field.action.add',
    defaultMessage: 'Add {fieldLabel}',
    description: 'A button label to add a new field value',
  },
});

export default messages;
