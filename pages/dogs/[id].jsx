import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Head from 'next/head'

export default function Dog() {
  const router = useRouter()
  const [dogsInfo, setDogsInfo] = useState(null)
  const { id } = router.query

  useEffect(() => {
    if (id) {
      fetch(`/api/dogs/${id}`)
        .then(res => {
          if (res.ok) {
            return res.json()
          } else {
            res.json().then(errMsg => console.log(errMsg))
          }
        })
        .then(dogsInfo => {
          setDogsInfo(dogsInfo)
        })
    }
  }, [id])

  return (
    <>
      <Head>
        {dogsInfo && dogsInfo.name ? <title>{dogsInfo.name}</title> : null}
      </Head>
      <ul>
        {dogsInfo &&
          Object.entries(dogsInfo).map(([key, value]) => (
            <li key={key}>
              {key} : {value}
            </li>
          ))}
      </ul>
    </>
  )
}
