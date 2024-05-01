import { Container } from '@mui/material';
import useAuth from '../hooks/auth';
import useNotes from '../hooks/notes';
import { Note } from '../types/Note';
import NoteBox from '../components/NoteBox';
import CreateNoteForm from '../components/CreateNoteForm';

function PersonalNotes() {
  const { user } = useAuth();
  const { notes, createNote, deleteNoteById, updateNoteById } = useNotes(
    user.id ? user.id : ''
  );

  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'stretch',
        gap: '25px',
        flexWrap: 'wrap',
        padding: '1rem'
      }}
    >
      <>
        <CreateNoteForm
          createNote={(createNoteData) => {
            createNote({
              ...createNoteData,
              userId: user.id
            });
          }}
        />
        {notes.map((note: Note) => (
          <NoteBox
            key={note.id}
            note={note}
            onSave={updateNoteById.bind(undefined, note.id)}
            onDelete={() => {
              deleteNoteById(note.id);
            }}
          />
        ))}
      </>
    </Container>
  );
}

export default PersonalNotes;
