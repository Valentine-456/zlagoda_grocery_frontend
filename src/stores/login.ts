/* eslint-disable @typescript-eslint/no-unused-vars */
import { defineStore } from 'pinia'
export interface loginDTO {
    id_employee: string;
    password: string;
}

export const useLoginStore = defineStore('loginStore', {
    state: () => ({
          id_employee: "",
          jwt_token: ''
        }),
    getters: {},
    actions: {
      async loginRequest({
        id_employee,
        password,
      }: loginDTO): Promise<boolean> {
        const url = 'http://localhost:3000/auth/login';
        
        try {
            const response = await fetch(url, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({id_employee, password})
            });
            
            if(response.ok) {
                const data = await response.json();
                this.jwt_token = data.jwt_token;
                console.log(this.jwt_token)
                return true;
            }
            return false;
          } catch (error) {
            console.error('Error:', error);
            return false;
          }        
      }
    },
})