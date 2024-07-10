import React from "react"
import ContentLoader from "react-content-loader"

export const PizzaListItemSceleton = (props) => (
  <div className="pizza-block">
    <ContentLoader
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="145" cy="120" r="120" /> 
    <rect x="10" y="270" rx="10" ry="10" width="260" height="30" /> 
    <rect x="10" y="312" rx="10" ry="10" width="260" height="85" /> 
    <rect x="10" y="420" rx="10" ry="10" width="100" height="40" />
    <rect x="140" y="420" rx="10" ry="10" width="130" height="40" /> 
  </ContentLoader>
  </div>
)