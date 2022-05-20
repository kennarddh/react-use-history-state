import { useEffect, useState } from 'react'

const useHistoryState = initialState => {
	const [State, SetState] = useState(initialState)
	const [History, StateHistory] = useState([])

	useEffect(() => {
		StateHistory(history => [...history, State])
	}, [State])

	return [State, SetState, [History]]
}

export default useHistoryState
