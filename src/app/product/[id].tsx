import { Image, ScrollView, Text, View } from 'react-native'
import { Button } from '@/components/button'
import { LinkButton } from '@/components/link-button'

import { useCartStorage } from '@/stores/cart-storage'

import { PRODUCTS } from '@/utils/data/products'
import { formatCurrency } from '@/utils/functions/format-currency'
import { Feather } from '@expo/vector-icons'

import { Redirect, useLocalSearchParams, useNavigation } from 'expo-router'

export default function Product() {
  const { id } = useLocalSearchParams()
  const cartStore = useCartStorage()
  const navigation = useNavigation()
  const product = PRODUCTS.find((item) => item.id === id)

  function handleAddToCart() {
    if (product) {
      cartStore.add(product)
      navigation.goBack()
    }
  }

  if (!product) {
    return <Redirect href={'/'} />
  }

  return (
    <View className="flex-1 mt-3">
      <Image
        source={product.cover}
        className="w-full h-48"
        resizeMode="cover"
        alt=""
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="p-5 mt-5 flex-1">
          <Text className="text-white text-xl font-heading">
            {product.title}
          </Text>
          <Text className="text-lime-400 text-2xl font-heading">
            {formatCurrency(product.price)}
          </Text>

          <Text className="text-slate-400 font-body text-base leading-6 mb-6">
            {product.description}
          </Text>

          {product.ingredients.map((ingredient) => (
            <Text
              key={ingredient}
              className="text-slate-400 font-body text-base leading-6"
            >
              {'\u2022 '}
              {ingredient}
            </Text>
          ))}
        </View>
      </ScrollView>
      <View className="p-4 pb-8 gap-5">
        <Button onPress={handleAddToCart}>
          <Button.Icon>
            <Feather name="plus-circle" size={20} />
          </Button.Icon>
          <Button.Text>Adicionar ao pedido</Button.Text>
        </Button>

        <LinkButton title="Voltar ao cardápio" href="/" />
      </View>
    </View>
  )
}
