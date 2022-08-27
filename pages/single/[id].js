import React from 'react'
import { useRouter } from 'next/router'
function SingleGame() {
    const router = useRouter()
  return (
    <div>Hello {router.query.id}</div>
  )
}

export default SingleGame