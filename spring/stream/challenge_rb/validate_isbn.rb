class Validate_isbn

  ISBN10_REGEX = /^(?:\d[\ |-]?){9}[\d|X]$/i

  def validate_isbn10(isbn = nil)
    if (isbn || '').match(ISBN10_REGEX)
      isbn_values = isbn.upcase.gsub(/\ |-/, '').split('')
      check_digit = isbn_values.pop # get check digit
      check_digit = (check_digit.upcase == 'X') ? 10 : check_digit.to_i

      sum = 0
      isbn_values.each_with_index do |value, index|
        sum += (index + 1) * value.to_i
      end

      (sum % 11) == check_digit
    else
      false
    end
  end

end