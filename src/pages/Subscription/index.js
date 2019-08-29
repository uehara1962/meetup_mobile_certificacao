import React, { useState, useMemo, useEffect } from 'react';
import { Text, Image, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import {
  format,
  subDays,
  addDays,
  setHours,
  setMinutes,
  setSeconds,
  isBefore,
  isEqual,
  parseISO,
} from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import pt from 'date-fns/locale/pt';

import Icon from 'react-native-vector-icons/MaterialIcons';
import logom from '~/assets/logom.png';

import api from '~/services/api';

import Background from '~/components/Background';

import { cancelSubscriptionRequest } from '~/store/modules/subscription/actions';

import {
  Container,
  Header,
  List,
  Item,
  Detail,
  MeetupImage,
  Title,
  Info,
  BtnSubscription,
} from './styles';

const range = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];

export default function Subscription() {
  const profile = useSelector(state => state.user.profile);
  const subscription = useSelector(state => state.subscription);
  const dispatch = useDispatch();
  const [meetups, setMeetups] = useState([]);

  async function loadSubscription() {
    const response = await api.get('subscriptions');

    console.tron.log('response: ', response);

    const data = response.data.map(subscription => {
      return {
        subscription_id: subscription.id,
        meetup_id: subscription.Meetup.id,
        title: subscription.Meetup.title,
        author: subscription.Meetup.User.name,
        date: format(
          parseISO(subscription.Meetup.date),
          "d 'de' MMMM', às' HH'h'",
          {
            locale: pt,
          }
        ),
        location: subscription.Meetup.location,
        description: subscription.Meetup.description,
        url: subscription.Meetup.File.url,
      };
    });
    console.tron.log('data: ', data);
    setMeetups(data);
  }

  useEffect(() => {
    loadSubscription();
  }, [subscription]);

  function cancelSubscription(id) {
    console.tron.log('cancelSubscription_id:', profile.id, id);
    const dados = {
      subscriptionId: id,
    };
    dispatch(cancelSubscriptionRequest(dados));
  }

  return (
    <Background>
      <Container>
        <Header>
          <Image source={logom} style={{ width: 40, height: 40 }} />
        </Header>
        <List
          data={meetups}
          // onRefresh={this.refreshList} // Função dispara quando o usuário arrasta a lista pra baixo
          // refreshing={refreshing} // Variável que armazena um estado true/false que representa se a lista está atualizando
          keyExtractor={meetup => String(meetup.meetup_id)}
          // onEndReachedThreshold={0.2} // Carrega mais itens quando chegar em 20% do fim
          // onEndReached={this.loadMore} // Função que carrega mais itens
          renderItem={({ item }) => (
            <Item>
              <MeetupImage source={{ uri: item.url }} />
              <Detail>
                <Title>{item.title}</Title>
                <Info>
                  <Icon
                    name="event-note"
                    size={20}
                    color="#000"
                    style={{ opacity: 0.5 }}
                  />
                  <Text style={{ marginLeft: 8, opacity: 0.5 }}>
                    {item.date}
                  </Text>
                </Info>
                <Info>
                  <Icon
                    name="my-location"
                    size={20}
                    color="#000"
                    style={{ opacity: 0.5 }}
                  />
                  <Text style={{ marginLeft: 8, opacity: 0.5 }}>
                    {item.location}
                  </Text>
                </Info>
                <Info>
                  <Icon
                    name="person"
                    size={20}
                    color="#000"
                    style={{ opacity: 0.5 }}
                  />
                  <Text style={{ marginLeft: 8, opacity: 0.5 }}>
                    Organizador: {item.author}
                  </Text>
                </Info>
              </Detail>
              <BtnSubscription
                onPress={() => cancelSubscription(item.subscription_id)}
              >
                <Text
                  style={{ color: '#fff', fontWeight: 'bold', fontSize: 20 }}
                >
                  Cancelar inscrição
                </Text>
              </BtnSubscription>
            </Item>
          )}
        />
      </Container>
    </Background>
  );
}

Subscription.navigationOptions = {
  tabBarLabel: 'Incrições',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="local-offer" size={20} color={tintColor} />
  ),
};
