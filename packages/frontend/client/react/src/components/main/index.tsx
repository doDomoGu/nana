import { useState, useEffect } from 'react'
// import PropTypes from 'prop-types'
import { SpinLoading } from 'antd-mobile'

import { useGame } from '@/context/Game.tsx'

import { ResponseType } from '@/api/types'

import * as GameApi from '@/api/game'

import GameList from './GameList'
import GameRoom from './GameRoom'

// const Main = (props) => {
const Main = () => {
  const [loading, setLoading] = useState(true)
  const [gameState, dispatch] = useGame()

  const getRoom = async () => {
    const roomRes: ResponseType = await GameApi.room()
    console.log({ roomRes })
    if (roomRes.code == 200) {
      dispatch({ type: 'ENTER_ROOM', payload: roomRes.data })
    }
  }

  useEffect(() => {
    getRoom().then(() => {
      setLoading(false)
    })
  }, [])

  return (
    <div>
      {loading ? (
        <SpinLoading />
      ) : (
        <div>{gameState.isInRoom ? <GameRoom /> : <GameList />}</div>
      )}

      {/* {gameState.isInRoom ? 'Y' : 'N'} */}
    </div>
  )
}

// Main.propTypes = {}

export default Main
