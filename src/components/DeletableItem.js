import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Platform } from 'react-native';
import { normalize, colors } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

const DeletableItem = ({
  title,
  subtitle,
  onPress
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.titleSubtitleContainer}>
          <View>
            <Text style={styles.title}>
              {title}
            </Text>
          </View>
          <View>
            <View>
              {subtitle ? 
                <Text style={styles.subtitle}>
                  {subtitle}
                </Text>:
                <View></View>
              }
            </View>
          </View>
        </View>
        <View style={styles.chevronContainer}>
          <Icon
            size={24}
            name='md-close-circle'
            color={colors.grey4}
            onPress={onPress}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    borderBottomColor: '#ededed',
    borderBottomWidth: 1,
    backgroundColor: 'transparent'
  },
  wrapper: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  title: {
    fontSize: normalize(14),
    color: colors.grey1
  },
  subtitle: {
    color: colors.grey3,
    fontSize: normalize(12),
    marginTop: 1,
    fontWeight: '600'
  },
  titleSubtitleContainer: {
    justifyContent: 'center',
    flex: 1,
  },
  chevronContainer: {
    flex: 0.15,
    alignItems: 'flex-end',
    justifyContent: 'center'
  }
})

export default DeletableItem