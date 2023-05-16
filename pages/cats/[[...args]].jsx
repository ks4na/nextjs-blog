import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Cats() {
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  const args = router.query.args

  let displayText = ''
  if (router.isReady) {
    if (!args) {
      displayText = 'index cat page'
    } else {
      displayText = args.join(', ')
    }
  }

  return <div>Cats {displayText}</div>
}
