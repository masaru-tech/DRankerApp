import React from 'react';
import { View, Image, StyleSheet, TouchableHighlight } from 'react-native';
import { normalize, colors } from 'react-native-elements';
import { Container, Content, Card, CardItem, Text, Icon, Right } from 'native-base';

const ActivityItem = ({
  posted_at,
  place_name,
  alcohols
}) => {
  let alcoholContents = alcohols.map((alcohol, i) => {
    return (<CardItem key={i}>
            <Icon active name="md-beer" />
            <Text numberOfLines={1} ellipsizeMode='tail' style={{fontSize: 13}}>{alcohol}</Text>
          </CardItem>)
  })
  return (
    <Card>
      <CardItem header bordered>
        <Text numberOfLines={1} ellipsizeMode='tail' style={{fontSize: 13}}>{place_name}</Text>
      </CardItem>
      {alcoholContents}
    </Card>
  );
}

export default ActivityItem