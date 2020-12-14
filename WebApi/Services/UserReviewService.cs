using ApplicationFitness.Domain.Models;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Dtos;
using WebApi.Repositories;

using Microsoft.AspNetCore.Http;
using WebApi.Sorting;

namespace WebApi.Services
{
    public class UserReviewService : IUserReviewService
    {
        private IRepository<Review> _repositoryReview;
        private IUserService _userService;

        public UserReviewService(IRepository<Review> repository, IUserService userService)
        {
            _repositoryReview = repository;
            _userService = userService;
        }

        public Review AddNewReview(ReviewDto dto, int userId)
        {
            var review = new Review
            {
                RatingMark = dto.RatingMark,
                UserId = userId,
                Comment = dto.Comment,
                ScheduleId = dto.ScheduleId
            };
            _repositoryReview.Add(review);
            _repositoryReview.Save();
            return review;
        }

        public IList<Review> GetReviews()
        {
            return _repositoryReview.GetAll().ToList();
        }

        public IList<GetReviewDto> GetReviewsFiltered(FilterModel filter)
        {
            var result = new List<GetReviewDto>();
            var propertyInfo = typeof(Review);
            var property = propertyInfo.GetProperty(filter.SortedField ?? "Comment");

            if (string.IsNullOrEmpty(filter.Term))
            {
                var allReviews = GetReviews().AsEnumerable();
                allReviews = filter.SortAsc ? allReviews.OrderBy(p => property.GetValue(p)) : allReviews.OrderByDescending(p => property.GetValue(p));
                
                foreach(var r in allReviews)
                {
                    result.Add(new GetReviewDto
                    {
                        Id = r.Id,
                        Comment = r.Comment,
                        ScheduleId = r.ScheduleId,
                        FirstName = _userService.GetUserById(r.UserId).FirstName,
                        LastName = _userService.GetUserById(r.UserId).LastName,
                        RatingMark = r.RatingMark
                    });
                }
                return result;
            }
            var reviews = _repositoryReview.GetAll().Where(u => u.Comment.StartsWith(filter.Term)).AsEnumerable();
            reviews = filter.SortAsc ? reviews.OrderBy(p => property.GetValue(p)) : reviews.OrderByDescending(p => property.GetValue(p));
            foreach (var r in reviews)
            {
                result.Add(new GetReviewDto
                {
                    Comment = r.Comment,
                    ScheduleId = r.ScheduleId,
                    FirstName = _userService.GetUserById(r.UserId).FirstName,
                    LastName = _userService.GetUserById(r.UserId).LastName,
                    RatingMark = r.RatingMark
                });
            }
            return result;
        }

        public IList<GetReviewDto> GetReviewsByScheduleId(int id)
        {
            var result = new List<GetReviewDto>();
            var reviews = _repositoryReview.GetAll().Where(p => p.ScheduleId == id).ToList();
            foreach (var r in reviews)
            {
                result.Add(new GetReviewDto
                {
                    Comment = r.Comment,
                    ScheduleId = r.ScheduleId,
                    FirstName = _userService.GetUserById(r.UserId).FirstName,
                    LastName = _userService.GetUserById(r.UserId).LastName,
                    RatingMark = r.RatingMark
                });
            }

            return result.ToList();
        }

        public IList<Review> GetReviewsByUserId(int UserId)
        {
            var reviews = _repositoryReview.GetAll().Where(r => r.UserId == UserId);
            return reviews.ToList();
        }

        public bool RemoveReview(int id)
        {
            var review = _repositoryReview.Find(id);
            if (review == null)
            {
                return false;
            }
            else
            {
                _repositoryReview.Delete(review);
                _repositoryReview.Save();
                return true;
            }
        }

        public Review UpdateReview(int id, UpdateReviewDto dto)
        {
            var review = _repositoryReview.Find(id);
            if (review == null)
            {
                return null;
            }
            review.Comment = dto.Comment;
            _repositoryReview.Save();
            return review;
        }
    }
}
