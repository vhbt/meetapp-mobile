import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Empty, EmptyText } from './styles';

export default function EmptyContainer() {
  return (
    <Empty>
      <Icon
        name="sentiment-dissatisfied"
        size={64}
        color="rgba(0, 0, 0, 0.6);"
      />
      <EmptyText>Oopss... Looks like there is nothing to see here.</EmptyText>
    </Empty>
  );
}
