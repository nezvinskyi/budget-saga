import { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import './App.css';
import {
  DisplayBalance,
  DisplayBalances,
  EntryLines,
  MainHeader,
  ModalEdit,
  NewEntryForm,
} from './components';

const initialState = [
  {
    id: 1,
    description: 'Work income',
    value: 10000.0,
    isExpense: false,
  },
  {
    id: 2,
    description: 'Water bill',
    value: 30.0,
    isExpense: true,
  },
  {
    id: 3,
    description: 'Rent income',
    value: 20000.0,
    isExpense: false,
  },
  {
    id: 4,
    description: 'Electricity',
    value: 100.0,
    isExpense: true,
  },
];

function App() {
  const [entries, setEntries] = useState(initialState);
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [isExpense, setIsExpense] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [entryId, setEntryId] = useState(null);
  const [incomeTotal, setIncomeTotal] = useState(0);
  const [expenseTotal, setExpenseTotal] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (!isOpen && entryId) {
      const index = entries.findIndex(entry => entry.id === entryId);
      const newEntries = [...entries];
      newEntries[index].description = description;
      newEntries[index].value = value;
      newEntries[index].isExpense = isExpense;
      setEntries(newEntries);
    }
  }, [isOpen]);

  useEffect(() => {
    let totalIncomes = 0;
    let totalExpense = 0;
    entries.map(entry => {
      if (entry.isExpense) {
        return (totalExpense += Number(entry.value));
      } else {
        return (totalIncomes += Number(entry.value));
      }
    });
    setIncomeTotal(totalIncomes);
    setExpenseTotal(totalExpense);
    setTotal(totalIncomes - totalExpense);
  }, [entries]);

  const deleteEntry = id => {
    const result = entries.filter(entry => entry.id !== id);
    setEntries(result);
  };

  const editEntry = id => {
    if (id) {
      const index = entries.findIndex(entry => entry.id === id);
      const entry = entries[index];
      setEntryId(id);
      setDescription(entry.description);
      setValue(entry.value);
      setIsExpense(entry.isExpense);
    }
    setIsOpen(true);
  };

  const addEntry = () => {
    const result = entries.concat({ id: entries.length + 1, description, value, isExpense });
    setEntries(result);
    console.log('result :>> ', result);
    resetEntry();
  };

  const resetEntry = () => {
    setDescription('');
    setValue('');
    setIsExpense(true);
  };

  return (
    <Container>
      <MainHeader title="Budget" />
      <DisplayBalance title="Your Balance:" value={total} size="small" />

      <DisplayBalances incomeTotal={incomeTotal} expenseTotal={expenseTotal} />

      <MainHeader title="History" type="h3" />
      <EntryLines entries={entries} deleteEntry={deleteEntry} editEntry={editEntry} />

      <MainHeader title="Add new transaction" type="h3" />
      <NewEntryForm
        addEntry={addEntry}
        description={description}
        value={value}
        isExpense={isExpense}
        setDescription={setDescription}
        setValue={setValue}
        setIsExpense={setIsExpense}
      />
      <ModalEdit
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        description={description}
        value={value}
        isExpense={isExpense}
        setDescription={setDescription}
        setValue={setValue}
        setIsExpense={setIsExpense}
      />
    </Container>
  );
}

export default App;
