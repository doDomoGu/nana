import { Mask, SpinLoading } from 'antd-mobile'

const LoadingMask = () => {
  return (
    <Mask visible={true} opacity="thick">
      <div
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center'
        }}
      >
        <div
          style={{
            width: '100vw',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <SpinLoading />
        </div>
      </div>
    </Mask>
  )
}

export default LoadingMask
