/* eslint-disable @typescript-eslint/no-unused-vars */
import { defineStore } from 'pinia'
export interface CheckDTO {
  vat: number
  sum_total: number
  print_date: string
  card_number: string | null
  id_employee: string
  check_number: string
}

export interface CheckExtendedDTO extends CheckDTO {
  sales: Array<{
    product_name: string
    charachteristics: string
    upc: string
    selling_price: number
    product_number: number
    promotional_product: boolean
  }>
}

export const useCheckEditorStore = defineStore('checkEditorStore', {
  state: () => ({
    isCreateDialogOpen: false,
    isDeleteDialogOpen: false,
    isGetOneDialogOpen: false,
    isGetStatisticsDialogOpen: false,
    chosenItem: {} as CheckExtendedDTO,
    checks: [] as Array<CheckDTO>,
    statisticsTotalSumOfChecks: 0
  }),
  getters: {},
  actions: {
    async getAll(jwt_token: string): Promise<boolean> {
      const url = '/check?sortBy=-print_date'
      console.log(url)
      try {
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${jwt_token}`
          }
        })
        if (response.ok) {
          const data: Array<CheckDTO> = await response.json()
          this.checks = data.map((item) => ({
            ...item,
            vat: parseFloat(item.vat.toString()),
            sum_total: parseFloat(item.sum_total.toString())
          }))
          return true
        }
        return false
      } catch (error) {
        console.error('Error:', error)
        return false
      }
    },
    async create(jwt_token: string, check: CheckExtendedDTO): Promise<boolean> {
      const url = '/check'
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt_token}`
          },
          body: JSON.stringify({
            ...check,
            sales: check.sales.map((el) => ({
              ...el,
              UPC: el.upc
            }))
          })
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
    async delete(jwt_token: string, check_number: string): Promise<boolean> {
      const url = `/check/${check_number}`
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
    async getOne(jwt_token: string, check_number: string) {
      const url = `/check/${check_number}`
      console.log(url)
      try {
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${jwt_token}`
          }
        })
        if (response.ok) {
          const data: CheckExtendedDTO = await response.json()
          this.chosenItem = {
            ...data,
            vat: parseFloat(data.vat.toString()),
            sum_total: parseFloat(data.sum_total.toString()),
            sales: data.sales.map((item) => ({
              ...item,
              selling_price: parseFloat(item.selling_price.toString())
            }))
          }
          return true
        }
        return false
      } catch (error) {
        console.error('Error:', error)
        return false
      }
    },
    async getAllWithinDates(
      jwt_token: string,
      fromDate: string,
      toDate: string,
      employeeFilter: string = '-'
    ) {
      let url = '/check/within'
      if (employeeFilter != '-') {
        url += `/${employeeFilter}`
      }
      url += `?fromDate=${fromDate}&toDate=${toDate}`
      console.log(url)
      try {
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${jwt_token}`
          }
        })
        if (response.ok) {
          const data: Array<CheckDTO> = await response.json()
          this.checks = data.map((item) => ({
            ...item,
            vat: parseFloat(item.vat.toString()),
            sum_total: parseFloat(item.sum_total.toString())
          }))
          return true
        }
        return false
      } catch (error) {
        console.error('Error:', error)
        return false
      }
    },
    async getTotalSumWithinDates(
      jwt_token: string,
      fromDate: string,
      toDate: string,
      employeeFilter: string = '-'
    ) {
      let url = '/check/sum/within'
      if (employeeFilter != '-') {
        url += `/${employeeFilter}`
      }
      url += `?fromDate=${fromDate}&toDate=${toDate}`
      console.log(url)
      try {
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${jwt_token}`
          }
        })
        if (response.ok) {
          const data: number | null = await response.json()
          this.statisticsTotalSumOfChecks = data || 0
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
