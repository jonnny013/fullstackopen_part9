import {Dialog, DialogTitle, DialogContent, Divider, Alert} from '@mui/material';

import NewEntry from './NewEntry';
import { Diagnosis, EntryWithoutId } from '../../../../types';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryWithoutId) => void;
  error?: string;
  diagnosis: Diagnosis[]
}

const AddEntryModal = ({modalOpen, onClose, onSubmit, error, diagnosis}: Props) => (
  <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
    <DialogTitle>Add a new entry</DialogTitle>
    <Divider />
    <DialogContent>
      {error && <Alert severity='error'>{error}</Alert>}
      <NewEntry onSubmit={onSubmit} onCancel={onClose} diagnosis={diagnosis}/>
    </DialogContent>
  </Dialog>
);

export default AddEntryModal;
