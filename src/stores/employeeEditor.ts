/* eslint-disable @typescript-eslint/no-unused-vars */
import { defineStore } from 'pinia'
export interface EmployeeDTO {
  id_employee: string
  empl_name: string
  empl_surname: string
  empl_patronimic?: string
  empl_role: string
  salary: number
  date_of_birth: string
  date_of_start: string
  phone_number: string
  city: string
  street: string
  zip_code: string
  pass: string | null
}

export const useEmployeeEditorStore = defineStore('employeeEditorStore', {
  state: () => ({
    isCreateDialogOpen: false,
    isDeleteDialogOpen: false,
    isUpdateDialogOpen: false,
    isGetOneDialogOpen: false,
    chosenItem: {} as EmployeeDTO,
    employees: [] as Array<EmployeeDTO>
  }),
  getters: {},
  actions: {
    async getAll(jwt_token: string, sort: string, roleFilter: string = 'Any'): Promise<boolean> {
      let url = '/employee'
      if (roleFilter != 'Any') {
        url += `/position/${roleFilter}`
      }
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
          const data: Array<EmployeeDTO> = await response.json()
          this.employees = data.map((item) => ({
            ...item,
            salary: parseFloat(item.salary.toString())
          }))
          return true
        }
        return false
      } catch (error) {
        console.error('Error:', error)
        return false
      }
    },
    async create(jwt_token: string, employee: EmployeeDTO): Promise<boolean> {
      const url = '/employee'
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt_token}`
          },
          body: JSON.stringify(employee)
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
    async delete(jwt_token: string, id_employee: string): Promise<boolean> {
      const url = `/employee/${id_employee}`
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
    async update(jwt_token: string, employee: EmployeeDTO): Promise<boolean> {
      const url = `/employee/${employee.id_employee}`
      console.log(url)
      try {
        const response = await fetch(url, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt_token}`
          },
          body: JSON.stringify({
            ...employee
          } as EmployeeDTO)
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
    async GetOneBySurname(jwt_token: string, surname: string): Promise<boolean> {
      const url = `/employee/searchBySurname/${surname}`
      console.log(url)
      try {
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${jwt_token}`
          }
        })
        if (response.ok) {
          const data = await response.json()
          this.chosenItem = data[0] || {}
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
