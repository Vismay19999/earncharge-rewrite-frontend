import UPIFetch from '../profileUtils/UPIFetch'
import React from 'react'

const UpiBase = ({ user }: { user: any }) => {
  return (
    <div>
      {
        user.upi ? (
          <div>
            upi :    {user.upi}
          </div>
        ) : (
          <div>
            <UPIFetch />
          </div>
        )
      }
    </div>
  )
}

export default UpiBase