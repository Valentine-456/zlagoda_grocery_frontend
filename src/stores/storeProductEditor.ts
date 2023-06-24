/* eslint-disable @typescript-eslint/no-unused-vars */
import { defineStore } from 'pinia'
export interface StoreProductDTO {
  UPC: string //! this value is for sending requests in parameter, don't mix them up
  id_product: number
  selling_price: number
  products_nubmer: number
}

export interface StoreProductExtendedDTO extends StoreProductDTO {
  promotional_product: boolean
  product_name: string
  charachteristics: string
  upc: string //! this value we receive by requests, or send in reuest body, don't mix them up
}

export const useStoreProductEditorStore = defineStore('storeProductEditorStore', {
  state: () => ({
    isCreateDialogOpen: false,
    isDeleteDialogOpen: false,
    isUpdateDialogOpen: false,
    chosenItem: {} as StoreProductExtendedDTO,
    storeProducts: [] as Array<StoreProductExtendedDTO>
  }),
  getters: {},
  actions: {
    async getAll(jwt_token: string, sort: string): Promise<boolean> {
      let url = 'http://127.0.0.1:3000/store-product'
      if (sort.length > 0) {
        url += `?sortBy=${sort}`
      }
      console.log(url)
      try {
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${jwt_token}`
          }
        })
        if (response.ok) {
          const data: Array<StoreProductExtendedDTO> = await response.json()
          this.storeProducts = data.map((item) => ({
            ...item,
            selling_price: parseFloat(item.selling_price.toString()),
            UPC: item.upc
          }))
          return true
        }
        return false
      } catch (error) {
        console.error('Error:', error)
        return false
      }
    },
    async create(jwt_token: string, storeProduct: StoreProductDTO): Promise<boolean> {
      const url = 'http://127.0.0.1:3000/store-product'
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt_token}`
          },
          body: JSON.stringify(storeProduct)
        })
        if (response.ok) {
          return true
        }
        return false
      } catch (error) {
        console.error('Error:', error)
        return false
      }
    },
    async delete(jwt_token: string, upc: string): Promise<boolean> {
      const url = `http://127.0.0.1:3000/store-product/${upc}`
      console.log(url)
      try {
        const response = await fetch(url, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${jwt_token}`
          }
        })
        if (response.ok) {
          return true
        }
        return false
      } catch (error) {
        console.error('Error:', error)
        return false
      }
    },
    async update(jwt_token: string, storeProduct: StoreProductExtendedDTO): Promise<boolean> {
      const url = `http://127.0.0.1:3000/store-product/${storeProduct.UPC}`
      console.log(url)
      console.log(storeProduct)
      try {
        const response = await fetch(url, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt_token}`
          },
          body: JSON.stringify({
            ...storeProduct,
            UPC: storeProduct.upc
          } as StoreProductExtendedDTO)
        })
        if (response.ok) {
          return true
        }
        return false
      } catch (error) {
        console.error('Error:', error)
        return false
      }
    }
  }
})
