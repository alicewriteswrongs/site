# import os
# import ycm_core

flags = [
'-Wall',
'-Wextra',
'-Werror',
'-Wno-long-long',
'-Wno-variadic-macros',
'-fexceptions',
'-DNDEBUG',
'-std=c11',
'-x',
'c',
]

def FlagsForFile( filename, **kwargs ):
  return { 'flags': flags }
