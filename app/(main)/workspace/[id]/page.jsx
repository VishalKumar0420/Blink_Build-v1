import Chatview from '@/components/custom/Chatview'
import CodeView from '@/components/custom/CodeView'
import Colors from '@/data/Colors'
import React from 'react'

const workspace = () => {
  return (
    <div className='p-3' style={{backgroundColor:Colors.BACKGROUND}}>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
        <Chatview />
        <div className='col-span-2' >
        <CodeView/>
        </div>
      </div>
    </div>
  )
}

export default workspace
