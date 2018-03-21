# https://github.com/zapnap/isbn_validation/blob/master/lib/isbn_validation.rb

ISBN10_REGEX = /^(?:\d[\ |-]?){9}[\d|X]$/i

^(?:ISBN(?:-13)?:?\)?(?=[0-9]{13}$|(?=(?:[0-9]+[-\]){4})[-\0-9]{17}$)97[89][-\]?[0-9]{1,5}[-\]?[0-9]+[-\]?[0-9]+[-\]?[0-9]$



def validate_with_isbn10(isbn) #:nodoc:
  if (isbn || '').match(ISBN10_REGEX)
    isbn_values = isbn.upcase.gsub(/\ |-/, '').split('')
    check_digit = isbn_values.pop # last digit is check digit
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