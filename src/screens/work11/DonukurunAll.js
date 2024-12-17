import { View, Text } from 'react-native'
import React from 'react'
import DonukUrun from '../../components/DonukUrun/DonukUrun'

const DonukurunAll = ({route}) => {
  const {marketadi} = route.params || {};
  return (
    <View >
        <DonukUrun marketName={marketadi} horizontal={false}  sayısı={2} solabosluk={25} />
    </View>
  )
}

export default DonukurunAll