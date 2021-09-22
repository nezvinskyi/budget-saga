import React from 'react';
import { Container } from 'semantic-ui-react';
import { EntryLine } from '..';

function EntryLines({ entries, deleteEntry, editEntry }) {
  return (
    <Container>
      {entries.map(({ description, value, isExpense, id }) => (
        <EntryLine
          key={id}
          description={description}
          value={value}
          isExpense={isExpense}
          deleteEntry={deleteEntry}
          id={id}
          editEntry={editEntry}
        />
      ))}
    </Container>
  );
}

export default EntryLines;
