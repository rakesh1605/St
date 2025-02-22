import React, { useEffect, useState } from 'react'
import RatingStars from '../../common/RatingStars'
import GetAvgRating from '../../../utils/avgRating';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import "../../../../src/App.css";

const Course_Card = ({ course, Height }) => {
  const [avgReviewCount, setAvgReviewCount] = useState(0);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const count = GetAvgRating(course.ratingAndReviews);
    setAvgReviewCount(count);
  }, [course]);

  const handleCourseClick = (e) => {
    e.preventDefault(); // Prevent default link behavior
    if (token) {
      navigate(`/courses/${course._id}`);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="cursor-pointer" onClick={handleCourseClick}>
      <div className="">
        <div className="rounded-lg">
          <img
            src={course?.thumbnail}
            alt="course thumbnail"
            className={`${Height} w-full rounded-xl object-cover `}
          />
        </div>
        <div className="flex flex-col gap-2 px-1 py-3">
          <p className="text-xl text-richblack-5">{course?.courseName}</p>
          <p className="text-sm text-richblack-50">
            {course?.instructor?.firstName} {course?.instructor?.lastName}
          </p>
          <div className="flex items-center gap-2">
            <span className="text-yellow-50">{avgReviewCount || 0}</span>
            <RatingStars Review_Count={avgReviewCount} />
            <span className="text-richblack-400">
              {course?.ratingAndReviews?.length} Ratings
            </span>
          </div>
          <p className="text-xl text-richblack-5">Rs. {course?.price}</p>
        </div>
      </div>
    </div>
  );
};

export default Course_Card;
