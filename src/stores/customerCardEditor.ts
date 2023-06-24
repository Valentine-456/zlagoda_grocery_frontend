/* eslint-disable @typescript-eslint/no-unused-vars */
import { defineStore } from 'pinia'
export interface CustomerCardDTO {
  card_number: string
  cust_name: string
  cust_surname: string
  cust_patronimic: string | null
  phone_number: string
  city: string | null
  street: string | null
  zip_code: string | null
  percent: number
  card_numberParameter?: string // isMadeOnlyFor PATCH requests
}

export const useCustomerCardEditorStore = defineStore('storeProductEditorStore', {
  state: () => ({
    isCreateDialogOpen: false,
    isDeleteDialogOpen: false,
    isUpdateDialogOpen: false,
    chosenItem: {} as CustomerCardDTO,
    customerCards: [] as Array<CustomerCardDTO>
  }),
  getters: {},
  actions: {
    async getAll(jwt_token: string, sort: string): Promise<boolean> {
      let url = 'http://127.0.0.1:3000/customer-card'
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
          const data: Array<CustomerCardDTO> = await response.json()
          this.customerCards = data.map((item) => ({
            ...item,
            card_numberParameter: item.card_number
          }))
          return true
        }
        return false
      } catch (error) {
        console.error('Error:', error)
        return false
      }
    },
    async create(jwt_token: string, customerCard: CustomerCardDTO): Promise<boolean> {
      const url = 'http://127.0.0.1:3000/customer-card'
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt_token}`
          },
          body: JSON.stringify(customerCard)
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
    async delete(jwt_token: string, cardNumber: string): Promise<boolean> {
      const url = `http://127.0.0.1:3000/customer-card/${cardNumber}`
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
    async update(jwt_token: string, customerCard: CustomerCardDTO): Promise<boolean> {
      const url = `http://127.0.0.1:3000/customer-card/${customerCard.card_numberParameter}`
      console.log(url)
      try {
        const response = await fetch(url, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt_token}`
          },
          body: JSON.stringify({
            ...customerCard
          } as CustomerCardDTO)
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
