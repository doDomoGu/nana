import { useState, useEffect } from 'react'
// import PropTypes from 'prop-types'
import { LoadingMask } from '@/components/common'

import { useGame } from '@/context/Game.tsx'
import { useGlobal } from '@/context/Global.tsx'

import { ResponseType } from '@/api/types'

import * as GameApi from '@/api/game'

import GameList from './GameList'
import GameRoom from './GameRoom'

// const Main = (props) => {
const Main = () => {
  const [globalState, globalDispatch] = useGlobal()
  const [gameState, gameDispatch] = useGame()

  const getRoom = async () => {
    const roomRes: ResponseType = await GameApi.room()
    console.log({ roomRes })
    if (roomRes.code == 200) {
      gameDispatch({ type: 'ENTER_ROOM', payload: roomRes.data })
    }
  }

  useEffect(() => {
    globalDispatch({ type: 'SET_LOADING', payload: true })
    getRoom().then(() => {
      globalDispatch({ type: 'SET_LOADING', payload: false })
    })
  }, [])

  return (
    <div>
      {globalState.loading ? (
        <LoadingMask />
      ) : (
        <div>{gameState.isInRoom ? <GameRoom /> : <GameList />}</div>
      )}

      {/* {gameState.isInRoom ? 'Y' : 'N'} */}
    </div>
  )
}

// Main.propTypes = {}

export default Main
