/* eslint-disable @typescript-eslint/no-unused-vars */
import { defineStore } from 'pinia'
export interface ProductDTO {
  id_product: number
  category_number: number
  product_name: string
  charachteristics: string
  category_name: string
}

export const useProductEditorStore = defineStore('productEditorStore', {
  state: () => ({
    isCreateDialogOpen: false,
    isDeleteDialogOpen: false,
    isUpdateDialogOpen: false,
    chosenItem: {} as ProductDTO,
    products: [] as Array<ProductDTO>
  }),
  getters: {},
  actions: {
    async getAll(
      jwt_token: string,
      sort: string,
      categoryFilter: string = 'Any'
    ): Promise<boolean> {
      let url = 'http://127.0.0.1:3000/product?'
      if (sort.length > 0) {
        url += `sortBy=${sort}`
      }
      if (categoryFilter != 'Any') {
        url += `&category=${encodeURIComponent(categoryFilter)}`
      }
      console.log(url)
      try {
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${jwt_token}`
          }
        })
        if (response.ok) {
          const data: Array<ProductDTO> = await response.json()
          this.products = data
          return true
        }
        return false
      } catch (error) {
        console.error('Error:', error)
        return false
      }
    },
    async create(jwt_token: string, product: ProductDTO): Promise<boolean> {
      const url = 'http://127.0.0.1:3000/product'
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt_token}`
          },
          body: JSON.stringify(product)
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
    async delete(jwt_token: string, id_product: number): Promise<boolean> {
      const url = `http://127.0.0.1:3000/product/${id_product}`
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
    async update(jwt_token: string, product: ProductDTO): Promise<boolean> {
      const url = `http://127.0.0.1:3000/product/${product.id_product}`
      try {
        const response = await fetch(url, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt_token}`
          },
          body: JSON.stringify(product)
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
    async getAllByProductName(jwt_token: string, productNamePrefix: string): Promise<boolean> {
      const url = `http://127.0.0.1:3000/product/searchByName/${productNamePrefix}`
      console.log(url)
      try {
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${jwt_token}`
          }
        })
        if (response.ok) {
          const data: Array<ProductDTO> = await response.json()
          this.products = data
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
