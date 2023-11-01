import { defineStore } from 'pinia'
import axios from 'axios'
import apiUrl from "../../config/config.js"

export function useElementStore(nombreStore) {
    const url = `${apiUrl}/${nombreStore}`
  return defineStore(nombreStore, {
    state: () => ({
      elements: null,
      currentElement: null
    }),

    getters: {
      getElements() {
        return this.elements
      },

      getElementById() {
        return (id) => this.elements.find((e) => e.id === id)
      }
    },

    actions: {
      async fetchElements() {
        if (!this.elements) {
          try {
            const response = await axios.get(url + "/getAll", { withCredentials: true })
            this.elements = response.data.result
          } catch (error) {
            console.error('Error fetching elements:', error)
          }
        }
      },
      setCurrentElement(value) {
        this.currentElement = value;
      },

      setElements(value) {
        this.elements = value;
      },
      async fetchElementById(id) {
        try {
          const response = await axios.get(`${url}/${id}`, { withCredentials: true })
          this.currentElement = response.data.result
        } catch (error) {
          console.error(`Error fetching element with id ${id}:`, error)
        }
      },

      async createElement(newElement) {
        try {
          const response = await axios.post(`${url}`, newElement, { withCredentials: true })
          this.elements.push(response.data)
        } catch (error) {
          console.error('Error creating element:', error)
        }
      },

      async updateElement(updatedElement) {
        try {
          const response = await axios.put(`${url}/${updatedElement.idUsuario}`, updatedElement , { withCredentials: true }) 
          const index = this.elements.findIndex((e) => e.idUsuario === updatedElement.idUsuario)
          this.elements[index] = response.data.result
        } catch (error) {
          console.error(`Error updating Element with id ${updatedElement.id}:`, error)
        }
      },

      async patchElement(updatedElement) {
        try {
          const response = await axios.patch(`${url}/${updatedElement.idUsuario}`, updatedElement , { withCredentials: true }) 
          const index = this.elements.findIndex((e) => e.idUsuario === updatedElement.idUsuario)
          this.elements[index] = response.data.result
        } catch (error) {
          console.error(`Error updating Element with id ${updatedElement.idUsuario}:`, error)
        }
      },

      async deleteElement(id) {
        try {
          await axios.delete(`${url}/${id}` , { withCredentials: true })
          this.elements = this.elements.filter((e) => e.id !== id)
        } catch (error) {
          console.error(`Error deleting Element with id ${id}:`, error)
        }
      },

      filtrarXString(busqueda: string | number, tipoFiltro: string) {
        this.elements = this.elements.filter(item => {
          const propiedad = item[tipoFiltro];
          if (typeof propiedad === "string" || typeof propiedad === "number") {
            const propiedadLowerCase = String(propiedad).toLowerCase();
            const busquedaLowerCase = String(busqueda).toLowerCase();
            return propiedadLowerCase.includes(busquedaLowerCase);
          }
          return false;
        });
      }
    }
  })
}