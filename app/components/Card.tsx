"use client"

type CardProps = {
  children: React.ReactNode
  cardWidth: number
  cardHeight: number
}

const Card = ({ children, cardHeight, cardWidth }: CardProps) => {
  return (
    <div
      className={`mx-auto rounded-md shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-4 h-[600px]`}
    >
      {children}
    </div>
  )
}

export default Card
