import { FlatList, SectionList, Text, View } from 'react-native'
import { Header } from '@/components/header'
import { CategoryButton } from '@/components/category-button'
import { CATEGORIES, MENU, ProductProps } from '@/utils/data/products'
import { useRef, useState } from 'react'
import { Product } from '@/components/products'
import { Link } from 'expo-router'
import { useCartStorage } from '@/stores/cart-storage'

export default function Home() {
  const cartStore = useCartStorage()
  const [category, setCategory] = useState(CATEGORIES[0])

  const sectionListRef = useRef<SectionList<ProductProps>>(null)

  const cardQuantityItems = cartStore.products.reduce(
    (total, product) => total + product.quantity,
    0,
  )

  function handleCategorySelect(selectCategory: string) {
    setCategory(selectCategory)

    const sectionIndex = CATEGORIES.findIndex(
      (category) => category === selectCategory,
    )

    if (sectionListRef.current) {
      sectionListRef.current.scrollToLocation({
        animated: true,
        sectionIndex,
        itemIndex: 0,
      })
    }
  }
  return (
    <View className="flex-1 pt-8">
      <Header title="Faça seu pedido" cardQuantityItems={cardQuantityItems} />

      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <CategoryButton
            title={item}
            isSelected={item === category}
            onPress={() => handleCategorySelect(item)}
          />
        )}
        horizontal
        className="max-h-10 mt-5"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 12, paddingHorizontal: 20 }}
      />

      <SectionList
        ref={sectionListRef}
        sections={MENU}
        keyExtractor={(item) => item.id}
        stickySectionHeadersEnabled={false}
        renderItem={({ item }) => (
          <Link href={`/product/${item.id}`} asChild>
            <Product data={item} />
          </Link>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text className="text-xl text-white font-heading mt-8 mb-3">
            {title}
          </Text>
        )}
        className="flex-1 p-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  )
}
