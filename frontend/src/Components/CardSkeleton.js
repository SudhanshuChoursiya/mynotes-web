import Skeleton,{SkeletonTheme} from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import "./skeleton.css";

const CardSkeleton = () => {
  return (
    Array.from({length:5}).map((elem,index)=>{
      return(
       
<SkeletonTheme baseColor="#ebebeb" highlightColor="#dcdde1" duration="1" key={index}>
    <div className="cardContainer">
      <div className="skeletonCardContainer">
        
        <div>
          <Skeleton className="skeletonImgContainer"/>
        </div>
        
        <div className="skeletonTexualContentContainer">
              <div>
                <Skeleton className="skeletonText"/>
              </div>
        
<div className="skeletonBtnContainer">
               <Skeleton className="skeletonBtn"/>
               
               <Skeleton className="skeletonBtn"/>

              </div>
        </div>
        

        
      </div>
      
    </div>
    </SkeletonTheme>
        
        )
    })

  )
}

export default CardSkeleton;