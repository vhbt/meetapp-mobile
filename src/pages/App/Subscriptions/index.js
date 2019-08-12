import { withNavigationFocus } from 'react-navigation';
import React, { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import en from 'date-fns/locale/en-US';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { showMessage } from 'react-native-flash-message';

import api from '~/services/api';

import Background from '~/components/Background';
import Header from '~/components/Header';
import EmptyContainer from '~/components/EmptyContainer';

import {
  Container,
  LoadingIndicator,
  SubscriptionsList,
  Subscription,
  Banner,
  SubscriptionBody,
  Title,
  SubscriptionInfo,
  DateText,
  Location,
  Organizer,
  UnsubscribeButton,
} from './styles';

function Subscriptions({ isFocused }) {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(true);

  useEffect(() => {
    async function loadSubscriptions() {
      const response = await api.get('subscriptions');

      const data = response.data.map(subscription => ({
        ...subscription,
        Meetup: {
          ...subscription.Meetup,
          subscribed: true,
          formattedDate: format(
            parseISO(subscription.Meetup.date),
            "dd 'of' MMMM, yyyy '-' hh'h'mm",
            {
              locale: en,
            }
          ),
        },
      }));

      console.tron.log(data);
      setSubscriptions(data);

      setLoading(false);
      setRefreshing(false);
    }

    if (refreshing || isFocused) {
      loadSubscriptions();
    }
  }, [refreshing, isFocused]);

  async function handleUnsubscribe(id) {
    try {
      await api.delete(`meetups/${id}/subscriptions`);

      showMessage({
        message: 'Unsubscribed to meeting!',
        type: 'success',
      });

      setSubscriptions(
        subscriptions.filter(subscription => {
          return subscription.Meetup.id !== id;
        })
      );
      console.tron.log(subscriptions);
    } catch (err) {
      if (err.response) {
        showMessage({
          message: err.response.data.error,
          type: 'danger',
        });
      } else {
        showMessage({
          message: 'Connection error.',
          type: 'danger',
        });
      }
    }
  }

  function refresh() {
    setRefreshing(true);
  }

  return (
    <Background>
      <Header />
      <Container>
        {loading ? (
          <LoadingIndicator size="large" color="rgb(70, 128, 255)" />
        ) : (
          <SubscriptionsList
            data={subscriptions}
            ListEmptyComponent={<EmptyContainer />}
            keyExtractor={item => String(item.id)}
            refreshing={refreshing}
            onRefresh={refresh}
            renderItem={({ item }) => (
              <Subscription>
                <Banner source={{ uri: item.Meetup.banner.url }} />
                <SubscriptionBody>
                  <Title>{item.Meetup.title}</Title>
                  <SubscriptionInfo>
                    <Icon name="event" size={16} color="rgba(0, 0, 0, 0.6)" />
                    <DateText>{item.Meetup.formattedDate}</DateText>
                  </SubscriptionInfo>
                  <SubscriptionInfo>
                    <Icon
                      name="location-on"
                      size={16}
                      color="rgba(0, 0, 0, 0.6)"
                    />
                    <Location>{item.Meetup.location}</Location>
                  </SubscriptionInfo>
                  <SubscriptionInfo>
                    <Icon name="person" size={16} color="rgba(0, 0, 0, 0.6)" />
                    <Organizer>{item.Meetup.user.name}</Organizer>
                  </SubscriptionInfo>

                  <UnsubscribeButton
                    onPress={() => {
                      handleUnsubscribe(item.Meetup.id);
                    }}
                    enabled={!item.Meetup.past && item.Meetup.subscribed}
                  >
                    Unsubscribe
                  </UnsubscribeButton>
                </SubscriptionBody>
              </Subscription>
            )}
          />
        )}
      </Container>
    </Background>
  );
}

Subscriptions.navigationOptions = {
  tabBarLabel: 'Subscriptions',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="local-offer" size={20} color={tintColor} />
  ),
};

export default withNavigationFocus(Subscriptions);
