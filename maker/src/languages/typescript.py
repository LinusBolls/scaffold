from subprocess import Popen, PIPE
from shutil import copyfile

from .language import Language
from merge_dirs.merge_json_files import merge_json_files
from merge_dirs.fill_slots import fill_slots

class Typescript(Language):
  
  id = "typescript"
  name = "typescript"

  def __init__(self, project):
    super().__init__(project)

  def merge_files(self, contents, file_name):

    file_extension = file_name.split(".")[-1]

    if file_name == "package.json":
      data = {
        "name": self.project.name
      }
      return merge_json_files(contents + [data], "merge")
 
    if file_extension in ["ts", "tsx"]:

      return fill_slots(contents[0], contents[1], file_name)
    
    return super().merge_files(contents, file_name)

  def finish(self, project):

    try:
      installOut, installErr = Popen(["npm", "install"], stdout=PIPE).communicate()

      formatOut, formatErr = Popen(["npm", "run", "format"], stdout=PIPE).communicate()

      copyfile(".env.example", ".env")
    
    except:
      pass

    super().finish(project)
