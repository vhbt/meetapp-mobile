import React, { useState, useMemo } from 'react';
import { format, addDays } from 'date-fns';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, GoBack, DateText, GoNext } from './styles';

export default function DatePicker({ onChange }) {
  const [date, setDate] = useState(new Date());
  const [formattedDate, setFormattedDate] = useState('');

  useMemo(() => {
    setFormattedDate(format(date, "dd 'of' MMMM, yyyy"));
  }, [date]);

  function handleSetDate(amount) {
    const newDate = addDays(date, amount);

    setDate(newDate);
    onChange(newDate);
  }

  return (
    <Container>
      <GoBack onPress={() => handleSetDate(-1)}>
        <Icon name="chevron-left" size={36} color="#333" />
      </GoBack>
      <DateText>{formattedDate}</DateText>
      <GoNext onPress={() => handleSetDate(1)}>
        <Icon name="chevron-right" size={36} color="#333" />
      </GoNext>
    </Container>
  );
}
