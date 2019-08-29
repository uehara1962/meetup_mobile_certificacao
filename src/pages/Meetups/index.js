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

import { createSubscriptionRequest } from '~/store/modules/subscription/actions';

import {
  Container,
  Header,
  SelectDate,
  List,
  Item,
  Detail,
  MeetupImage,
  Title,
  Info,
  BtnSubscription,
} from './styles';

const range = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];

export default function Dashboard() {
  const profile = useSelector(state => state.user.profile);
  const dispatch = useDispatch();
  const [meetups, setMeetups] = useState([]);
  const [date, setDate] = useState(new Date());

  const dateParsed = useMemo(() => {
    return format(date, 'yyyy-MM-dd');
  }, [date]);

  const dateFormatted = useMemo(
    () => format(date, "d 'de' MMMM", { locale: pt }),
    [date]
  );

  useEffect(() => {
    async function loadMeetups() {
      // const date1 = await parseISO(date);
      const response = await api.get('meetups', {
        params: { date: dateParsed },
      });

      console.tron.log('format: ', format(date, 'yyyy-MM-dd'));
      console.tron.log('dateParsed :', dateParsed);
      console.tron.log('response: ', response);
      // const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      // const data = range.map(hour => {
      //   const checkDate = setSeconds(setMinutes(setHours(date, hour), 0), 0);
      //   const compareDate = utcToZonedTime(checkDate, timezone);

      //   return {
      //     time: `${hour}:00h`,
      //     past: isBefore(compareDate, new Date()),
      //     appointment: response.data.appointments.find(a =>
      //       isEqual(parseISO(a.date), compareDate)
      //     ),
      //   };
      // });
      // setMeetups(data);
      const data = response.data.map(meetup => {
        return {
          meetup_id: meetup.id,
          title: meetup.title,
          author: meetup.User.name,
          date: format(parseISO(meetup.date), "d 'de' MMMM', às' HH'h'", {
            locale: pt,
          }),
          location: meetup.location,
          description: meetup.description,
          url: meetup.File.url,
        };
      });
      console.tron.log('data: ', data);
      setMeetups(data);
    }
    loadMeetups();
  }, [date]);

  function handlePrevDay() {
    setDate(subDays(date, 1));
  }

  function handleNextDay() {
    setDate(addDays(date, 1));
  }

  function createSubscription(id) {
    console.tron.log('createSubscription_id:', profile.id, id);
    const dados = {
      userId: profile.id,
      meetupId: id,
    };
    dispatch(createSubscriptionRequest(dados));
  }

  return (
    <Background>
      <Container>
        <Header>
          <Image source={logom} style={{ width: 40, height: 40 }} />
        </Header>
        <SelectDate>
          <TouchableOpacity onPress={handlePrevDay}>
            <Icon name="chevron-left" size={33} color="#fff" />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 28,
              color: '#fff',
              marginLeft: 20,
              marginRight: 20,
            }}
          >
            {dateFormatted}
          </Text>
          <TouchableOpacity onPress={handleNextDay}>
            <Icon name="chevron-right" size={33} color="#fff" />
          </TouchableOpacity>
        </SelectDate>
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
                onPress={() => createSubscription(item.meetup_id)}
              >
                <Text
                  style={{ color: '#fff', fontWeight: 'bold', fontSize: 20 }}
                >
                  Realizar inscrição
                </Text>
              </BtnSubscription>
            </Item>
          )}
        />
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="storage" size={20} color={tintColor} />
  ),
};
