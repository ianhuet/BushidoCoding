require 'test-unit'
require 'validate_isbn'

class TestIsbn < Test::Unit::TestCase

  def test_isbn_happy_path
    valid = Validate_isbn.new

    expected = valid.validate_isbn10 '0471958697'
    assert_equal( expected, true )
  end

  def test_isbn_nil_or_empty
    valid = Validate_isbn.new

    expected = valid.validate_isbn10
    assert_equal( expected, false )

    expected = valid.validate_isbn10 ''
    assert_equal( expected, false )
  end

  def test_isbn_invalid
    valid = Validate_isbn.new

    expected = valid.validate_isbn10 'abcdefghiX'
    assert_equal( expected, false )

    expected = valid.validate_isbn10 '0123456789X'
    assert_equal( expected, false )

    expected = valid.validate_isbn10 '1.2.3.4.5.6.7.8.9.X'
    assert_equal( expected, false )
  end

  def test_isbn_valid_variations
    valid = Validate_isbn.new

    expected = valid.validate_isbn10 '0 471 60695 2'
    assert_equal( expected, true )

    expected = valid.validate_isbn10 '0-470-84525-2'
    assert_equal( expected, true )

    expected = valid.validate_isbn10 '0-321-14653-0'
    assert_equal( expected, true )
  end

end
