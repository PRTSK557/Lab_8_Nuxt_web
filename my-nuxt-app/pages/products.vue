<template>
  <div class="p-4 md:p-6">
    <h1 class="text-3xl font-bold mb-6 text-center">Список продуктів</h1>

    <UInput v-model="filter" placeholder="Пошук..." class="mb-4 w-full" />

    <div v-if="isMobile" class="grid grid-cols-1 gap-4">
      <div
          v-for="product in sortedAndFilteredProducts"
          :key="product.id"
          class="border rounded-lg shadow p-4 flex gap-4 items-start"
      >
        <img
            :src="product.thumbnail"
            alt="Product"
            class="w-32 h-32 object-cover rounded-lg"
        />
        <div class="flex-1">
          <h2 class="text-lg font-semibold">{{ product.title }}</h2>
          <p class="text-sm text-gray-600 mb-2">{{ product.description }}</p>
          <p><strong>Ціна:</strong> ${{ product.price }}</p>
          <p><strong>Оцінка:</strong>
            <span :class="product.rating < 4.5 ? 'text-red-500' : 'text-green-500'">
              {{ product.rating }}
            </span>
          </p>
          <p><strong>Бренд:</strong> {{ product.brand }}</p>
          <p><strong>Категорія:</strong> {{ product.category }}</p>
        </div>
      </div>
    </div>

    <UTable
        v-else
        :rows="sortedAndFilteredProducts"
        :columns="columns"
        :page-size="5"
        :page="page"
        :sort="sort"
        @update:sort="updateSort"
    >
      <template #thumbnail-data="{ row }">
        <img
            :src="row.thumbnail"
            alt="Product"
            class="w-36 h-36 object-cover rounded-lg shadow"
        />
      </template>

      <template #rating-data="{ row }">
        <span :class="row.rating < 4.5 ? 'text-red-500' : 'text-green-500'">
          {{ row.rating }}
        </span>
      </template>
    </UTable>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useHead } from '#imports'
import { useMediaQuery } from '@vueuse/core' // ДОДАНО

const products = ref([])
const page = ref(1)
const sort = ref({ column: '', direction: '' })
const filter = ref('')

const columns = [
  { key: 'title', label: 'Назва', sortable: true },
  { key: 'description', label: 'Опис', sortable: true },
  { key: 'price', label: 'Ціна', sortable: true },
  { key: 'rating', label: 'Оцінка', sortable: true },
  { key: 'brand', label: 'Бренд', sortable: true },
  { key: 'category', label: 'Категорія', sortable: true },
  { key: 'thumbnail', label: 'Фото' }
]

onMounted(async () => {
  const res = await fetch('https://dummyjson.com/products')
  const data = await res.json()
  products.value = data.products
})

const sortedAndFilteredProducts = computed(() => {
  let rows = [...products.value]

  if (filter.value) {
    const f = filter.value.toLowerCase()
    rows = rows.filter(product =>
        Object.values(product).some(val =>
            String(val).toLowerCase().includes(f)
        )
    )
  }

  if (sort.value.column) {
    rows.sort((a, b) => {
      const col = sort.value.column
      const dir = sort.value.direction === 'asc' ? 1 : -1
      if (typeof a[col] === 'number') {
        return (a[col] - b[col]) * dir
      } else {
        return String(a[col]).localeCompare(String(b[col])) * dir
      }
    })
  }

  return rows
})

const updateSort = (value) => {
  sort.value = value
}

useHead({ title: 'Список продуктів' })

const isMobile = useMediaQuery('(max-width: 767px)')
</script>
