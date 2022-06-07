import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        <a href="https://www.linkedin.com/in/frensia-tanaga/" target="_blank" rel="noopener noreferrer">Portofolio</a>
        <span className="ml-1">&copy;2022</span>
      </div>
      <div className="mfs-auto">
        <span className="mr-1">Powered by</span>
        <a href="http://frensi.my.id/" target="_blank" rel="noopener noreferrer">Frensi</a>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
