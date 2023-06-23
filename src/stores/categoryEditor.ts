/* eslint-disable @typescript-eslint/no-unused-vars */
import { defineStore } from 'pinia'
export interface CategoryDTO {
  category_number: number
  category_name: string
}

export const useCategoryEditorStore = defineStore('categoryEditorStore', {
  state: () => ({
    isCreateDialogOpen: false,
    isDeleteDialogOpen: false,
    isUpdateDialogOpen: false,
    chosenItem: {} as CategoryDTO,
    categories: [] as Array<CategoryDTO>
  }),
  getters: {},
  actions: {
    async getAll(jwt_token: string, sort: string): Promise<boolean> {
      let url = 'http://127.0.0.1:3000/category'
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
          const data: Array<CategoryDTO> = await response.json()
          this.categories = data
          return true
        }
        return false
      } catch (error) {
        console.error('Error:', error)
        return false
      }
    },
    async create(jwt_token: string, category_name: string): Promise<boolean> {
      const url = 'http://127.0.0.1:3000/category'
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt_token}`
          },
          body: JSON.stringify({ category_name })
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
    async delete(jwt_token: string, category_number: number): Promise<boolean> {
      const url = `http://127.0.0.1:3000/category/${category_number}`
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
    async update(jwt_token: string, category: CategoryDTO): Promise<boolean> {
      const url = `http://127.0.0.1:3000/category/${category.category_number}`
      try {
        const response = await fetch(url, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt_token}`
          },
          body: JSON.stringify(category)
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
