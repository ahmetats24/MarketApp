import { View, Text } from 'react-native'
import React from 'react'
import Etbalık from '../../components/Etbalık/Etbalık'

const EtbalıkAll = ({route}) => {
  const {marketadi} = route.params || {};
  return (
    <View >
        <Etbalık marketName={marketadi} horizontal={false}  sayısı={2} solabosluk={25} />
    </View>
  )
}

export default EtbalıkAll