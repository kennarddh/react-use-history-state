import { useState } from 'react'

const useHistoryState = initialState => {
	const [State, SetState] = useState(initialState)

	return [State, SetState]
}

export default useHistoryState
