import { View, Text } from 'react-native'
import React from 'react'
import Icecek from '../../components/Icecek/Icecek'

const IcecekAll = ({route}) => {
  const {marketadi} = route.params || {};
  return (
    <View >
        <Icecek marketName={marketadi} horizontal={false}  sayısı={2} solabosluk={30} />
    </View>
  )
}

export default IcecekAll