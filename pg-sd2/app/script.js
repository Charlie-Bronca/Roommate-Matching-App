$(document).ready(function() {
  $('.star').on('click', function() {
    const rating = $(this).data('rating');
    $('#rating-input').val(rating);
  });
});

/*export function handleStarClick() {
  $('.star').on('click', function() {
    const rating = $(this).data('rating');
    $('#rating-input').val(rating);
  });
}*/