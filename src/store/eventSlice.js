// @ts-ignore
import { createSlice } from '@reduxjs/toolkit'

const eventSlice = createSlice({
	name: 'events',
	initialState: {
		// @ts-ignore
		items: JSON.parse(localStorage.getItem('events')) || [],
	},
	reducers: {
		addEvent: (state, action) => {
			state.items.push(action.payload)
			localStorage.setItem('events', JSON.stringify(state.items))
		},
		editEvent: (state, action) => {
			const index = state.items.findIndex(
				event => event.id === action.payload.id
			)
			if (index !== -1) {
				state.items[index] = action.payload
				localStorage.setItem('events', JSON.stringify(state.items))
			}
		},
		deleteEvent: (state, action) => {
			state.items = state.items.filter(event => event.id !== action.payload)
			localStorage.setItem('events', JSON.stringify(state.items))
		},
	},
})

export const { addEvent, editEvent, deleteEvent } = eventSlice.actions
export default eventSlice.reducer
