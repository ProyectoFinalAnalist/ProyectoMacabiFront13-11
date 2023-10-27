import { defineStore } from 'pinia'
import axios from 'axios'

export function useElementStore(nombreStore) {
	return defineStore(nombreStore, {
		state: () => ({
			elements: null,
			elementsList: null,
			currentElement: null,
		}),

		getters: {
			getElements() {
				return this.elements;
			},

			getElementsList() {
				return this.elementsList;
			},

			getElementById() {
				return (id) => this.elements.result.find((e) => e.id === id);
			},

			getWithKeyValue() {
				return (key, value) => this.elements.result.find((e) => {
					if (e.hasOwnProperty(key)) {
						return e[key] == value
					} else {
						return false
					}
				});
			},

		},

		actions: {

			async fetchElements(url) {
				if (true) {  //pongo true porque sino no recarga nunca :) despues vemos que hacemos
					try {
						const response = await axios.get(url, { withCredentials: true })
						this.elements = response.data
						this.elementsList = response.data.result
						//console.log(response.data)
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

			async fetchElementById(url, id) {
				try {
					const response = await axios.get(`${url}/${id}`, { withCredentials: true })
					this.currentElement = response.data
				} catch (error) {
					console.error(`Error fetching element with id ${id}:`, error)
				}
			},

			async createElement(url, newElement) {
				try {
					const response = await axios.post(`${url}`, newElement , { withCredentials: true })
					//this.elements.push(response.data)
				} catch (error) {
					console.error('Error creating element:', error)
				}
			},

			async updateElement(url, updatedElement, idField) {
				try {
					//console.log(updatedElement)
					const response = await axios.put(`${url}/${updatedElement[idField]}`, updatedElement, { withCredentials: true });
				} catch (error) {
					console.error(`Error updating Element with ${idField} ${updatedElement[idField]}:`, error);
				}
			},

			async deleteElement(url, id) {
				try {
					await axios.delete(`${url}/${id}` , { withCredentials: true })
					//this.elements = this.elements.filter((e) => e.id !== id)
				} catch (error) {
					console.error(`Error deleting Element with id ${id}:`, error)
				}
			},

			confirm(accion: string, modificacion: string, tipo: string) {
				var confirmado = true;
				var confirmar = window.confirm(`¿Estás seguro de ${accion} este ${tipo}?`);
				if (confirmar) {
					alert(`${tipo} ${modificacion} correctamente`);
				} else { confirmado = false; }
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
			}


		}
	})
}