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

    const callback = function (
      result: Array<object>,
      status: kakao.maps.services.Status,
    ) {
      if (status === kakao.maps.services.Status.OK) {
        setLocation({
          x: Number(result[0].x),
          y: Number(result[0].y),
        })
      }
    }

    geocoder.addressSearch(address, callback)
  }, [address])
  console.log(location)
  return (
    <>
      <StaticMap
        center={{
          lat: location.y, // 위도 37.503773975836
          lng: location.x, // 경도  127.048914400159
        }}
        className='mt-3 h-[400px] rounded'
        level={3}
        marker={true}
      ></StaticMap>
    </>
  )
}
