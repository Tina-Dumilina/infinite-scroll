import React, {useState, useEffect} from 'react'
import './style.css'

export const InfiniteScroll = () => {
  const [listItems, setListItems] = useState(
    Array.from(Array(30).keys(), (n) => n + 1)
  )
  const [isFetching, setIsFetching] = useState(false)

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    ) {
      setIsFetching(true)
    }
  }

  const fetchMoreItems = () => {
    setTimeout(() => {
      setListItems((prevState) => [
        ...prevState,
        ...Array.from(Array(20).keys(), (n) => n + prevState.length + 1),
      ])
      setIsFetching(false)
    }, 2000)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.addEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!isFetching) return
    fetchMoreItems()
    console.log(isFetching)
  }, [isFetching])

  return (
    <>
      <ul className="list">
        {listItems.map((item) => (
          <li key={item} className="item">
            List Item {item}
          </li>
        ))}
      </ul>
    </>
  )
}
