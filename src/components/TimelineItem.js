import React from 'react';
import { View, Text, Image, StyleSheet, TouchableHighlight } from 'react-native';
import { normalize, colors } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

const TimelineItem = ({
  thumbnail,
  username,
  account_no,
  posted_at,
  place_name,
  alcohols
}) => {
  let alcoholContents = (<Text style={styles.alcohols}>
                          {
                            alcohols.map((alcohol, i) => { return i == 0 ? `#${alcohol}` : ` #${alcohol}` })
                          }
                        </Text>);
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        {
          thumbnail && (
            <Image style={styles.thumbnail} source={thumbnail}/>
          )
        }
        <View style={styles.mainContainer}>
          <View style={styles.header}>
            <View style={styles.userInfo}>
              <Text style={styles.username}>
                {username}
              </Text>
              <Text style={styles.accountNo}>
                {account_no}
              </Text>
            </View>
            <View>
              {
                posted_at && (
                  <Text style={styles.postedAt}>
                    {posted_at}
                  </Text>
                )
              }
            </View>
          </View>
          {
            place_name && (
              <View style={styles.placeContainer}>
                <Text style={styles.placeName}>
                  {place_name}
                </Text>
                <Text style={{marginLeft: 3}}>
                  でお酒をGet!!
                </Text>
              </View>
            )
          }
          {
            alcohols.length > 0 && (alcoholContents)
          }
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  thumbnail: {
    width: 34,
    height: 34,
    borderRadius: 17
  },
  container: {
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    borderBottomColor: '#ededed',
    borderBottomWidth: 1,
    backgroundColor: 'transparent'
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 10,
  },
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 10,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
  },
  postedAt: {
    color: colors.grey3,
    fontSize: normalize(12),
    marginTop: 3
  },
  userInfo: {
    flex: 1,
    flexDirection: 'row'
  },
  username: {
    fontSize: normalize(16),
    color: colors.grey1,
    fontWeight: '800'
  },
  accountNo: {
    color: colors.grey3,
    fontSize: normalize(12),
    marginLeft: 5,
    marginTop: 3
  },
  placeContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10
  },
  placeName: {
    fontWeight: '700'
  },
  alcohols: {
    marginTop: 5,
    fontWeight: '300'
  }
})

export default TimelineItem