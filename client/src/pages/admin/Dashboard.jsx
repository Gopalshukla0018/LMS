import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

const Dashboard = () => {
  return (
    <div className='grid grid-cols-1 gap-6 mt-12 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4'>
      <Card>
        <CardHeader>
         <CardTitle>
            Total Sales
         </CardTitle>
        </CardHeader>
      </Card>
        
    </div>
  )
}

export default Dashboard


