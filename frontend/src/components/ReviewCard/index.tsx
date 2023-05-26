import { ReactComponent as StarIcon } from '../../assets/images/star-review.svg';
import './styles.css';

type Props = {
  text:string;
  name:string;
}


const ReviewCard = ({text, name} : Props) => {
  return (
      <div className="review-card mb-4">
        <div className="review-user">
          <StarIcon />
          <h1>{name}</h1>
        </div>
        <div className="avaliation">
          <h3>{text}</h3>
        </div>
      </div>
  );
};

export default ReviewCard
