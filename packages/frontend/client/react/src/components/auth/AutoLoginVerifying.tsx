import { useEffect } from 'react'
import { LoadingMask } from '@/components/common'

import * as UserApi from '@/api/user'

const AutoLoginVerifying = ({ onSuccess, onFailed }) => {
  const autoLogin = async () => {
    try {
      const token = sessionStorage.getItem('token')
      const res = await UserApi.verify(token)
      if (res.code == 200) {
        // console.log('autologin success', res.data)
        onSuccess(res.data)
      } else {
        console.log('autologin failed', res)
        sessionStorage.removeItem('token')
        onFailed()
      }
    } catch (err) {
      console.log('autologin error')
      sessionStorage.removeItem('token')
    }
  }

  useEffect(() => {
    autoLogin()
  }, [])

  return <LoadingMask />
}

export default AutoLoginVerifying
