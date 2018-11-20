$ = require 'jquery'

do fill = (item = 'The most creative minds in Arts Now') ->
  $('.tagline').append "#{item}"
fill