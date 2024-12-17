import { View, Text } from 'react-native'
import React from 'react'
import AburCubur from '../../components/AburCubur/AburCubur'

const AburcuburAll = ({route}) => {
  const {marketadi} = route.params || {};
  return (
    <View >
        <AburCubur marketName={marketadi} horizontal={false}  sayısı={2} solabosluk={30} />
    </View>
  )
}

export default AburcuburAll