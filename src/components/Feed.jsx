import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/config'
import { useDispatch, useSelector } from 'react-redux'
import { setfeed } from '../utils/FeedSlice'
import Card from './Card'

function Feed() {
  const dispatch = useDispatch()
  const feed = useSelector((state) => state.feed)


  const getFeed = async () => {
    const res = await axios.get(BASE_URL + "user/feed", { withCredentials: true })
    dispatch(setfeed(res.data))
  }
  useEffect(() => {
    getFeed()
  }, [])

  return (
    <div className='flex justify-center mt-12'>
      {feed && <Card user={feed[0]} />}
    </div>
  )
}

export default Feed
