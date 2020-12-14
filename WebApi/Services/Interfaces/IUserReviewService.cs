using ApplicationFitness.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Dtos;
using WebApi.Sorting;

namespace WebApi.Services
{
    public interface IUserReviewService
    {
        IList<Review> GetReviews();

        IList<Review> GetReviewsByUserId(int id);

        Review AddNewReview(ReviewDto dto, int userId);

        Review UpdateReview(int id, UpdateReviewDto dto);

        bool RemoveReview(int id);
        IList<GetReviewDto> GetReviewsByScheduleId(int id);
        IList<GetReviewDto> GetReviewsFiltered(FilterModel filter);
    }
}
