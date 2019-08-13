import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import {
  Meetup,
  Banner,
  MeetupBody,
  Title,
  MeetupInfo,
  DateText,
  Location,
  Organizer,
  SubscribeButton,
} from './styles';

export default function MeetupCard({ data, onPress }) {
  return (
    <Meetup>
      <Banner source={{ uri: data.banner.url }} />
      <MeetupBody>
        <Title>{data.title}</Title>
        <MeetupInfo>
          <Icon name="event" size={16} color="rgba(0, 0, 0, 0.6)" />
          <DateText>{data.formattedDate}</DateText>
        </MeetupInfo>
        <MeetupInfo>
          <Icon name="location-on" size={16} color="rgba(0, 0, 0, 0.6)" />
          <Location>{data.location}</Location>
        </MeetupInfo>
        <MeetupInfo>
          <Icon name="person" size={16} color="rgba(0, 0, 0, 0.6)" />
          <Organizer>{data.user.name}</Organizer>
        </MeetupInfo>

        <SubscribeButton
          onPress={onPress}
          enabled={!data.past && !data.subscribed}
        >
          {(() => {
            if (data.past) {
              return 'Not available anymore';
            }
            if (data.subscribed) {
              return 'Subscribed!';
            }
            return 'Subscribe';
          })()}
        </SubscribeButton>
      </MeetupBody>
    </Meetup>
  );
}

MeetupCard.propTypes = {
  data: PropTypes.shape({
    banner: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    formattedDate: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
    id: PropTypes.number.isRequired,
    past: PropTypes.bool.isRequired,
    subscribed: PropTypes.bool.isRequired,
  }).isRequired,
  onPress: PropTypes.func.isRequired,
};
