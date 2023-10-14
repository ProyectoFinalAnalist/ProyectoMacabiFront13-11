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
            const response = await axios.get(url)
            console.log("🚀 ~ file: Store.ts:28 ~ fetchElements ~ response:", response)
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
          const response = await axios.get(`${url}/${id}`)
          this.currentElement = response.data
        } catch (error) {
          console.error(`Error fetching element with id ${id}:`, error)
        }
      },

      async createElement(newElement) {
        console.log("🚀 ~ file: Store.ts:52 ~ createElement ~ newElement:", newElement)
        try {
          const response = await axios.post(`${url}`, newElement)
          this.elements.push(response.data)
          console.log("🚀 ~ file: Store.ts:56 ~ createElement ~ response:", response)
        } catch (error) {
          console.error('Error creating element:', error)
        }
      },

      async updateElement(updatedElement) {
        try {
          const response = await axios.put(`${url}/${updatedElement.id}`, updatedElement) 
          const index = this.elements.findIndex((e) => e.id === updatedElement.id)
          this.elements[index] = response.data
        } catch (error) {
          console.error(`Error updating Element with id ${updatedElement.id}:`, error)
        }
      },

      async deleteElement(id) {
        try {
          await axios.delete(`${url}/${id}`)
          this.elements = this.elements.filter((e) => e.id !== id)
        } catch (error) {
          console.error(`Error deleting Element with id ${id}:`, error)
        }
      },

      confirm(accion: string, modificacion: string, tipo: string) {
        var confirmado = true;
        var confirmar = window.confirm(`¿Estás seguro de ${accion} este ${tipo}?`);
        if (confirmar) {
          alert(`${tipo} ${modificacion} correctamente`);
        } else {
          alert(`Acción cancelada`);
          confirmado = false;
        }
        return confirmado;
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
      },

      verificarExistencia(user) {
        return {
          dniRepetido: this.elements.some(item => this.compararDatos(item.dni, user.dni, item.id, user.id)),
          emailRepetido: this.elements.some(item => this.compararDatos(item.mail, user.mail, item.id, user.id))
        };
      },
      compararDatos(dato1, dato2, id1, id2) {

        return dato1 === dato2 && id1 !== id2;
      }
    }
  })
}