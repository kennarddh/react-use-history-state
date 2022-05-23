import { useState } from 'react'

const useHistoryState = initialState => {
	const [State, SetState] = useState(initialState)
	const [History, SetHistory] = useState([initialState])
	const [Pointer, SetPointer] = useState(0)

	const ChangeState = value => {
		if (value === History.at(-1)) return false

		SetState(value)

		SetHistory(history => [...history, value])

		SetPointer(pointer => pointer + 1)

		return true
	}

	const Undo = () => {
		if (Pointer === 0) return

		SetState(History[Pointer - 1])

		SetPointer(pointer => pointer - 1)
	}

	const Redo = () => {
		if (Pointer === History.length - 1) return

		SetState(History[Pointer + 1])

		SetPointer(pointer => pointer + 1)
	}

	return [State, ChangeState, [Undo, Redo, History]]
}

export default useHistoryState
