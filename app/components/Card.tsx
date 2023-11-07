"use client"

type CardProps = {
  children: React.ReactNode
  cardWidth: number
  cardHeight?: number
}

const Card = ({ children, cardHeight, cardWidth }: CardProps) => {
  return (
    // TTD: revisit shadow & width since it's hard coded
    <div
      className='flex flex-col mx-auto rounded-md shadow-[0_8px_30px_rgb(0,0,0,0.3)] p-8'
      style={{ width: cardWidth }}
    >
      {children}
    </div>
  )
}

export default Card
