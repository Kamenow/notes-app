import { Box, Button, Input } from '@mui/material';
import { useState } from 'react';
import { CreateNote, Note } from '../types/Note';

function NoteBox(props: {
  note: Note;
  onSave: (noteData: CreateNote) => void;
  onDelete: () => void;
}) {
  const [note, setNote] = useState<Note>(props.note);

  return (
    <Box
      sx={{
        padding: '1rem',
        borderRadius: '1rem',
        borderTop: '2px solid black',
        borderLeft: '2px solid black',
        boxShadow: '10px 10px 0px 0px rgba(0,0,0,1)',
        display: 'flex',
        flexDirection: 'column',
        gap: '25px'
      }}
      key={note.id}
    >
      <Input
        value={note.title}
        onChange={(e) => {
          setNote({ ...note, title: e.target.value });
        }}
      />
      <Input
        multiline
        minRows={5}
        maxRows={5}
        value={note.content}
        onChange={(e) => {
          setNote({ ...note, content: e.target.value });
        }}
      />
      <Box display='flex' justifyContent='space-between'>
        <Button onClick={() => props.onSave(note)}>Save</Button>
        <Button onClick={props.onDelete}>Delete</Button>
      </Box>
    </Box>
  );
}

export default NoteBox;
