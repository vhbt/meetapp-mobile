import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { format, parseISO } from 'date-fns';
import en from 'date-fns/locale/en-US';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { showMessage } from 'react-native-flash-message';

import api from '~/services/api';

import Background from '~/components/Background';
import Header from '~/components/Header';
import DatePicker from '~/components/DatePicker';
import EmptyContainer from '~/components/EmptyContainer';

import {
  Container,
  LoadingIndicator,
  MeetupList,
  Meetup,
  Banner,
  MeetupBody,
  MeetupInfo,
  Title,
  DateText,
  Location,
  Organizer,
  SubscribeButton,
} from './styles';

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefrehing] = useState(false);
  const [page, setPage] = useState(1);
  const [endOfList, setEndOfList] = useState(false);

  const [meetups, setMeetups] = useState([]);
  const [searchDate, setSearchDate] = useState(new Date());

  const user = useSelector(state => state.user.user);

  useEffect(() => {
    async function loadMeetups() {
      const response = await api.get('meetups', {
        params: {
          date: searchDate,
        },
      });

      const data = response.data.map(meetup => ({
        ...meetup,
        subscribed: !!meetup.Subscriptions.find(
          subscription => subscription.user_id === user.id
        ),
        formattedDate: format(
          parseISO(meetup.date),
          "dd 'of' MMMM, yyyy '-' hh'h'mm",
          {
            locale: en,
          }
        ),
      }));

      setMeetups(data);
      setLoading(false);
    }

    loadMeetups();
  }, [searchDate, user.id]);

  async function refresh() {
    setRefrehing(true);

    const response = await api.get('meetups', {
      params: {
        date: searchDate,
      },
    });

    const data = response.data.map(meetup => ({
      ...meetup,
      subscribed: !!meetup.Subscriptions.find(
        subscription => subscription.user_id === user.id
      ),
      formattedDate: format(
        parseISO(meetup.date),
        "dd 'of' MMMM, yyyy '-' hh'h'mm",
        {
          locale: en,
        }
      ),
    }));

    setMeetups(data);
    setRefrehing(false);
    setPage(1);
    setEndOfList(false);
  }

  async function loadMore(p) {
    if (!endOfList) {
      const response = await api.get('meetups', {
        params: {
          date: searchDate,
          page: p,
        },
      });

      const data = response.data.map(meetup => ({
        ...meetup,
        subscribed: !!meetup.Subscriptions.find(
          subscription => subscription.user_id === user.id
        ),
        formattedDate: format(
          parseISO(meetup.date),
          "dd 'of' MMMM, yyyy '-' hh'h'mm",
          {
            locale: en,
          }
        ),
      }));

      setMeetups([...meetups, ...data]);

      if (data.length >= 1) {
        setPage(page + 1);
      } else {
        setEndOfList(true);
      }
    }
  }

  async function handleSubscribe(id) {
    try {
      await api.post(`meetups/${id}/subscriptions`);

      showMessage({
        message: 'Subscribed to meeting!',
        type: 'success',
      });

      setMeetups(
        meetups.map(meetup => {
          if (meetup.id === id) {
            return { ...meetup, subscribed: true };
          }
          return meetup;
        })
      );
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

  function handleDateChange(date) {
    setLoading(true);
    setSearchDate(date);
  }

  return (
    <Background>
      <Header />
      <Container>
        <DatePicker onChange={handleDateChange} />
        {loading ? (
          <LoadingIndicator size="large" color="rgb(70, 128, 255)" />
        ) : (
          <MeetupList
            data={meetups}
            keyExtractor={item => String(item.id)}
            ListEmptyComponent={<EmptyContainer />}
            refreshing={refreshing}
            onRefresh={refresh}
            onEndReachedThreshold={0.5}
            onEndReached={() => loadMore(page + 1)}
            renderItem={({ item }) => (
              <Meetup>
                <Banner source={{ uri: item.banner.url }} />
                <MeetupBody>
                  <Title>{item.title}</Title>
                  <MeetupInfo>
                    <Icon name="event" size={16} color="rgba(0, 0, 0, 0.6)" />
                    <DateText>{item.formattedDate}</DateText>
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
                    enabled={!item.past && !item.subscribed}
                  >
                    {(() => {
                      if (item.past) {
                        return 'Not available anymore';
                      }
                      if (item.subscribed) {
                        return 'Subscribed!';
                      }
                      return 'Subscribe';
                    })()}
                  </SubscribeButton>
                </MeetupBody>
              </Meetup>
            )}
          />
        )}
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
