using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ApplicationFitness.Domain.Models;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using WebApi.Dtos;
using WebApi.Services;
using WebApi.Sorting;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IUserReviewService _userReviewService;
        private readonly UserManager<User> _userManager;
        public ReviewController(IMapper mapper, IUserReviewService userReviewService, UserManager<User> userManager)
        {
            _mapper = mapper;
            _userReviewService = userReviewService;
            _userManager = userManager;
        }
        [AllowAnonymous]
        [HttpGet]
        public IActionResult GetAllReviews()
        {
            var reviews = _userReviewService.GetReviews();
            var rezult = reviews.Select(r => _mapper.Map<ReviewDto>(r));
            return Ok(rezult);
        }
        [Authorize(Roles = "admin")]
        [HttpGet("getReviews{UserId}")]
        public IActionResult GetAllReviewsByUserId()
        {
            var user = _userManager.GetUserAsync(HttpContext.User);
            var reviews = _userReviewService.GetReviewsByUserId(user.Result.Id);
            if (reviews == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<ReviewDto>(reviews));

        }
        [Authorize(Roles = "admin")]
        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] UpdateReviewDto dto)
        {
            _userReviewService.UpdateReview(id, dto);
            return NoContent();
        }

        [Authorize]
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _userReviewService.RemoveReview(id);
            return NoContent();
        }

        [Authorize(Roles = "user")]
        [HttpPost("add")]
        public IActionResult AddNewReview([FromBody] ReviewDto dto)
        {
            var user = _userManager.GetUserAsync(HttpContext.User);
            var userId = user.Result.Id;
            var review = _userReviewService.AddNewReview(dto, userId);
            if (review == null)
            {
                return BadRequest("Error");
            }

            return Ok(review);
        }
        [Authorize(Roles = "admin")]
        [HttpGet("filtered")]
        public ActionResult<PagedCollectionResponse<GetReviewDto>> GetAllReviewsFiltered([FromQuery] FilterModel filter)
        {
            var reviews = _userReviewService.GetReviewsFiltered(filter);
            var result = PagedCollectionResponse<GetReviewDto>.Create(reviews, filter, (r) => _mapper.Map<GetReviewDto>(r));
            return Ok(result);
        }
        [AllowAnonymous]
        [HttpGet("getAll{scheduleId}")]
        public IActionResult GetAllReviewsByScheduleId(int scheduleId)
        {
            var reviews = _userReviewService.GetReviewsByScheduleId(scheduleId);
            
            if (reviews == null)
            {
                return NotFound("No reviews");
            }

            return Ok(reviews);

        }
    }
}
