import { useState, useEffect } from 'react'
// import { useGame } from '@/context/Game.tsx'
import { Button } from 'antd-mobile'

import GameList from './GameList'

import { ResponseType } from '@/api/types'
import * as GameApi from '@/api/game'
import { useGame } from '@/context/Game'

const GameRoom = () => {
  const [gameState, dispatch] = useGame()

  // return <div>{gameState.isInRoom ? <GameList /> : 'in-room'}</div>

  const handleLeave = async () => {
    const res: ResponseType = await GameApi.leave()
    if (res.code === 200) {
      dispatch({ type: 'LEAVE_ROOM' })
    }
  }

  return (
    <div>
      I'm in room
      <div>
        <Button
          size="mini"
          color="danger"
          onClick={() => {
            handleLeave()
          }}
        >
          离开房间
        </Button>
      </div>
    </div>
  )
}

export default GameRoom
