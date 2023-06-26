/* eslint-disable @typescript-eslint/no-unused-vars */
import { defineStore } from 'pinia'
export interface loginDTO {
  id_employee: string
  password: string
}

export const useLoginStore = defineStore('loginStore', {
  state: () => ({
    id_employee: '',
    jwt_token: '',
    empl_role: '',
    myProfile: {
      id_employee: '',
      empl_name: '',
      empl_surname: '',
      empl_patronimic: null,
      empl_role: '',
      salary: '',
      date_of_birth: '',
      date_of_start: '',
      phone_number: '',
      city: '',
      street: '',
      zip_code: ''
    }
  }),
  getters: {},
  actions: {
    async loginRequest({ id_employee, password }: loginDTO): Promise<boolean> {
      const url = 'http://localhost:3000/auth/login'

      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id_employee, password })
        })

        if (response.ok) {
          const data = await response.json()
          this.jwt_token = data.jwt_token
          this.id_employee = data.id_employee
          this.empl_role = data.empl_role
          this.getMyProfile(id_employee)
          return true
        }
        return false
      } catch (error) {
        console.error('Error:', error)
        return false
      }
    },
    async getMyProfile(id_employee: string): Promise<boolean> {
      const url = `/employee/${this.id_employee}`
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.jwt_token}`
          }
        })

        if (response.ok) {
          const data = await response.json()
          this.myProfile.id_employee = data.id_employee
          this.myProfile.empl_name = data.empl_name
          this.myProfile.empl_surname = data.empl_surname
          this.myProfile.empl_patronimic = data.empl_patronimic
          this.myProfile.empl_role = data.empl_role
          this.myProfile.phone_number = data.phone_number
          this.myProfile.salary = data.salary
          this.myProfile.city = data.city
          this.myProfile.street = data.street
          this.myProfile.zip_code = data.zip_code
          return true
        }
        return false
      } catch (error) {
        console.error('Error:', error)
        return false
      }
    },
    clearStore() {
      this.empl_role = ''
      this.jwt_token = ''
      this.id_employee = ''
      this.myProfile.id_employee = ''
      ;(this.myProfile.empl_name = ''),
        (this.myProfile.empl_surname = ''),
        (this.myProfile.empl_patronimic = null),
        (this.myProfile.empl_role = ''),
        (this.myProfile.salary = ''),
        (this.myProfile.date_of_birth = ''),
        (this.myProfile.date_of_start = ''),
        (this.myProfile.phone_number = ''),
        (this.myProfile.city = ''),
        (this.myProfile.street = ''),
        (this.myProfile.zip_code = '')
    }
  }
})
