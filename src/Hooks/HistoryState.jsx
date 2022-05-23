import { useState } from 'react'

const useHistoryState = initialState => {
	const [State, SetState] = useState(initialState)
	const [History, SetHistory] = useState([initialState])
	const [Pointer, SetPointer] = useState(0)

	const ChangeState = value => {
		if (value === History[History.length - 1]) return false

		SetState(value)

		SetHistory(history => {
			if (Pointer === history.length - 1) return [...history, value]

			return [...history.slice(0, Pointer + 1), value]
		})

		SetPointer(pointer => pointer + 1)

		return true
	}

	const Undo = () => {
		if (Pointer === 0) return false

		SetState(History[Pointer - 1])

		SetPointer(pointer => pointer - 1)

		return true
	}

	const Redo = () => {
		if (Pointer === History.length - 1) return false

		SetState(History[Pointer + 1])

		SetPointer(pointer => pointer + 1)

		return true
	}

	return [State, ChangeState, [Undo, Redo, History]]
}

export default useHistoryState
