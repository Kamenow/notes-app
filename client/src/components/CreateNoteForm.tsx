import { Button, Input, Typography } from '@mui/material';
import { CSSProperties, useState } from 'react';
import { CreateNote, Note } from '../types/Note';
import { getUserFromToken } from '../helpers/tokenHelpers';

const formStyle: CSSProperties = {
  padding: '1rem',
  borderRadius: '1rem',
  background: 'wheat',
  borderTop: '2px solid black',
  borderLeft: '2px solid black',
  boxShadow: '10px 10px 0px 0px rgba(0,0,0,1)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between'
};

const defaultNoteData = {
  title: '',
  content: ''
};

function CreateNoteForm(props: {
  createNote: (noteData: Partial<CreateNote>) => void;
}) {
  const [noteData, setNoteData] = useState<Partial<Note>>(defaultNoteData);

  function handleOnclick() {
    props.createNote(noteData);
    setNoteData(defaultNoteData);
  }

  return (
    <form style={formStyle}>
      <Typography fontWeight={900}>Create New Note</Typography>
      <Input
        value={noteData.title}
        onChange={(e) => setNoteData({ ...noteData, title: e.target.value })}
      />
      <Input
        value={noteData.content}
        multiline
        minRows={5}
        maxRows={5}
        onChange={(e) => setNoteData({ ...noteData, content: e.target.value })}
      />
      <Button onClick={handleOnclick}>Create Note</Button>
    </form>
  );
}

export default CreateNoteForm;
