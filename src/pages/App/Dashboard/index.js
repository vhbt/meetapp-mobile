import React, { useEffect, useState } from 'react';
import { format, parseISO } from 'date-fns';
import en from 'date-fns/locale/en-US';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { showMessage } from 'react-native-flash-message';

import api from '~/services/api';

import Background from '~/components/Background';
import Header from '~/components/Header';

import {
  Container,
  MeetupList,
  Meetup,
  Banner,
  MeetupBody,
  MeetupInfo,
  Title,
  Date,
  Location,
  Organizer,
  SubscribeButton,
} from './styles';

export default function Dashboard() {
  const [meetups, setMeetups] = useState([]);

  useEffect(() => {
    async function loadMeetups() {
      const response = await api.get('meetups');

      const data = response.data.map(meetup => ({
        ...meetup,
        formattedDate: format(parseISO(meetup.date), "MM/dd/yyyy '-' hh'h'mm", {
          locale: en,
        }),
      }));

      setMeetups(data);
    }

    loadMeetups();
  }, []);

  async function handleSubscribe(id) {
    try {
      await api.post(`meetups/${id}/subscriptions`);

      showMessage({
        message: 'Subscribed to meeting!',
        type: 'success',
      });
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

  return (
    <Background>
      <Header />
      <Container>
        <MeetupList
          data={meetups}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Meetup>
              <Banner source={{ uri: item.banner.url }} />
              <MeetupBody>
                <Title>{item.title}</Title>
                <MeetupInfo>
                  <Icon name="event" size={16} color="rgba(0, 0, 0, 0.6)" />
                  <Date>{item.formattedDate}</Date>
                </MeetupInfo>
                <MeetupInfo>
                  <Icon
                    name="location-on"
                    size={16}
                    color="rgba(0, 0, 0, 0.6)"
                  />
                  <Location>{item.location}</Location>
                </MeetupInfo>
                <MeetupInfo>
                  <Icon name="person" size={16} color="rgba(0, 0, 0, 0.6)" />
                  <Organizer>{item.user.name}</Organizer>
                </MeetupInfo>

                <SubscribeButton
                  onPress={() => {
                    handleSubscribe(item.id);
                  }}
                >
                  Subscribe
                </SubscribeButton>
              </MeetupBody>
            </Meetup>
          )}
        />
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="list" size={20} color={tintColor} />
  ),
};
