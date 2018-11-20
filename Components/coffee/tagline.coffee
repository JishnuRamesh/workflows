$ = require 'jquery'

do fill = (item = 'The most creative minds in XX') ->
  $('.tagline').append "#{item}"
fill