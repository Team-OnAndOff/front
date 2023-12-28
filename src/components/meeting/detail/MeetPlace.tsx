import { useEffect, useState } from 'react'
import { StaticMap } from 'react-kakao-maps-sdk'

interface Address {
  address: string
}

interface Location {
  x: number
  y: number
}

export default function MeetPlace({ address }: Address) {
  const [location, setLocation] = useState<Location>({ x: 0, y: 0 })
  useEffect(() => {
    const geocoder = new window.kakao.maps.services.Geocoder()

    geocoder.addressSearch(address, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        setLocation({
          x: Number(result[0].x),
          y: Number(result[0].y),
        })
      }
    })
  }, [address])
  return (
    <>
      <StaticMap
        center={{
          lat: location.y,
          lng: location.x,
        }}
        className='mt-3 tablet:h-[390px] w-full h-[320px] rounded-big-radius transition-all duration-1000'
        level={3}
        marker={true}
      ></StaticMap>
    </>
  )
}
