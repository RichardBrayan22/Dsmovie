import { Review } from '../../types/review';
import ReviewCard from '../ReviewCard';


import './styles.css';

type Props = {
    reviews?: Review[];
}


const ReviewListing = ({reviews} : Props) => {

  return (
    <>
      <div className="base-card review-listing-card mt-4">
        {reviews?.map((review) => {
            return(
                <ReviewCard text={review.text} name={review.user.name} key={review.id} />
            )
        })}
      </div>
    </>
  );
};

export default ReviewListing;
