import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const UserRide_page = () => {
    const [ locationCoords ,setlocationCoords]=useState(null)
    const [destinationCoords ,setdestinationCoords]=useState(null)
    const ridedriver = useSelector((state)=>state.ride_data.rideDriverdetails)
    console.log(ridedriver,'ride details')

  return (
    <div>
        <div>

        </div>
        <div>
        <MapComponent
          locationCoords={locationCoords ? locationCoords : { lat: null, lng: null }}
          destinationCoords={destinationCoords ? destinationCoords : { lat: null, lng: null }}
          />
        </div>
    </div>
  )
}

export default UserRide_page